import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './AudioPlayer.css';

const AudioPlayer: React.FC = () => {
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.05);

    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number>();

    // Handle audio playback and Context initialization
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Set volume
        audio.volume = volume;
        console.log("[AudioPlayer] Audio initialized. Volume set to:", audio.volume);

        const initAudioContext = () => {
            if (!audioContextRef.current) {
                // Create context on first interaction if possible
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                audioContextRef.current = new AudioContextClass();
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
            console.log("[AudioPlayer] User requested audio... attempting play.");
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("[AudioPlayer] Play success.");
                        initAudioContext();
                    })
                    .catch((error) => {
                        console.error("[AudioPlayer] Autoplay prevented:", error);
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

    // Effect to update volume when state changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

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

                // Cyan/Blue gradient matching Velarix theme
                ctx.fillStyle = `hsl(${i * 2 + 180}, 80%, 60%)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        };

        draw();
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0 && isMuted) {
            setIsMuted(false);
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
        <>
            {/* Background Audio (Hidden) */}
            <audio
                ref={audioRef}
                src="/new-track.flac"
                loop
                crossOrigin="anonymous"
                onError={(e) => console.error("[AudioPlayer] Audio failed to load", e)}
            />

            {/* Visualizer - Fixed bottom of screen */}
            <div className="audio-visualizer-container">
                <canvas
                    ref={canvasRef}
                    width="300"
                    height="60"
                    className="audio-visualizer-canvas"
                />
            </div>

            {/* Audio Controls - Fixed Bottom Right */}
            <div className="audio-controls">
                {/* Volume Slider */}
                <div className="audio-slider-container">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="audio-slider"
                    />
                </div>

                {/* Toggle Button */}
                <button
                    onClick={toggleMute}
                    className="audio-toggle-btn"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                    {isMuted || volume === 0 ? <VolumeX className="audio-icon" /> : <Volume2 className="audio-icon" />}
                </button>
            </div>
        </>
    );
};

export default AudioPlayer;
