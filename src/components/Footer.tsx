'use client';

import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        'Quick Links': [
            { name: 'About', href: '/#about' },
            { name: 'Services', href: '/#services' },
            { name: 'Products', href: '/products' },
            { name: 'Contact', href: '/contact' },
        ],
        'Products': [
            { name: 'Q-seal', href: 'https://qseal.cryptopix.in' },
            { name: 'Cryptopix-Bridge', href: 'https://bridge.cryptopix.in' },
            { name: 'SecureChat', href: 'https://securechat.cryptopix.in' },
            { name: 'ConsentLocker', href: 'https://consentlocker.cryptopix.in' },
        ],
        'Legal': [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
        ]
    };

    const socialLinks = [
        { icon: FaLinkedin, href: 'https://www.linkedin.com/company/cryptopix/', label: 'LinkedIn' },
        { icon: FaInstagram, href: 'https://www.instagram.com/cryptopix.official/', label: 'Instagram' },
        { icon: FaGithub, href: 'https://github.com/cryptopix-dev', label: 'GitHub' },
    ];

    return (
        <footer className="relative pt-20 pb-10 bg-white/50 backdrop-blur-sm border-t border-gray-100">
            <div className="container">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 mb-12 md:mb-16 px-4 md:px-0">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="CryptoPix"
                                width={40}
                                height={40}
                                className="w-10 h-auto object-contain"
                            />
                            <span className="text-2xl font-bold text-gray-900">CryptoPix</span>
                        </div>
                        <p className="text-gray-500 leading-relaxed max-w-sm">
                            Leading the future of post-quantum data security with revolutionary CLWE technology.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-gray-500">
                                <FaEnvelope className="text-[var(--primary)]" />
                                <span>support@cryptopix.in</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                                <FaPhone className="text-[var(--primary)]" />
                                <span>+91 7723010712</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="lg:col-span-1">
                            <h4 className="text-gray-900 font-bold mb-6 text-lg">{category}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-500 hover:text-[var(--primary)] transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-100 px-4 md:px-0">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                        {/* Copyright */}
                        <p className="text-gray-400 text-sm">
                            © {currentYear} CryptoPix. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
