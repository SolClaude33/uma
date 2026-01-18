"use client";

import { useEffect } from "react";

// Preload critical background images
const criticalImages = [
  "/main2.avif",    // Hero section
  "/main5.avif",    // About section
  "/main6.avif",    // Dashboard section
  "/main 7.jpg",    // Community section
  "/main 10.png",   // How is working section
];

export default function ImagePreloader() {
  useEffect(() => {
    // Preload critical background images
    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.setAttribute("fetchpriority", "high");
      document.head.appendChild(link);

      // Also preload using Image object as fallback
      const img = new Image();
      img.src = src;
    });
  }, []);

  return null;
}
