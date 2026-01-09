'use client';

import { FaShieldAlt, FaUsers, FaAward, FaGlobe } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import Image from 'next/image';

const stats = [
    { icon: FaUsers, value: '10,000+', label: 'Active Users' },
    { icon: FaShieldAlt, value: '99.9%', label: 'Uptime SLA' },
    { icon: FaAward, value: '50+', label: 'Awards Won' },
    { icon: FaGlobe, value: '120+', label: 'Countries' },
];

const values = [
    {
        title: 'Innovation First',
        description: 'We constantly push the boundaries of what\'s possible in data security.',
    },
    {
        title: 'Customer Focused',
        description: 'Your success is our success. We build solutions that truly serve your needs.',
    },
    {
        title: 'Transparency',
        description: 'Open communication and honest practices are at the core of everything we do.',
    },
    {
        title: 'Excellence',
        description: 'We strive for perfection in every line of code and every customer interaction.',
    },
];

const About = () => {
    return (
        <section id="about" className="section relative">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-4">
                        <HiSparkles className="text-[var(--primary)]" />
                        <span className="text-sm font-semibold text-gray-600">About Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#111]">
                        Building the <span className="text-[var(--primary)]">Future of Security</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        We're on a mission to make enterprise-grade security accessible to businesses of all sizes
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20 animate-fade-in">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-scale-in border border-gray-100"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--primary)] mx-auto mb-4 flex items-center justify-center">
                                <stat.icon className="text-2xl" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
                    {/* Left Content */}
                    <div className="animate-slide-in-left">
                        <h3 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                Founded in 2020, CryptoPix emerged from a simple observation: traditional security solutions were either too complex for small businesses or too expensive for growing companies.
                            </p>
                            <p>
                                We set out to change that by building a platform that combines enterprise-grade security with an intuitive user experience. Today, we protect over 10,000 businesses worldwide.
                            </p>
                            <p>
                                Our team of security experts, engineers, and designers work tirelessly to ensure your data remains safe while making the technology accessible to everyone.
                            </p>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative animate-slide-in-right">
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative z-10 flex items-center justify-center">
                            <div className="w-full max-w-[300px] h-auto p-4">
                                <Image
                                    src="/logo.png"
                                    alt="CryptoPix Logo"
                                    width={400}
                                    height={400}
                                    className="w-full h-auto object-contain animate-scale-in"
                                />
                            </div>
                        </div>
                        {/* Decor element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="animate-fade-in">
                    <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Core Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={value.title}
                                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-center animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-12 h-1 bg-[var(--primary)] mx-auto rounded-full mb-6"></div>
                                <h4 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
