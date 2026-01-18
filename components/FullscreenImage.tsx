"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaCoins, FaChartLine, FaHeart } from "react-icons/fa";

export default function FullscreenImage() {
  // Placeholder data - estos valores se conectarán a una API después
  const totalFeesCollected = "0.00"; // BNB
  const liquidityAdded = "0.00"; // BNB
  const horsesHelped = "-"; // Se definirá después

  return (
    <section id="dashboard" className="relative w-full flex items-center justify-center overflow-hidden">
      {/* Fullscreen Background Image - adapts to image's natural resolution */}
      <div className="relative w-full min-h-[120vh]">
        <Image
          src="/main6.avif"
          alt="Uma Musume Racing Academy"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>
      
      {/* Dashboard Panel - Center - Race Track Style */}
      <div className="absolute inset-0 z-30 flex items-start justify-center pointer-events-none" style={{ paddingTop: '15rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pointer-events-auto relative"
          style={{
            fontFamily: 'monospace, "Courier New", sans-serif',
            maxWidth: '700px',
            width: '90%',
            background: '#1a1a1a',
            border: '8px solid #2a2a2a',
            borderRadius: '4px',
            padding: '0',
            boxShadow: '0 0 40px rgba(255, 255, 255, 0.3), inset 0 0 40px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}
        >
          {/* Outer bezel frame */}
          <div className="absolute inset-0 border-4" style={{ 
            borderColor: '#3a3a3a',
            borderRadius: '4px',
            pointerEvents: 'none'
          }}></div>
          
          {/* Inner screen border */}
          <div className="absolute inset-2 border-4" style={{ 
            borderColor: '#ffffff',
            borderRadius: '2px',
            pointerEvents: 'none',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
          }}></div>

          {/* Screen content */}
          <div className="relative z-10" style={{
            background: 'rgba(0, 0, 0, 0.9)',
            padding: '2rem',
            margin: '12px'
          }}>
          {/* Title */}
          <div className="text-center mb-6" style={{ borderBottom: '3px solid #ffffff', paddingBottom: '1rem' }}>
            <h2 className="text-3xl" style={{ 
              color: '#ffffff', 
              fontWeight: '900',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.6), 0 0 45px rgba(255, 255, 255, 0.3)',
              letterSpacing: '0.2em',
              fontFamily: 'monospace, "Courier New", sans-serif'
            }}>
              DASHBOARD
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* Total Fees Collected */}
            <div className="flex items-center justify-between p-4" style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              border: '3px solid #ffffff',
              borderRadius: '4px',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)'
            }}>
              <div className="flex items-center gap-3">
                <FaCoins className="text-2xl" style={{ color: '#ffffff' }} />
                <p className="text-base uppercase tracking-wider" style={{ color: '#ffffff', opacity: 0.9, fontWeight: '700' }}>
                  Total Fees
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-mono" style={{ 
                  color: '#ffffff',
                  fontWeight: '900',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.5)'
                }}>
                  {totalFeesCollected}
                </p>
                <p className="text-sm uppercase" style={{ color: '#ffffff', opacity: 0.7, fontWeight: '700' }}>
                  BNB
                </p>
              </div>
            </div>

            {/* Liquidity Added */}
            <div className="flex items-center justify-between p-4" style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              border: '3px solid #ffffff',
              borderRadius: '4px',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)'
            }}>
              <div className="flex items-center gap-3">
                <FaChartLine className="text-2xl" style={{ color: '#ffffff' }} />
                <p className="text-base uppercase tracking-wider" style={{ color: '#ffffff', opacity: 0.9, fontWeight: '700' }}>
                  Liquidity
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-mono" style={{ 
                  color: '#ffffff',
                  fontWeight: '900',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.5)'
                }}>
                  {liquidityAdded}
                </p>
                <p className="text-sm uppercase" style={{ color: '#ffffff', opacity: 0.7, fontWeight: '700' }}>
                  BNB
                </p>
              </div>
            </div>

            {/* Horses Helped */}
            <div className="flex items-center justify-between p-4" style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              border: '3px solid #ffffff',
              borderRadius: '4px',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)'
            }}>
              <div className="flex items-center gap-3">
                <FaHeart className="text-2xl" style={{ color: '#ffffff' }} />
                <p className="text-base uppercase tracking-wider" style={{ color: '#ffffff', opacity: 0.9, fontWeight: '700' }}>
                  Horses Helped
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-mono" style={{ 
                  color: '#ffffff',
                  fontWeight: '900',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.5)'
                }}>
                  {horsesHelped}
                </p>
              </div>
            </div>
          </div>
          </div>

          {/* Corner bolts/screws for realistic frame */}
          <div className="absolute top-3 left-3 w-3 h-3 rounded-full" style={{ background: '#4a4a4a', border: '1px solid #2a2a2a' }}></div>
          <div className="absolute top-3 right-3 w-3 h-3 rounded-full" style={{ background: '#4a4a4a', border: '1px solid #2a2a2a' }}></div>
          <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full" style={{ background: '#4a4a4a', border: '1px solid #2a2a2a' }}></div>
          <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full" style={{ background: '#4a4a4a', border: '1px solid #2a2a2a' }}></div>
        </motion.div>
      </div>

      {/* Smooth fade transition at top (from white section) */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-transparent" />
      </div>
      
      {/* Smooth fade transition at bottom (to image section) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
      </div>
      
      {/* Divider Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgb(255, 121, 208), transparent)' }}></div>
      
      {/* Character Images - Bottom Left */}
      <div className="absolute bottom-8 left-8 z-20 flex items-end">
        {/* Special Week */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]"
        >
          <Image
            src="/specialweek.png"
            alt="Special Week"
            fill
            className="object-contain drop-shadow-2xl"
            quality={90}
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
          />
        </motion.div>
      </div>
      
      {/* Silence Suzuka - positioned lower */}
      <div className="absolute -bottom-8 left-8 z-20 flex items-end">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]"
          style={{ marginLeft: 'calc(320px + 1rem)' }}
        >
          <Image
            src="/silencesusuka.png"
            alt="Silence Suzuka"
            fill
            className="object-contain drop-shadow-2xl"
            quality={90}
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
          />
        </motion.div>
      </div>
    </section>
  );
}
