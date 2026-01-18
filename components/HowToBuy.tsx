"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import {
  FaCoins,
  FaHeart,
  FaChartLine,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useLanguage } from "@/lib/LanguageContext";

export default function HowToBuy() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const steps = useMemo(() => [
    {
      icon: FaCoins,
      title: t.howIsWorking.steps.transactionFee.title,
      description: t.howIsWorking.steps.transactionFee.description,
      image: "/mambo.webp",
    },
    {
      icon: FaHeart,
      title: t.howIsWorking.steps.helpingHorses.title,
      description: t.howIsWorking.steps.helpingHorses.description,
      image: "/oguri.webp",
    },
    {
      icon: FaChartLine,
      title: t.howIsWorking.steps.growingLiquidity.title,
      description: t.howIsWorking.steps.growingLiquidity.description,
      image: "/haruurara.webp",
    },
    {
      icon: FaCheckCircle,
      title: t.howIsWorking.steps.checkData.title,
      description: (
        <>
          {t.howIsWorking.steps.checkData.description.split('\n').map((line, idx, arr) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return <br key={idx} />;
            return (
              <span key={idx}>
                {trimmedLine}
                {idx < arr.length - 1 && <br />}
              </span>
            );
          })}
        </>
      ),
      image: "/agnes.webp",
    },
  ], [t]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  // Pre-cargar todas las imágenes del carrusel al montar el componente
  useEffect(() => {
    steps.forEach((step) => {
      if (step.image) {
        const img = new window.Image();
        img.src = step.image;
      }
    });
  }, []);

  return (
    <section id="how-is-working" className="pt-2 pb-24 relative w-full flex items-center overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Smooth fade transition from image section */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-transparent" />
      </div>
      
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/main 10.png"
          alt="Uma Musume Racing Academy"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
          loading="eager"
          style={{ objectPosition: 'center top' }}
        />
      </div>


      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden z-[2] opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-yellow rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-amber rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
          style={{ marginTop: '5rem' }}
        >
          <h2 
            className="text-5xl md:text-6xl font-bold text-white mb-1"
            style={{ 
              fontFamily: 'Arial, sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 10px rgba(255, 121, 208, 0.8), 0 0 20px rgba(100, 200, 255, 0.6), 0 0 30px rgba(255, 200, 100, 0.4), 0 0 40px rgba(200, 100, 255, 0.3)',
              letterSpacing: '0.05em'
            }}
          >
            {t.howIsWorking.title}
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto mb-8" style={{ paddingTop: '3rem', paddingBottom: '3rem', marginTop: '-5rem' }}>
          {/* Carousel Wrapper with arrows inside */}
          <div className="relative overflow-visible flex items-center justify-center" style={{ minHeight: '750px', padding: '4rem 5rem' }}>
            {/* Carousel Image - Changes based on current slide */}
            <AnimatePresence mode="wait">
              {steps.map((step, index) => {
                if (index !== currentIndex || !step.image) return null;
                
                return (
                  <motion.div
                    key={`image-${step.title}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="absolute"
                    style={{ 
                      ...(index === 0 ? { right: '-2rem' } : index === 2 ? { right: '-4rem' } : index === 3 ? { right: '-6rem' } : { left: 'calc(50% - 288px - 18rem)' }),
                      zIndex: 40, 
                      top: index === 1 ? 'calc(50% - 18rem)' : index === 2 || index === 3 ? 'calc(50% - 18rem)' : 'calc(50% - 10rem)', 
                      transform: 'translateY(-50%)' 
                    }}
                  >
                    <div className="relative" style={{ width: index === 1 || index === 2 || index === 3 ? '576px' : '480px', height: index === 1 || index === 2 || index === 3 ? '576px' : '480px' }}>
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain"
                        quality={90}
                        sizes="576px"
                        priority={index === 0}
                        loading="eager"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Navigation Arrow Left */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center bg-white/80 hover:bg-white/90 transition-all shadow-lg"
              style={{ width: '4.5rem', height: '4.5rem', boxShadow: '0 4px 15px rgba(255, 121, 208, 0.3)', zIndex: 50 }}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-3xl" style={{ color: 'rgb(255, 121, 208)' }} />
            </button>

            {/* Carousel Content */}
            <div className="relative w-full max-w-lg mx-auto">
              <AnimatePresence mode="wait">
                {steps.map((step, index) => {
                  if (index !== currentIndex) return null;
                  const Icon = step.icon;
                  
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="content-box-pastel relative mx-auto"
                      style={{ 
                        fontFamily: 'Arial, sans-serif', 
                        color: '#4a4a4a', 
                        zIndex: 1,
                        width: '100%',
                        ...(index === 3 ? { paddingTop: '3rem', paddingBottom: '3rem' } : {})
                      }}
                    >
                      <div className="flex items-center gap-5 mb-6 relative z-10">
                        <div className="w-18 h-18 rounded-full flex items-center justify-center flex-shrink-0" style={{ width: '6.75rem', height: '6.75rem', background: 'rgba(255, 200, 230, 0.9)' }}>
                          <Icon className="text-3xl" style={{ color: 'rgb(255, 121, 208)' }} />
                        </div>
                        <h3 className="text-3xl font-bold" style={{ color: '#333333' }}>
                          {step.title}
                        </h3>
                      </div>
                      <div className="leading-relaxed text-xl relative z-10" style={{ color: '#4a4a4a' }}>
                        {typeof step.description === 'string' ? (
                          <p>{step.description}</p>
                        ) : (
                          step.description
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Navigation Arrow Right */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center bg-white/80 hover:bg-white/90 transition-all shadow-lg"
              style={{ width: '4.5rem', height: '4.5rem', boxShadow: '0 4px 15px rgba(255, 121, 208, 0.3)', zIndex: 50 }}
              aria-label="Next slide"
            >
              <FaChevronRight className="text-3xl" style={{ color: 'rgb(255, 121, 208)' }} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3" style={{ marginTop: '-6rem' }}>
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="rounded-full transition-all"
                style={{
                  width: index === currentIndex ? '3rem' : '0.75rem',
                  height: '0.75rem',
                  backgroundColor: index === currentIndex ? 'rgb(255, 121, 208)' : 'rgba(255, 200, 230, 0.6)'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Divider Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgb(255, 121, 208), transparent)' }}></div>
    </section>
  );
}
