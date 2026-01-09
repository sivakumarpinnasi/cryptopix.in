'use client';

import { useEffect, useRef, useState } from 'react';

const HeroGlobe = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }
        setIsHovering(true);
    };

    const handleCanvasMouseLeave = () => {
        setIsHovering(false);
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
        let imageLoaded = false;

        const initParticlesFromImage = (img: HTMLImageElement) => {
            particles = [];
            const radius = 1;

            // Draw image to offscreen canvas to read pixels
            const offscreen = document.createElement('canvas');
            const offCtx = offscreen.getContext('2d');
            if (!offCtx) return;

            // Reduce resolution for performance
            const w = 200;
            const h = 100;
            offscreen.width = w;
            offscreen.height = h;
            offCtx.drawImage(img, 0, 0, w, h);

            const imageData = offCtx.getImageData(0, 0, w, h).data;
            const threshold = 200; // Brightness threshold (assuming white background, black land, or vice versa)

            // The map we downloaded is likely white background, black/colored continents.
            // Or black background. Let's assume standard equirectangular map.
            // Loop through pixels
            for (let latIndex = 0; latIndex < h; latIndex++) {
                // Determine lat from -PI/2 to PI/2
                // Image top is North (+90), bottom is South (-90)
                const lat = Math.PI / 2 - (latIndex / h) * Math.PI;

                for (let lonIndex = 0; lonIndex < w; lonIndex++) {
                    // Determine lon from -PI to PI
                    const lon = (lonIndex / w) * 2 * Math.PI - Math.PI;

                    const index = (latIndex * w + lonIndex) * 4;
                    const r = imageData[index];
                    const g = imageData[index + 1];
                    const b = imageData[index + 2];
                    const brightness = (r + g + b) / 3;

                    // If pixel is DARK (land in a standard white-bg map) or LIGHT (land in a black-bg map)
                    // Wikimedia blank map is usually white sea, black lines/land.
                    // But we want solid land. The 'Equirectangular_projection_SW.jpg' is likely standard map.
                    // Let's assume land is darker than sea or non-white.

                    if (brightness < 200) { // Darker pixel = Land
                        // Add some randomness to skip points for style, otherwise it's too dense
                        if (Math.random() > 0.85) {
                            const x = radius * Math.cos(lat) * Math.sin(lon);
                            const y = radius * Math.sin(lat);
                            const z = radius * Math.cos(lat) * Math.cos(lon);

                            particles.push({
                                x, y, z,
                                size: Math.random() * 1.5 + 0.5,
                                originalX: x, originalY: y, originalZ: z
                            });
                        }
                    }
                }
            }
            imageLoaded = true;
        };

        const img = new Image();
        img.src = '/world-map.png';
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            initParticlesFromImage(img);
        };
        // Fallback or loading state?
        // If image fails, particles array is empty.

        const drawGlobe = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!imageLoaded && particles.length === 0) {
                // Loading text or fallback
                return;
            }

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const globeRadius = Math.min(centerX, centerY) * 0.8;

            rotation += 0.002;

            // Sort particles by Z-depth for correct occlusion opacity
            const projectedParticles = particles.map(p => {
                // Rotate around Y axis
                const rotatedX = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
                const rotatedZ = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
                const rotatedY = p.y;

                // Tilt the globe slightly (rotate around X)
                const tilt = 0.3; // 17 degrees
                const finalY = rotatedY * Math.cos(tilt) - rotatedZ * Math.sin(tilt);
                const finalZ = rotatedY * Math.sin(tilt) + rotatedZ * Math.cos(tilt);
                const finalX = rotatedX;

                // Perspective projection
                const scale = 300 / (300 - finalZ * globeRadius * 0.01);

                let projX = centerX + finalX * globeRadius;
                let projY = centerY + finalY * globeRadius;

                // DISTORTION FORCE
                let distX = 0;
                let distY = 0;

                if (mouseRef.current.x !== 0 && mouseRef.current.y !== 0) { // Check mouse position regardless of hover state for smoother exit
                    const dx = projX - mouseRef.current.x;
                    const dy = projY - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDataDist = 150;

                    if (dist < maxDataDist) {
                        const force = (maxDataDist - dist) / maxDataDist;
                        const distortFactor = force * 60; // Stronger distortion

                        distX = (dx / dist) * distortFactor;
                        distY = (dy / dist) * distortFactor;
                    }
                }

                return {
                    x: projX + distX,
                    y: projY + distY,
                    z: finalZ,
                    opacity: (finalZ + 1) / 2,
                    size: p.size
                };
            });

            // Draw connections
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(37, 68, 227, 0.08)';
            ctx.lineWidth = 0.5;

            projectedParticles.forEach((p, i) => {
                // Occlusion: If z is negative (back of sphere), reduce opacity or hide
                if (p.opacity < 0.2) return;

                ctx.fillStyle = `rgba(37, 68, 227, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections (optimized random subset)
                if (i % 8 === 0) {
                    projectedParticles.forEach((p2, j) => {
                        if (i === j || p2.opacity < 0.2) return;

                        // Visual distance check
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const distSq = dx * dx + dy * dy;
                        if (distSq < 800) {
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
            if (canvas) {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                // Re-init not strictly needed unless we want resolution changes, but mapped particles are unit sphere based.
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        drawGlobe();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center relative min-h-[400px]">
            <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] relative cursor-crosshair">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    onMouseMove={handleCanvasMouseMove}
                    onMouseLeave={handleCanvasMouseLeave}
                    style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -z-10 transform scale-75"></div>
            </div>
        </div>
    );
};

export default HeroGlobe;
