'use client';

import { FaBolt, FaShieldAlt, FaRocket, FaChartLine, FaLock, FaCloud } from 'react-icons/fa';
import { HiSparkles, HiCheckCircle } from 'react-icons/hi';

const features = [
    {
        icon: FaBolt,
        title: 'Lightning Fast',
        description: 'Optimized performance with sub-second response times',
    },
    {
        icon: FaShieldAlt,
        title: 'Bank-Level Security',
        description: 'Military-grade encryption protecting your data',
    },
    {
        icon: FaRocket,
        title: 'Scalable Infrastructure',
        description: 'Grows with your business needs seamlessly',
    },
    {
        icon: FaChartLine,
        title: 'Advanced Analytics',
        description: 'Real-time insights and comprehensive reporting',
    },
    {
        icon: FaLock,
        title: 'Zero-Knowledge Architecture',
        description: 'Your data remains encrypted end-to-end',
    },
    {
        icon: FaCloud,
        title: 'Multi-Cloud Support',
        description: 'Deploy across AWS, Azure, and Google Cloud',
    },
];

const Features = () => {
    return (
        <section id="technology" className="section relative backdrop-blur-sm">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[var(--primary)] font-medium text-sm mb-4">
                        <HiSparkles />
                        <span>Features</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                        Powerful <span className="text-[var(--primary)]">Features</span> Built for You
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Everything you need to secure, manage, and scale your digital infrastructure
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="group animate-scale-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Card */}
                            <div className="bg-white rounded-2xl p-8 h-full border border-gray-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300">

                                {/* Icon Container */}
                                <div className="mb-6 inline-block">
                                    <div className="p-4 rounded-xl bg-blue-50 text-[var(--primary)] group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="text-3xl" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3 text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    {feature.description}
                                </p>

                                {/* Check Icon */}
                                <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-[var(--primary)] transition-colors duration-300">
                                    <HiCheckCircle className="text-lg" />
                                    <span>Available Now</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
