'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaServer, FaShieldAlt, FaMobileAlt, FaDatabase, FaNetworkWired, FaLock } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const solutions = [
    {
        icon: FaShieldAlt,
        title: "Enterprise Security",
        description: "End-to-end protection for large-scale organizations with custom compliance requirements.",
        features: ["Threat Intelligence", "Compliance Management", "Identity Protection"]
    },
    {
        icon: FaServer,
        title: "Cloud Infrastructure",
        description: "Secure, scalable, and resilient cloud solutions designed for mission-critical workloads.",
        features: ["Auto-scaling", "Load Balancing", "DDoS Protection"]
    },
    {
        icon: FaDatabase,
        title: "Data Sovereignty",
        description: "Keep your data secure and compliant with local regulations across borders.",
        features: ["Geo-fencing", "Data Encryption", "Audit Logs"]
    },
    {
        icon: FaMobileAlt,
        title: "Mobile Security",
        description: "Protect mobile workforces and devices from advanced persistent threats.",
        features: ["MDM Integration", "App Sandboxing", "Remote Wipe"]
    },
    {
        icon: FaNetworkWired,
        title: "Zero Trust Network",
        description: "Never trust, always verify. micro-segmentation for modern network architectures.",
        features: ["Identity Verification", "Context Awareness", "Least Privilege"]
    },
    {
        icon: FaLock,
        title: "Identity Management",
        description: "Seamless and secure access control for your entire workforce.",
        features: ["SSO", "MFA", "Lifecycle Management"]
    }
];

export default function SolutionsPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Header Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="container relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[var(--primary)] font-medium text-sm mb-6 animate-fade-in">
                        <HiSparkles />
                        <span>Tailored For You</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Solutions for Every <br />
                        <span className="text-[var(--primary)]">Security Challenge</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        From startups to Fortune 500s, CryptoPix scales to meet your specific security needs.
                    </p>
                </div>

                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10"></div>
            </section>

            {/* Solutions Grid */}
            <section className="py-20 bg-gray-50/50 backdrop-blur-sm">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {solutions.map((item, index) => (
                            <div
                                key={item.title}
                                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-[var(--primary)] mb-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                    <item.icon className="text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500 mb-6 leading-relaxed">{item.description}</p>

                                <ul className="space-y-2">
                                    {item.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-20 text-center">
                        <button className="btn btn-primary px-8 py-3 group">
                            Schedule a Consultation
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
