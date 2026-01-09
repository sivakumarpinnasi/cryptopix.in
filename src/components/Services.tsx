'use client';

import { FaShieldAlt, FaCodeBranch, FaCloud, FaBoxOpen, FaKey } from 'react-icons/fa';
import { HiSparkles, HiArrowRight } from 'react-icons/hi';
import Link from 'next/link';

const products = [
    {
        icon: FaShieldAlt,
        title: 'Q-seal',
        description: 'Quantum-proof sealing technology ensuring your contracts and critical documents remain tamper-evident forever.',
        link: 'https://qseal.cryptopix.in'
    },
    {
        icon: FaCodeBranch,
        title: 'Cryptopix-Bridge',
        description: 'High-security cross-chain bridging infrastructure designed to prevent hacks and ensure asset integrity during transfer.',
        link: 'https://bridge.cryptopix.in'
    },
    {
        icon: FaCloud,
        title: 'SecureChat',
        description: 'End-to-end encrypted communication platform for sensitive corporate dialogue and file sharing.',
        link: 'https://securechat.cryptopix.in'
    },
    {
        icon: FaBoxOpen,
        title: 'ConsentLocker',
        description: 'Compliance-first user consent management system that creates immutable records for GDPR and CCPA.',
        link: 'https://consentlocker.cryptopix.in'
    },
    {
        icon: FaKey,
        title: 'Hardware Key',
        description: 'Physical security keys for multi-factor authentication, providing the highest level of protection against phishing and account takeovers.',
        link: '/products#hardware-key'
    },
];

const Services = () => {
    return (
        <section id="services" className="section relative backdrop-blur-sm">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-4">
                        <HiSparkles className="text-[var(--primary)]" />
                        <span className="text-sm font-semibold text-gray-600">Our Ecosystem</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#111]">
                        Cutting-Edge <span className="text-[var(--primary)]">Products</span>
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
                        A complete suite of security tools built for the quantum era
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-0">
                    {products.map((product, index) => (
                        <Link
                            href={product.link}
                            key={product.title}
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#2544e3]/30 hover:shadow-[0_10px_40px_-5px_rgba(37,68,227,0.3)] hover:-translate-y-1 transition-all duration-300 group animate-scale-in flex flex-col"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-[var(--primary)] mb-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300">
                                <product.icon className="text-2xl" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--primary)] transition-colors">
                                {product.title}
                            </h3>

                            <p className="text-gray-500 leading-relaxed mb-6 flex-grow text-sm">
                                {product.description}
                            </p>

                            <div className="flex items-center gap-2 text-[var(--primary)] font-semibold text-sm mt-auto">
                                <span>Learn more</span>
                                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
