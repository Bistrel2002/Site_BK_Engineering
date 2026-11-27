# bkengineering.fr

Site statique (HTML, CSS, JavaScript) servi par Vercel, plus une fonction serverless
pour le formulaire de contact.

| Dossier | Contenu |
|---|---|
| `public/` | le site : pages, styles, scripts, logo 3D. Généré par le skill premium-3d-glass à partir du brief `bk-engineering-brief/site.json` |
| `api/send-email.ts` | envoi des e-mails du formulaire via Brevo (inchangé) |
| `vercel.json` | pas de build, sortie `public/`, URL propres, redirections, en-têtes de cache |

## Variables d'environnement (Vercel)

Rien à changer : la fonction lit toujours `BREVO_API_KEY`, et en option
`BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME` et `CONTACT_EMAIL`.

Le formulaire de `/contact` envoie `{ type: "contact", data: { name, email, subject, message } }`
à `/api/send-email`. Si l'envoi échoue, il ouvre la messagerie du visiteur avec le message prêt.

## Mettre à jour le site

1. Modifier le brief puis régénérer le site :
   `python3 premium-3d-glass/template/tools/build_site.py bk-engineering-brief/site.json --out bk-engineering-site`
2. Copier le résultat dans `public/`, sans `serve.py`, `build_monofichier.py`,
   `version-monofichier.html`, `README.md` ni `vercel.json`.
3. Pousser sur `main` : Vercel déploie.

## Voir le site en local

`python3 serve.py` puis <http://localhost:8000> (adresses propres comme sur Vercel :
`/services`, `/a-propos`). `python3 serve.py 8000 --lan` l'ouvre aussi aux autres appareils
du réseau local. Le formulaire n'envoie pas d'e-mail en local (pas de fonction `api/`) :
il ouvre la messagerie avec le message prêt.
