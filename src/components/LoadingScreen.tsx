import { useRef, useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Show text after a short delay
    const textTimer = setTimeout(() => setTextVisible(true), 500);

    const handleTimeUpdate = () => {
      // Complete when video reaches 50% of its duration
      if (video.duration && video.currentTime >= video.duration / 2) {
        onComplete();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      clearTimeout(textTimer);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black flex items-center justify-center">
      {/* Background Video - FULLY VISIBLE */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/background-new.mp4" type="video/mp4" />
      </video>

      {/* Animated ESCO Text on top */}
      <div
        className={`relative z-10 transition-all duration-1000 ${textVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      >
        <h1
          className="text-6xl md:text-8xl font-display font-black tracking-wider"
          style={{
            fontFamily: "'Orbitron', 'Courier New', monospace",
            background: 'linear-gradient(135deg, #00ffff 0%, #00ccff 25%, #0099ff 50%, #00ffff 75%, #00ccff 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 3s linear infinite',
            textShadow: '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))'
          }}
        >
          Ξ 𐌔 C Ó
        </h1>
      </div>
    </div>
  );
}
