"""Serve public/ locally, like Vercel will. Python 3, no third-party dependencies.

Mirrors the production host: /services serves services.html (clean URLs, like
Vercel's `cleanUrls`), and unknown paths get 404.html with a 404 status.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import socket
import sys
import threading

ROOT = Path(__file__).resolve().parent / 'public'


class CleanUrlHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.path.split('?', 1)[0].split('#', 1)[0]
        if path != '/' and not path.endswith('/') and '.' not in path.rsplit('/', 1)[-1]:
            if (ROOT / (path.lstrip('/') + '.html')).is_file():
                self.path = path + '.html'
        target = Path(self.translate_path(self.path))
        if not target.exists() and (ROOT / '404.html').is_file():
            body = (ROOT / '404.html').read_bytes()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return None
        return super().send_head()


class V6Server(ThreadingHTTPServer):
    address_family = socket.AF_INET6


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    handler = partial(CleanUrlHandler, directory=str(ROOT))
    # Loopback only, on both IPv4 and IPv6: browsers often resolve "localhost"
    # to ::1 first, and an IPv4-only server then refuses the connection.
    # `python3 serve.py 8000 --lan` also opens it to other devices on the same network.
    lan = '--lan' in sys.argv[2:]
    servers = [ThreadingHTTPServer(('0.0.0.0' if lan else '127.0.0.1', port), handler)]
    try:
        servers.append(V6Server(('::1', port), handler))
    except OSError:
        pass  # no IPv6 loopback on this machine
    if lan:
        try:
            probe = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            probe.connect(('10.255.255.255', 1))
            print(f'Sur le réseau local : http://{probe.getsockname()[0]}:{port}', flush=True)
            probe.close()
        except OSError:
            pass
    for extra in servers[1:]:
        threading.Thread(target=extra.serve_forever, daemon=True).start()
    print(f'Site disponible sur http://localhost:{port} — Ctrl+C pour arrêter.', flush=True)
    try:
        servers[0].serve_forever()
    except KeyboardInterrupt:
        for s in servers:
            s.server_close()
