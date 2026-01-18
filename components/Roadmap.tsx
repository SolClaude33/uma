"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const seasons = [
  {
    title: "Season 1: Launch",
    items: [
      "Fair launch on Solana",
      "Community Discord & Telegram",
      "Initial DEX listing",
      "Social media presence",
      "First community events",
    ],
  },
  {
    title: "Season 2: Growth",
    items: [
      "CEX listings (Tier 2-3)",
      "Brand partnerships",
      "Community governance launch",
      "Merchandise store",
      "Animation teaser release",
    ],
  },
  {
    title: "Season 3: Moon",
    items: [
      "Major CEX listings",
      "Full animation series",
      "Real-world events",
      "Stable expansion program",
      "Cross-chain bridge",
    ],
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-magenta rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            The Road Ahead
          </h2>
          <p className="text-xl text-white/80">
            Our journey from launch to the finish line
          </p>
        </motion.div>

        <div className="space-y-12">
          {seasons.map((season, index) => (
            <div key={season.title} className="relative">
              {/* Character Image - Alternating sides */}
              {index % 2 === 0 ? (
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 relative aspect-[3/4] rounded-2xl overflow-hidden glass-card"
                  >
                    <Image
                      src={
                        index === 0
                          ? "/silencesusuka.png"
                          : index === 1
                          ? "/mv_charaImg.png"
                          : "/oguricap_01.webp"
                      }
                      alt="Racing Character"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-3"
                  >
                    <RoadmapCard season={season} index={index} />
                  </motion.div>
                </div>
              ) : (
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-3 md:order-2"
                  >
                    <RoadmapCard season={season} index={index} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 md:order-1 relative aspect-[3/4] rounded-2xl overflow-hidden glass-card"
                  >
                    <Image
                      src={
                        index === 1
                          ? "/Matikanetannhauser_29.webp"
                          : "/specialweek.png"
                      }
                      alt="Racing Character"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapCard({
  season,
  index,
}: {
  season: { title: string; items: string[] };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="glass-card p-8"
    >
      <h3 className="text-3xl font-bold mb-6 text-gradient">{season.title}</h3>
      <ul className="space-y-4">
        {season.items.map((item, itemIndex) => (
          <motion.li
            key={itemIndex}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + itemIndex * 0.1 }}
            className="flex items-start gap-3 text-white/80"
          >
            <span className="text-primary-cyan mt-1">✓</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
