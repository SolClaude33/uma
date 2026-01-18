"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { FaXTwitter, FaTelegram, FaDiscord } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi";

const socialLinks = [
  {
    icon: FaXTwitter,
    label: "X (Twitter)",
    href: "#",
    color: "hover:text-white",
    bg: "hover:bg-white/10",
  },
  {
    icon: FaTelegram,
    label: "Telegram",
    href: "#",
    color: "hover:text-blue-400",
    bg: "hover:bg-blue-500/10",
  },
  {
    icon: FaDiscord,
    label: "Discord",
    href: "#",
    color: "hover:text-indigo-400",
    bg: "hover:bg-indigo-500/10",
  },
];

const stableChants = [
  "Race to the moon! 🏁",
  "Speed is our creed! ⚡",
  "Together we shine! ✨",
  "Victory is ours! 🏆",
  "Full speed ahead! 🚀",
  "We are UMAX! 💎",
];

export default function Community() {
  const [currentChant, setCurrentChant] = useState(0);
  const [email, setEmail] = useState("");

  const cycleChant = () => {
    setCurrentChant((prev) => (prev + 1) % stableChants.length);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: no actual submission
    alert("Newsletter signup coming soon!");
    setEmail("");
  };

  return (
    <section id="community" className="py-24 relative overflow-hidden min-h-screen flex items-center">
      {/* Smooth fade transition from image section */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-transparent" />
      </div>
      
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/main 7.jpg"
          alt="Uma Musume Racing Academy"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
          loading="eager"
        />
      </div>
      
      <div className="absolute inset-0 opacity-10 z-[1]">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary-yellow rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            Join the Stable
          </h2>
          <p className="text-xl text-white/90 drop-shadow-lg">
            Connect with racers around the world
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card p-6 flex flex-col items-center gap-3 transition-all ${social.color} ${social.bg} hover:scale-110 min-w-[140px]`}
                >
                  <Icon className="text-4xl" />
                  <span className="font-semibold">{social.label}</span>
                </a>
              );
            })}
          </motion.div>

          {/* Stable Chant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-lg">
              Stable Chant
            </h3>
            <button
              onClick={cycleChant}
              className="glass-card p-8 min-w-[300px] relative overflow-hidden group"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentChant}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-3xl font-bold text-gradient"
                >
                  {stableChants[currentChant]}
                </motion.p>
              </AnimatePresence>
              <motion.div
                className="absolute top-4 right-4 text-primary-yellow"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <HiSparkles className="text-2xl" />
              </motion.div>
              <p className="text-sm text-white/70 mt-4">
                Click to cycle through chants
              </p>
            </button>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h3 className="text-2xl font-bold mb-4 text-white text-center drop-shadow-lg">
              Stay Updated
            </h3>
            <p className="text-white/90 text-center mb-6 drop-shadow">
              Get the latest news and updates from the UMAX academy
            </p>
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-yellow"
                />
                <button
                  type="submit"
                  className="glow-button px-6 py-3 text-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
