'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

const Globe = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);

    useEffect(() => {
        let phi = 0;
        let width = 0;

        if (!canvasRef.current) return;

        // Responsive width
        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener('resize', onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 0,
            diffuse: 1.2,
            mapSamples: 20000,
            mapBrightness: 12,
            baseColor: [0.145, 0.267, 0.89], // #2544e3
            markerColor: [0.145, 0.267, 0.89],
            glowColor: [0.145, 0.267, 0.89],
            opacity: 0.8,
            markers: [],
            onRender: (state) => {
                // Drag inertia
                if (!pointerInteracting.current) {
                    phi += 0.005;
                }
                state.phi = phi + pointerInteractionMovement.current;
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center relative min-h-[400px]">
            <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] relative">
                <canvas
                    ref={canvasRef}
                    onPointerDown={(e) => {
                        pointerInteracting.current =
                            e.clientX - pointerInteractionMovement.current;
                        if (canvasRef.current) {
                            canvasRef.current.style.cursor = 'grabbing';
                        }
                    }}
                    onPointerUp={() => {
                        pointerInteracting.current = null;
                        if (canvasRef.current) {
                            canvasRef.current.style.cursor = 'grab';
                        }
                    }}
                    onPointerOut={() => {
                        pointerInteracting.current = null;
                        if (canvasRef.current) {
                            canvasRef.current.style.cursor = 'grab';
                        }
                    }}
                    onMouseMove={(e) => {
                        if (pointerInteracting.current !== null) {
                            const delta = e.clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta * 0.01;
                        }
                    }}
                    onTouchMove={(e) => {
                        if (pointerInteracting.current !== null && e.touches[0]) {
                            const delta = e.touches[0].clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta * 0.01;
                        }
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        contain: 'layout paint size',
                        cursor: 'grab'
                    }}
                />
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2544e3]/20 to-transparent rounded-full blur-3xl -z-10 opacity-40"></div>
            </div>
        </div>
    );
};

export default Globe;
