import { useRef, useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let completed = false;
    let videoReady = false;

    const complete = () => {
      if (!completed) {
        completed = true;
        console.log('Loading screen completing...');
        onComplete();
      }
    };

    // Show text after a short delay
    const textTimer = setTimeout(() => setTextVisible(true), 500);

    // Longer fallback timeout - 15 seconds to give video time to load
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback timer triggered');
      complete();
    }, 15000);

    const handleCanPlayThrough = () => {
      videoReady = true;
      console.log('Video ready to play through');
    };

    const handleTimeUpdate = () => {
      // Only check progress if video is ready
      if (videoReady && video.duration && video.currentTime >= video.duration / 2) {
        console.log('Video reached 50% - completing');
        complete();
      }
    };

    const handleError = (e: any) => {
      console.error('Video failed to load:', e);
      complete();
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fallbackTimer);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
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
        onLoadedData={() => console.log('Video loaded successfully')}
        onCanPlay={() => console.log('Video can play')}
        onError={(e) => console.error('Video error:', e)}
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
