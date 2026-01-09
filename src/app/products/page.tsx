'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaBoxOpen, FaShieldAlt, FaCloud, FaCodeBranch, FaExternalLinkAlt, FaKey } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import Link from 'next/link';

const products = [
    {
        id: 'q-seal',
        name: 'Q-seal',
        description: 'Quantum-proof sealing technology ensuring your contracts and critical documents remain tamper-evident forever. Utilizing post-quantum cryptographic algorithms.',
        icon: FaShieldAlt,
        link: 'https://qseal.cryptopix.in'
    },
    {
        id: 'cryptopix-bridge',
        name: 'Cryptopix-Bridge',
        description: 'High-security cross-chain bridging infrastructure designed to prevent hacks and ensure asset integrity during transfer. Supports EVM and non-EVM chains.',
        icon: FaCodeBranch,
        link: 'https://bridge.cryptopix.in'
    },
    {
        id: 'securechat',
        name: 'SecureChat',
        description: 'End-to-end encrypted communication platform for sensitive corporate dialogue. Features self-destructing messages and no-logs policy.',
        icon: FaCloud,
        link: 'https://securechat.cryptopix.in'
    },
    {
        id: 'consentlocker',
        name: 'ConsentLocker',
        description: 'Compliance-first user consent management system that creates immutable records for GDPR and CCPA. Automatically manages user preferences.',
        icon: FaBoxOpen,
        link: 'https://consentlocker.cryptopix.in'
    },
    {
        id: 'hardware-key',
        name: 'Hardware Key',
        description: 'Physical FIDO2/WebAuthn compatible security keys. Resist phishing with strong two-factor authentication that works with all your favorite services.',
        icon: FaKey,
        link: '/products#hardware-key'
    },
];

export default function ProductsPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Header */}
            <section className="pt-24 md:pt-32 pb-12 md:pb-20 relative overflow-hidden text-center">
                <div className="container relative z-10 px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-50 border border-blue-100 text-[var(--primary)] font-medium text-xs md:text-sm mb-6 animate-fade-in">
                        <HiSparkles />
                        <span>Our Suite</span>
                    </div>
                    <h1 className="text-2xl md:text-5xl font-bold mb-6 text-gray-900 animate-fade-in break-words leading-tight">
                        World-Class <span className="text-[var(--primary)]">Security Products</span>
                    </h1>
                </div>
            </section>

            {/* Products Grid */}
            <section className="pb-20">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                id={product.id}
                                className="group bg-white/40 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgba(37,68,227,0.1)] hover:shadow-[0_20px_40px_rgba(37,68,227,0.25)] transition-all duration-500 overflow-hidden animate-fade-in flex flex-col h-full"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Visual / Image Section */}
                                <div className="w-full h-48 md:h-64 relative overflow-hidden flex items-center justify-center bg-[#2544e3] p-6 md:p-8">
                                    {/* Abstract Pattern */}
                                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                                        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-white rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-black rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                                    </div>

                                    {/* Icon */}
                                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                                        <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center text-[var(--primary)] text-3xl md:text-5xl">
                                            <product.icon />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-6 md:p-8 flex flex-col bg-white/40">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-[var(--primary)] transition-colors">
                                        {product.name}
                                    </h3>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 md:mb-8 flex-grow">
                                        {product.description}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            href={product.link}
                                            className="inline-flex w-full items-center justify-center gap-2 bg-[var(--primary)] text-white px-5 py-3 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 text-sm md:text-base"
                                        >
                                            <span>View Product</span>
                                            <FaExternalLinkAlt className="text-xs" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
