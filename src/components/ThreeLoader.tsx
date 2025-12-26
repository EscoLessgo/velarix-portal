import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export default function ThreeLoader() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let scene: THREE.Scene,
            camera: THREE.PerspectiveCamera,
            renderer: THREE.WebGLRenderer,
            particles: THREE.Points,
            composer: EffectComposer;
        let time = 0;
        const particleCount = 10000;
        let animationId: number;

        const colors = [
            new THREE.Color(0x00ffff),
            new THREE.Color(0x00ccff),
            new THREE.Color(0x0099ff),
            new THREE.Color(0x0066ff),
            new THREE.Color(0x00ffcc),
        ];

        function createStarPath(particleIndex: number, totalParticles: number) {
            const numStarPoints = 5;
            const outerRadius = 35;
            const innerRadius = 15;
            const starVertices: THREE.Vector2[] = [];

            for (let i = 0; i < numStarPoints; i++) {
                let angle = (i / numStarPoints) * Math.PI * 2 - Math.PI / 2;
                starVertices.push(new THREE.Vector2(outerRadius * Math.cos(angle), outerRadius * Math.sin(angle)));
                angle += Math.PI / numStarPoints;
                starVertices.push(new THREE.Vector2(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle)));
            }

            const numSegments = starVertices.length;
            const t_path = (particleIndex / totalParticles) * numSegments;
            const segmentIndex = Math.floor(t_path) % numSegments;
            const segmentProgress = t_path - Math.floor(t_path);
            const startVertex = starVertices[segmentIndex];
            const endVertex = starVertices[(segmentIndex + 1) % numSegments];

            const x = THREE.MathUtils.lerp(startVertex.x, endVertex.x, segmentProgress);
            const y = THREE.MathUtils.lerp(startVertex.y, endVertex.y, segmentProgress);
            const z = Math.sin((particleIndex / totalParticles) * Math.PI * 4) * 2;

            return new THREE.Vector3(x, y, z);
        }

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1500);
            camera.position.z = 90;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setClearColor(0x000000, 0); // Transparent background
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Make canvas transparent and non-blocking
            const canvas = renderer.domElement;
            canvas.style.pointerEvents = 'none';
            containerRef.current?.appendChild(canvas);

            composer = new EffectComposer(renderer);
            composer.addPass(new RenderPass(scene, camera));
            const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.4, 0.5, 0.7);
            composer.addPass(bloomPass);
            composer.addPass(new OutputPass());

            createParticleSystem();
            animate();
        }

        function createParticleSystem() {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const particleColors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const pos = createStarPath(i, particleCount);
                positions[i3] = pos.x;
                positions[i3 + 1] = pos.y;
                positions[i3 + 2] = pos.z;

                const t = i / particleCount;
                const colorProgress = (t * colors.length * 1.5) % colors.length;
                const colorIndex1 = Math.floor(colorProgress);
                const colorIndex2 = (colorIndex1 + 1) % colors.length;
                const blendFactor = colorProgress - colorIndex1;
                const color = new THREE.Color().lerpColors(colors[colorIndex1], colors[colorIndex2], blendFactor);

                particleColors[i3] = color.r;
                particleColors[i3 + 1] = color.g;
                particleColors[i3 + 2] = color.b;
                sizes[i] = 0.65 + Math.random() * 0.6;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.PointsMaterial({
                size: 2.8,
                vertexColors: true,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                sizeAttenuation: true,
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);
        }

        function animate() {
            animationId = requestAnimationFrame(animate);
            time += 0.02;

            if (particles) {
                particles.rotation.y += 0.0008;
                const positions = particles.geometry.attributes.position.array;

                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    positions[i3 + 2] += Math.sin(time * 0.4 + i * 0.01) * 0.02;
                }
                particles.geometry.attributes.position.needsUpdate = true;
            }

            composer.render();
        }

        init();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            containerRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 z-10" />;
}
