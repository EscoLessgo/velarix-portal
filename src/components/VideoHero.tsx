import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

export default function VideoHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle audio playback and Context initialization
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.1; // 10% volume

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
      // User wants audio
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            initAudioContext();
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            // If autoplay fails, we might want to revert isMuted to true or show UI
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
      {/* Video Container */}
      <div
        className={`relative w-full max-w-md aspect-[9/16] rounded-2xl overflow-hidden border-2 border-primary/30 box-glow-cyan transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        {!videoError ? (
          <video
            key={isMuted ? 'muted' : 'unmuted'}
            src="/assets/video/hero.mp4"
            autoPlay
            muted={true}
            loop
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover' }}
            onError={() => setVideoError(true)}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black animate-pulse" />
        )}

        {/* Background Audio */}
        <audio
          ref={audioRef}
          src="/assets/music/new-track.mp3"
          loop
          crossOrigin="anonymous"
          onError={(e) => console.error("Audio failed to load", e)}
        />

        {/* Visualizer Overlay */}
        <div className="absolute bottom-16 left-0 right-0 h-24 z-10 pointer-events-none flex items-end justify-center opacity-80">
          <canvas
            ref={canvasRef}
            width="300"
            height="100"
            className="w-full h-full"
          />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none scanline opacity-30" />

        {/* Audio Toggle Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-20 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Title */}
      <div
        className={`mt-12 text-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold gradient-text">
          VELARIX
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground font-body tracking-wide">
          Digital Solutions & Creative Development
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToProjects}
        className={`mt-16 flex flex-col items-center gap-2 text-primary hover:text-secondary transition-all duration-500 group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        style={{ transitionDelay: '600ms' }}
      >
        <span className="text-sm font-body uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
          Explore Projects
        </span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
}
