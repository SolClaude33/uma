"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "How is working", href: "#how-is-working" },
  ];

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer h-14"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative h-full w-auto" style={{ aspectRatio: 'auto', minWidth: '180px', maxWidth: '250px' }}>
              <Image
                src="/Uma_Musume_Pretty_Derby_JP_Logo.webp"
                alt="Uma Musume Pretty Derby Logo"
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 768px) 150px, 200px"
              />
            </div>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white hover:text-pink-400 transition-colors font-bold"
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                  letterSpacing: '0.05em'
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-400 transition-colors"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="text-2xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))' }} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-surface/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-white hover:text-pink-400 transition-colors py-2 font-bold"
                  style={{ 
                    fontFamily: 'Arial, sans-serif',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                    letterSpacing: '0.05em'
                  }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-pink-400 transition-colors py-2"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="text-2xl mr-2" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))' }} />
                <span className="font-bold" style={{ 
                  fontFamily: 'Arial, sans-serif',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                  letterSpacing: '0.05em'
                }}>X (Twitter)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
