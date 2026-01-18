"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative py-3 min-h-[10vh] overflow-hidden" style={{ backgroundColor: '#e5e5e5' }}>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="relative h-6 w-auto mx-auto mb-2" style={{ aspectRatio: 'auto', minWidth: '60px', maxWidth: '90px' }}>
            <Image
              src="/Uma_Musume_Pretty_Derby_JP_Logo.webp"
              alt="Uma Musume Pretty Derby Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80px, 120px"
            />
          </div>
          <p className="text-gray-700 text-xs">
            © {new Date().getFullYear()} {t.footer.copyright}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
