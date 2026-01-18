"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function About() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Activar la animación inmediatamente cuando el componente se monta
    if (titleRef.current) {
      setTimeout(() => {
        titleRef.current?.classList.add('visible');
      }, 300);
    }
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Smooth fade transition from image to white */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent" />
      </div>
      
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/main5.avif"
          alt="Uma Musume Racing Academy"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
          loading="eager"
          sizes="100vw"
        />
      </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-24">
          <div className="max-w-[70rem] mx-auto">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center relative"
            >
              <div className="relative inline-block mb-4" style={{ transform: 'translateY(2rem)', zIndex: 10 }}>
                <motion.h2
                  ref={titleRef}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="section-title font-bold whitespace-nowrap text-[2.34375rem] md:text-[2.8125rem] lg:text-[3.75rem]"
                  style={{ 
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '0.05em',
                    position: 'relative',
                    zIndex: 10
                  }}
                >
                  What is Uma Musume?
                </motion.h2>
              </div>
              <div className="content-box space-y-8 leading-relaxed relative text-[1.40625rem] md:text-[1.5625rem] lg:text-[1.875rem]" style={{ fontFamily: 'Arial, sans-serif', color: '#4a4a4a', zIndex: 1 }}>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <strong>Uma Musume: Pretty Derby</strong> is a Japanese anime and game franchise by Cygames that turns legendary real-life racehorses into &quot;horse girls&quot; who train, race, and chase their dreams while honoring the history behind each horse.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Beyond entertainment, the Uma Musume community is known for being exceptionally generous and respectful toward real horses. Fans actively support retired racehorses through donations, farm visits, and welfare initiatives, helping give these champions a better life after racing.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  This year is about more than racing, it&apos;s about giving back.<br />
                  <strong>Let&apos;s save the horses in their year.</strong>
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      
      {/* Smooth fade transition to image section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
      </div>

      {/* Hayakawa Tazuna Image - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-8 z-20"
        style={{ left: '-1rem' }}
      >
        <div className="relative w-[27rem] h-[27rem] md:w-[34.875rem] md:h-[34.875rem] lg:w-[42.75rem] lg:h-[42.75rem]">
          <Image
            src="/hayakawatazuna.webp"
            alt="Hayakawa Tazuna"
            fill
            className="object-contain"
            quality={90}
          />
        </div>
      </motion.div>

      {/* Oguri Cap Image - Right Center */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute z-20"
        style={{ right: '8rem', top: 'calc(50% + 4rem)', transform: 'translateY(-50%)' }}
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <Image
            src="/ogurcap2.png"
            alt="Oguri Cap"
            fill
            className="object-contain"
            quality={90}
          />
        </div>
      </motion.div>
    </section>
  );
}
