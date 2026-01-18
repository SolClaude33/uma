"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FullscreenImage from "@/components/FullscreenImage";
import HowToBuy from "@/components/HowToBuy";
import Footer from "@/components/Footer";
import ImagePreloader from "@/components/ImagePreloader";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="relative">
      <ImagePreloader />
      <Navigation />
      <Hero />
      <About />
      <FullscreenImage />
      <HowToBuy />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
