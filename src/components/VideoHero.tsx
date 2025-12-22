import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
// @ts-ignore
import BIRDS from 'vanta/dist/vanta.birds.min';
import * as THREE from 'three';

export default function VideoHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  // Video error state removed as we are using Vanta now

  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setIsLoaded(true);

    const initVanta = async () => {
      try {
        // Ensure THREE is available globally for Vanta
        if (!(window as any).THREE) {
          (window as any).THREE = THREE;
        }

        // Initialize Vanta.js Birds effect
        if (!vantaEffect.current && vantaRef.current) {
          vantaEffect.current = BIRDS({
            el: vantaRef.current,
            THREE: THREE, // Pass THREE explicitly as well
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x000000,
            color1: 0x000000,
            color2: 0x00d1ff, // Cyan
            birdSize: 1.10,
            wingSpan: 30.00,
            speedLimit: 4.00,
            separation: 20.00,
            alignment: 20.00,
            cohesion: 51.00,
            backgroundAlpha: 1.00,
            quantity: 5
          });
          console.log("[VideoHero] Vanta effect initialized");
        }
      } catch (error) {
        console.error("[VideoHero] Failed to initialize Vanta effect:", error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  // ... (rest of audio logic remains effectively the same)

  // Handle audio playback and Context initialization
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Force volume to 0.1 (10%) and log
    audio.volume = 0.1;
    console.log("[VideoHero] Audio initialized. Volume set to:", audio.volume);

    const initAudioContext = () => {
      if (!audioContextRef.current) {
        // Create context on first interaction if possible
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;

        // Connect source
        if (!sourceRef.current) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }

        drawVisualizer();
      } else if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    if (!isMuted) {
      console.log("[VideoHero] User requested audio... attempting play.");
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("[VideoHero] Play success.");
            initAudioContext();
          })
          .catch((error) => {
            console.error("[VideoHero] Autoplay prevented:", error);
          });
      }
    } else {
      audio.pause();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMuted]);

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Visualizer style settings
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2; // Scale down height

        // Gradient or simple color
        ctx.fillStyle = `hsl(${i * 2 + 180}, 80%, 60%)`; // Cyan/Blue gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle user interaction for autoplay policy
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused && !isMuted) {
        audioRef.current.play().catch(e => console.error("Play failed:", e));
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, [isMuted]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Vanta.js Background - Full Screen */}
      <div ref={vantaRef} className="absolute inset-0 w-full h-full -z-20" />

      {/* Overlay gradient - Full Screen */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent opacity-60 -z-10" />

      {/* Scanline effect - Full Screen */}
      <div className="absolute inset-0 pointer-events-none scanline opacity-30 -z-10" />

      {/* visualizer - Bottom of screen */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-0 pointer-events-none flex items-end justify-center opacity-40 pb-8">
        <canvas
          ref={canvasRef}
          width="300"
          height="100"
          className="w-full max-w-md h-full"
        />
      </div>

      {/* Background Audio (Hidden) */}
      <audio
        ref={audioRef}
        src="/new-track.flac"
        loop
        crossOrigin="anonymous"
        onError={(e) => console.error("[VideoHero] Audio failed to load", e)}
      />

      {/* Audio Toggle Button - Floating Bottom Right */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-background/20 backdrop-blur-md border border-primary/30 text-primary hover:bg-primary/20 hover:text-primary-foreground transition-all duration-300 hover:scale-110"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>

      {/* Content wrapper to ensure it sits above background */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <div
          className={`text-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold gradient-text drop-shadow-2xl">
            VELARIX
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-white/90 font-body tracking-widest uppercase">
            Digital Solutions & Creative Development
          </p>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToProjects}
          className={`mt-24 flex flex-col items-center gap-2 text-white/80 hover:text-primary transition-all duration-500 group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <span className="text-sm font-body uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
            Explore Projects
          </span>
          <ChevronDown className="w-8 h-8 animate-bounce mt-2" />
        </button>
      </div>
    </section>
  );
}
