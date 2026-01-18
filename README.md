# UMAX Landing Page

A high-energy racing-idol memecoin landing page built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
umamusume/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── Navigation.tsx      # Top navigation with mobile menu
│   ├── Hero.tsx            # Hero section with CTAs and stats
│   ├── About.tsx           # About section with feature cards
│   ├── Tokenomics.tsx      # Tokenomics with donut chart
│   ├── Roadmap.tsx         # Roadmap with season cards
│   ├── HowToBuy.tsx        # Step-by-step buying guide
│   ├── Community.tsx       # Social links and newsletter
│   ├── Footer.tsx          # Footer with disclaimer
│   └── ScrollToTop.tsx     # Floating scroll-to-top button
├── public/                 # Static assets (images)
└── README.md
```

## 🎨 Customization

### Text Content

Edit the text directly in the component files:
- **Hero**: `components/Hero.tsx` - Main headline and subheadline
- **About**: `components/About.tsx` - Academy description and feature cards
- **Tokenomics**: `components/Tokenomics.tsx` - Allocation percentages and contract address
- **Roadmap**: `components/Roadmap.tsx` - Season titles and items
- **Community**: `components/Community.tsx` - Social links and stable chants

### Colors

Colors are defined in `tailwind.config.ts`:
- Primary magenta: `#FF00FF`
- Primary cyan: `#00FFFF`
- Secondary gold: `#FFD700`
- Dark background: `#0a0a0f`
- Dark surface: `#151520`

### Images

Replace images in the `public/` folder:
- `main 2.jpg` - Hero section image
- `main.jpg` - About section image
- Character images - Used in Tokenomics and Roadmap sections

Update image paths in the respective component files.

### Links

Update placeholder links in:
- **Navigation**: Social media and DEX links
- **Community**: X (Twitter), Telegram, Discord URLs
- **Tokenomics**: Contract address (replace `UMAX...placeHolder123456789`)

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## 📝 SEO & Metadata

Edit SEO metadata in `app/layout.tsx`:
- Page title
- Meta description
- Open Graph tags

## ⚠️ Important Notes

- **No Backend**: This is a static landing page with no database or backend functionality.
- **Newsletter**: The newsletter form is UI-only (no actual submission).
- **Disclaimer**: The footer includes a disclaimer that UMAX is fan-inspired and not affiliated with any franchise.
- **Images**: Ensure all images are optimized and properly licensed.

## 🚢 Build for Production

```bash
npm run build
npm start
```

## 📄 License

This project is for educational/demonstration purposes.

---

Built with ❤️ using Next.js and Tailwind CSS.
