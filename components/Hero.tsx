"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBuyClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    // Placeholder: would open DEX link
  };

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[120vh] flex items-center justify-center overflow-hidden">
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/main2.avif"
          alt="UMAX Racing Academy"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-primary-yellow/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-64 h-64 bg-primary-amber/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-32 md:pb-40 lg:pb-48" style={{ paddingTop: '16rem' }}>
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8 relative"
              style={{ top: '-16rem' }}
            >
              <div className="relative h-48 md:h-72 lg:h-96 w-full max-w-4xl mx-auto">
                <Image
                  src="/Uma_Musume_Pretty_Derby_JP_Logo.webp"
                  alt="Uma Musume Pretty Derby Logo"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-4xl lg:text-5xl text-white font-bold drop-shadow-lg mt-32 md:mt-40 lg:mt-48"
              style={{ 
                fontFamily: 'Arial, sans-serif',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                letterSpacing: '0.05em'
              }}
            >
              Let's run to save the horses!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-16 md:mt-20 lg:mt-24"
            >
              <button
                onClick={handleBuyClick}
                className="relative overflow-hidden group px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
                style={{ 
                  background: 'rgb(255, 121, 208)',
                  boxShadow: '0 10px 30px rgba(255, 121, 208, 0.5)'
                }}
              >
                <span className="relative z-10">Buy on Flap</span>
                {showConfetti && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          x: "50%",
                          y: "50%",
                          scale: 0,
                          rotate: 0,
                        }}
                        animate={{
                          x: `${50 + (Math.random() - 0.5) * 200}%`,
                          y: `${50 + (Math.random() - 0.5) * 200}%`,
                          scale: [0, 1, 0],
                          rotate: 360,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: Math.random() * 0.5,
                        }}
                        className="absolute w-2 h-2 bg-secondary-gold rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </button>
              <button
                onClick={() => scrollTo("#about")}
                className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
                style={{ 
                  background: 'rgb(255, 121, 208)',
                  boxShadow: '0 10px 30px rgba(255, 121, 208, 0.5)'
                }}
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Smooth fade transition to white section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>
    </section>
  );
}
