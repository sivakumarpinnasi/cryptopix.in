'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaMapMarkedAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: 'Email Us',
            content: 'support@cryptopix.in',
            color: 'text-blue-500',
            bg: 'bg-blue-50',
        },
        {
            icon: FaPhone,
            title: 'Call Us',
            content: '+91 7723010712',
            color: 'text-purple-500',
            bg: 'bg-purple-50',
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Visit Us',
            content: 'gitam,rushikonda,Visakhapatnam, Andhra Pradesh, India',
            color: 'text-pink-500',
            bg: 'bg-pink-50',
        },
    ];

    return (
        <section id="contact" className="section relative bg-gray-50/50">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-4">
                        <HiSparkles className="text-[var(--primary)]" />
                        <span className="text-sm font-semibold text-gray-600">Contact Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#111]">
                        Get in <span className="text-[var(--primary)]">Touch</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-slide-in-left">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-gray-900"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-gray-900"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-gray-900"
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-gray-900 resize-none"
                                    placeholder="Tell us more..."
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2 group">
                                <span>Send Message</span>
                                <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6 animate-slide-in-right">
                        {contactInfo.map((info, index) => (
                            <div
                                key={info.title}
                                className="bg-white rounded-2xl p-6 flex items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={`w-12 h-12 rounded-xl ${info.bg} flex items-center justify-center`}>
                                    <info.icon className={`text-xl ${info.color}`} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                                    <p className="text-gray-500 font-medium">{info.content}</p>
                                </div>
                            </div>
                        ))}

                        {/* Map Placeholder */}
                        <div className="bg-white rounded-2xl p-6 h-64 flex items-center justify-center shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                {/* Pseudomap pattern */}
                                <div className="grid grid-cols-4 gap-4 opacity-10 rotate-12 scale-150">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative z-10 text-center bg-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-sm">
                                <FaMapMarkedAlt className="text-4xl text-[var(--primary)] mb-2 mx-auto" />
                                <p className="text-gray-600 font-medium">View on Map</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
