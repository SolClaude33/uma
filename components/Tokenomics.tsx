"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import Image from "next/image";

const tokenomics = [
  { label: "Liquidity", value: 70, color: "#FF00FF" },
  { label: "Community", value: 20, color: "#00FFFF" },
  { label: "Marketing", value: 10, color: "#FFD700" },
];

const contractAddress = "UMAX...placeHolder123456789";

export default function Tokenomics() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const totalSupply = 1000000000;
  const circumference = 2 * Math.PI * 45; // radius 45

  return (
    <section id="tokenomics" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-cyan rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            Tokenomics
          </h2>
          <p className="text-xl text-white/80">
            Transparent allocation for a fair race
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Chart and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Donut Chart */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <svg
                  width="240"
                  height="240"
                  viewBox="0 0 120 120"
                  className="transform -rotate-90"
                >
                  {tokenomics.map((item, index) => {
                    const offset = tokenomics
                      .slice(0, index)
                      .reduce((acc, curr) => acc + (curr.value / 100) * circumference, 0);
                    const dashArray = (item.value / 100) * circumference;
                    const dashOffset = circumference - offset;

                    return (
                      <circle
                        key={item.label}
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="12"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">
                      {totalSupply.toLocaleString()}
                    </div>
                    <div className="text-sm text-white/60 mt-1">Total Supply</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Allocation Details */}
            <div className="space-y-4">
              {tokenomics.map((item) => (
                <div key={item.label} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{item.label}</span>
                    <span className="text-secondary-gold font-bold">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image and Contract */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Character Image - Left side (alternating) */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card">
              <Image
                src="/specialweek.png"
                alt="Racing Character"
                fill
                className="object-cover"
              />
            </div>

            {/* Contract Address */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 text-white">
                Contract Address
              </h3>
              <div className="flex items-center gap-4 bg-dark-bg/50 rounded-lg p-4">
                <code className="flex-1 text-sm text-white/80 break-all">
                  {contractAddress}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-primary-magenta/20 hover:bg-primary-magenta/40 rounded-lg transition-colors flex items-center gap-2 text-white"
                  aria-label="Copy contract address"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-primary-cyan" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-yellow-400 mt-4 flex items-center gap-2">
                ⚠️ Always verify the contract address before trading
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
