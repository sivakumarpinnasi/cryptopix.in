'use client';

import { HiArrowRight } from 'react-icons/hi';


const Hero = () => {
    return (
        <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4">
            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[var(--primary)] font-medium text-sm mb-8 animate-fade-in opacity-0">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
                        </span>
                        <span>Redefining data security with post quantum cryptography</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#111] mb-6 md:mb-8 leading-[1.1] animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
                        The Future of <span className="text-[var(--primary)]">Post-Quantum</span> <br className="hidden md:block" />
                        Data Security
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-gray-500 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
                        Revolutionary CLWE (Color Lattice Learning with Errors) technology providing
                        unbreakable post-quantum cryptography for the quantum computing era
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                        <button className="btn btn-primary w-full sm:w-auto group">
                            Secure Your Data Today
                            <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
            {/* Background elements if needed */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-10"></div>
        </section>
    );
};

export default Hero;
