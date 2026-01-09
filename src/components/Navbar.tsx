'use client';

import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaShieldAlt, FaBoxOpen, FaCodeBranch, FaCloud, FaLayerGroup, FaKey } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = ['features', 'about'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 100)) {
          current = section;
        }
      }
      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { name: 'All Products', description: 'View our full security suite', icon: FaLayerGroup, href: '/products' },
    { name: 'Q-seal', description: 'Quantum-proof sealing', icon: FaShieldAlt, href: '/products/#q-seal' },
    { name: 'Cryptopix-Bridge', description: 'Secure cross-chain bridging', icon: FaCodeBranch, href: '/products/#cryptopix-bridge' },
    { name: 'SecureChat', description: 'Encrypted communication', icon: FaCloud, href: '/products/#securechat' },
    { name: 'ConsentLocker', description: 'User consent management', icon: FaBoxOpen, href: '/products/#consentlocker' },
    { name: 'Hardware Key', description: 'Physical security keys', icon: FaKey, href: '/products/#hardware-key' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto">
        <div className="relative z-50 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <Image
              src="/logo.png"
              alt="CryptoPix Logo"
              width={150}
              height={40}
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-[var(--primary)] transition-colors">
              CryptoPix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            {/* Products Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-[var(--primary)] font-medium transition-colors duration-200 text-base py-2">
                Products
              </button>

              <div className="absolute top-full text-left left-1/2 -translate-x-1/2 pt-4 w-64 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-2">
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      href={product.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item"
                    >
                      <div className="mt-1 text-gray-400 group-hover/item:text-[var(--primary)] transition-colors">
                        <product.icon />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {[
              { name: 'Solutions', href: '/solutions' },
              { name: 'Technology', href: '/#technology' },
              { name: 'About', href: '/#about' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-gray-600 hover:text-[var(--primary)] font-medium transition-colors duration-200 text-base py-2 group ${activeLink === link.href.replace('/#', '') ? 'text-[var(--primary)]' : ''
                  }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 ease-out group-hover:w-full ${activeLink === link.href.replace('/#', '') ? 'w-full' : ''
                  }`}></span>
              </Link>
            ))}
          </div>

          {[/* CTA Button */]}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="btn btn-primary text-base px-6 py-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
              Get in Touch
            </Link>
          </div>



          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}
        >
          <div className="flex flex-col items-center pt-24 gap-6">
            <Link href="/products" className="text-xl text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
            <Link href="/solutions" className="text-xl text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
            <Link href="/#technology" className="text-xl text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Technology</Link>
            <Link href="/#about" className="text-xl text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>

            <div className="h-px w-20 bg-gray-100 my-2"></div>

            <Link href="/contact" className="btn btn-primary w-auto px-8 py-2 text-center" onClick={() => setIsMobileMenuOpen(false)}>
              Get in Touch
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
