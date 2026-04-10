import { motion } from "motion/react";
import { useEffect } from "react";

interface InitialLoaderProps {
  onComplete: () => void;
}

export default function InitialLoader({ onComplete }: InitialLoaderProps) {
  useEffect(() => {
    // We only want the first 2.5 seconds of the video
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden origin-center will-change-transform"
      style={{ transformPerspective: 1200 }}
      exit={{ 
        scale: 0.75,
        opacity: 0,
        rotateX: 12,
        y: -30,
        z: -300,
        filter: "blur(15px)"
      }}
      transition={{ 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <video
        className="w-full h-full object-contain"
        autoPlay
        muted
        playsInline
        src="/loading_animation.mp4"
      />
    </motion.div>
  );
}
