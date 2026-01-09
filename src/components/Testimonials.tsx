'use client';

import { useEffect, useRef, useState } from 'react';
import { HiSparkles } from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'CTO at TechCorp',
        text: 'CryptoPix has transformed how we handle data security. The encryption is seamless and the performance is outstanding.',
        lat: 40.7128, // New York
        long: -74.0060
    },
    {
        name: 'Michael Chen',
        role: 'Security Director at DataFlow',
        text: 'Best security solution we have implemented. The team is responsive and the platform is incredibly reliable.',
        lat: 35.6762, // Tokyo
        long: 139.6503
    },
    {
        name: 'Emily Rodriguez',
        role: 'CEO at SecureNet',
        text: 'Outstanding service and support. CryptoPix has become an essential part of our security infrastructure.',
        lat: 51.5074, // London
        long: -0.1278
    }
];

const Testimonials = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const mouseRef = useRef({ x: 0, y: 0 });
    const lastRandomTime = useRef(0);

    // Cycle through testimonials automatically (only if not hovering)
    useEffect(() => {
        if (isHovering) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovering]);

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }
        setIsHovering(true);

        // Random Testimonial on Hover (Throttled to every 150ms to avoid too rapid changes)
        // This gives a "scanning" effect
        const now = Date.now();
        if (now - lastRandomTime.current > 150) {
            const randomIndex = Math.floor(Math.random() * testimonials.length);
            setActiveIndex(randomIndex);
            lastRandomTime.current = now;
        }
    };

    const handleCanvasMouseLeave = () => {
        setIsHovering(false);
        // Reset mouse position to stop distortion
        mouseRef.current = { x: 0, y: 0 };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let rotation = 0;
        let animationId: number;
        let particles: { x: number, y: number, z: number, size: number, originalX: number, originalY: number, originalZ: number }[] = [];

        // Generate sphere points (Golden Spiral sphere)
        const initParticles = () => {
            particles = [];
            const n = 800; // Number of particles
            const goldenRatio = (1 + Math.sqrt(5)) / 2;

            for (let i = 0; i < n; i++) {
                const theta = 2 * Math.PI * i / goldenRatio;
                const phi = Math.acos(1 - 2 * (i + 0.5) / n);

                const x = Math.sin(phi) * Math.cos(theta);
                const y = Math.sin(phi) * Math.sin(theta);
                const z = Math.cos(phi);

                particles.push({
                    x, y, z,
                    size: Math.random() * 1.5 + 0.5,
                    originalX: x, originalY: y, originalZ: z
                });
            }
        };

        const drawGlobe = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY) * 0.7;

            if (!isHovering) {
                rotation += 0.003;
            } else {
                rotation += 0.001; // Slow down on hover
            }

            // Sort particles by Z-depth for correct occlusion opacity
            const projectedParticles = particles.map(p => {
                // Rotate around Y axis
                const rotatedX = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
                const rotatedZ = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
                const rotatedY = p.y;

                // Tilt the globe slightly (rotate around X)
                const tilt = 0.2;
                const finalY = rotatedY * Math.cos(tilt) - rotatedZ * Math.sin(tilt);
                const finalZ = rotatedY * Math.sin(tilt) + rotatedZ * Math.cos(tilt);
                const finalX = rotatedX;

                // Project first to get 2D position for distortion check
                // Perspective projection
                const scale = 300 / (300 - finalZ * radius * 0.01);
                let px = centerX + rotatedX * radius;
                // Re-calculating proper projection variables
                let projX = centerX + finalX * radius;
                let projY = centerY + finalY * radius;

                // DISTORTION FORCE
                let distX = 0;
                let distY = 0;

                // Only distort if hovering and mouse is tracked
                if (mouseRef.current.x !== 0 && mouseRef.current.y !== 0) {
                    const dx = projX - mouseRef.current.x;
                    const dy = projY - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDataDist = 150; // Radius of interaction influence

                    if (dist < maxDataDist) {
                        // Interactive 'Explosion' / Repulsion
                        const force = (maxDataDist - dist) / maxDataDist;
                        const distortFactor = force * 40; // Strength in pixels

                        // Push away from mouse
                        distX = (dx / dist) * distortFactor;
                        distY = (dy / dist) * distortFactor;
                    }
                }

                return { x: projX + distX, y: projY + distY, z: finalZ, opacity: (finalZ + 1) / 2, size: p.size };
            });

            // Draw connections
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(37, 68, 227, 0.05)';
            ctx.lineWidth = 0.5;

            projectedParticles.forEach((p, i) => {
                if (p.opacity < 0.1) return; // Skip back-facing

                ctx.fillStyle = `rgba(37, 68, 227, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections for every 10th particle to avoid too many lines
                if (i % 10 === 0) {
                    projectedParticles.forEach((p2, j) => {
                        if (i === j || p2.opacity < 0.1) return;
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const distSq = dx * dx + dy * dy;
                        if (distSq < 1000) { // 30px distance
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    });
                }
            });

            animationId = requestAnimationFrame(drawGlobe);
        };

        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        drawGlobe();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []); // Removed isHovering from dependency to avoid re-init

    return (
        <section id="testimonials" className="section relative overflow-hidden py-24">
            <div className="container relative z-10">

                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
                        <HiSparkles className="text-[var(--primary)]" />
                        <span className="text-sm font-semibold text-[var(--primary)]">Community</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#111]">
                        Trusted by <span className="text-[var(--primary)]">Industry Leaders</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Hover over the globe to explore our impact network.
                    </p>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">

                    {/* Left: 3D Globe Visualization */}
                    <div className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center cursor-crosshair">
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full"
                            onMouseMove={handleCanvasMouseMove}
                            onMouseLeave={handleCanvasMouseLeave}
                        />
                        {/* Decorative Blur */}
                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -z-10 transform scale-75"></div>
                    </div>

                    {/* Right: Testimonials "Nudges" */}
                    <div className="relative h-[400px] flex items-center">
                        {testimonials.map((t, index) => (
                            <div
                                key={index}
                                className={`absolute top-1/2 left-0 -translate-y-1/2 w-full transition-all duration-700 ease-out transform ${index === activeIndex
                                    ? 'opacity-100 translate-x-0 scale-100 z-10'
                                    : 'opacity-0 translate-x-10 scale-95 -z-10'
                                    }`}
                            >
                                {/* Connection Line Visual */}
                                <div className="hidden lg:block absolute right-full top-1/2 w-24 h-px bg-gradient-to-r from-transparent to-blue-200"></div>
                                <div className="hidden lg:block absolute -left-1 top-1/2 w-2 h-2 rounded-full bg-blue-500 -translate-y-1/2 animate-pulse"></div>

                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl relative">
                                    <FaQuoteLeft className="text-4xl text-blue-100 absolute top-6 right-6" />

                                    <p className="text-xl text-gray-700 leading-relaxed italic mb-8 relative z-10">
                                        "{t.text}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{t.name}</h4>
                                            <p className="text-sm text-gray-500">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Navigation Dots */}
                        <div className="absolute bottom-0 left-0 flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${idx === activeIndex ? 'bg-[var(--primary)]' : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
