# Utility Hub

A production-ready, SEO-optimized utility website featuring **20 free online tools** built with [Astro](https://astro.build/), [React](https://react.dev/), and TypeScript.

The site is fully static, completely client-side (no backend, no database, no API calls), and designed for fast loading, mobile-first usage, and AdSense monetization.

## 🧱 Tech Stack

| Layer              | Technology                                                                 |
| :----------------- | :------------------------------------------------------------------------- |
| Framework          | [Astro](https://astro.build/) (static site generation, SSG)                |
| Interactivity      | [React](https://react.dev/) islands (`client:load`)                        |
| Language           | [TypeScript](https://www.typescriptlang.org/) + JavaScript                 |
| Styling            | Custom CSS (utility-first, no external CSS framework)                      |
| SEO Content        | Embedded in Astro pages (structured data, OpenGraph, canonical URLs)       |
| Deployment         | Static hosting (Cloudflare Pages, Vercel, Netlify, GitHub Pages, etc.)     |

## 🧰 20 Utility Tools

### Calculators
| # | Tool | Page | Component | Logic |
| - | :--- | :--- | :-------- | :---- |
| 1 | **Age Calculator** | `src/pages/tools/age-calculator.astro` | `AgeCalculator.tsx` | `ageCalculator.ts` |
| 2 | **Percentage Calculator** | `src/pages/tools/percentage-calculator.astro` | `PercentageCalculator.tsx` | `percentageCalculator.ts` |
| 3 | **Date Difference Calculator** | `src/pages/tools/date-difference-calculator.astro` | `DateDifferenceCalculator.tsx` | `dateDifference.ts` |
| 4 | **Compound Interest Calculator** | `src/pages/tools/compound-interest-calculator.astro` | `CompoundInterestCalculator.tsx` | `compoundInterest.ts` |
| 5 | **BMI Calculator** | `src/pages/tools/bmi-calculator.astro` | `BMICalculator.tsx` | `bmiCalculator.ts` |

### Text Tools
| # | Tool | Page | Component | Logic |
| - | :--- | :--- | :-------- | :---- |
| 6 | **Word Counter** | `src/pages/tools/word-counter.astro` | `WordCounter.tsx` | `textUtils.ts` |
| 7 | **Character Counter** | `src/pages/tools/character-counter.astro` | `CharacterCounter.tsx` | — |
| 8 | **Case Converter** | `src/pages/tools/case-converter.astro` | `CaseConverter.tsx` | `textUtils.ts` |
| 9 | **Remove Extra Spaces** | `src/pages/tools/remove-extra-spaces.astro` | `RemoveExtraSpaces.tsx` | `textUtils.ts` |

### Dev Tools
| # | Tool | Page | Component | Logic |
| - | :--- | :--- | :-------- | :---- |
| 10 | **JSON Formatter** | `src/pages/tools/json-formatter.astro` | `JSONFormatter.tsx` | `devUtils.ts` |
| 11 | **JWT Decoder** | `src/pages/tools/jwt-decoder.astro` | `JWTDecoder.tsx` | `devUtils.ts` |
| 12 | **UUID Generator** | `src/pages/tools/uuid-generator.astro` | `UUIDGenerator.tsx` | `devUtils.ts` |
| 13 | **Base64 Encoder/Decoder** | `src/pages/tools/base64-encoder-decoder.astro` | `Base64Tool.tsx` | `devUtils.ts` |
| 14 | **Timestamp Converter** | `src/pages/tools/timestamp-converter.astro` | `TimestampConverter.tsx` | `devUtils.ts` |
| 15 | **Regex Tester** | `src/pages/tools/regex-tester.astro` | `RegexTester.tsx` | `devUtils.ts` |

### Image / Media Tools
| # | Tool | Page | Component | Logic |
| - | :--- | :--- | :-------- | :---- |
| 16 | **QR Code Generator** | `src/pages/tools/qr-code-generator.astro` | `QRCodeGenerator.tsx` | (canvas-based) |
| 17 | **Image Compressor** | `src/pages/tools/image-compressor.astro` | `ImageCompressor.tsx` | (canvas + `toBlob`) |
| 18 | **Image Resizer** | `src/pages/tools/image-resizer.astro` | `ImageResizer.tsx` | (canvas-based) |
| 19 | **WebP Converter** | `src/pages/tools/webp-converter.astro` | `WebPConverter.tsx` | (canvas + `toBlob`) |

### Design / Utility Tools
| # | Tool | Page | Component | Logic |
| - | :--- | :--- | :-------- | :---- |
| 20 | **Color Picker + HEX/RGB Converter** | `src/pages/tools/color-picker.astro` | `ColorPicker.tsx` | (inline) |

## 📈 SEO Architecture

Every tool page is optimized for Google rankings:

- **Keyword-optimized title tags** (e.g. "Free Age Calculator - Calculate Exact Age Online")
- **Meta descriptions** targeting featured snippets and "how to" queries
- **Canonical URLs** to prevent duplicate content
- **OpenGraph tags** for social sharing
- **Structured data** (SoftwareApplication schema)
- **800–1200 words of SEO content** per tool with H2 sections:
  - What is this tool?
  - How to use it
  - Use cases
  - Benefits
- **FAQ sections** (3–5 questions per tool) for rich snippets
- **Internal linking** — 5 related tools linked at the bottom of each page
- **Long-tail keyword targeting** ("free online calculator", "converter", "generator", etc.)

## ⚡ Performance & UX

- **Mobile-first** responsive design (all tools work on smartphones, tablets, and desktop)
- **Minimal, clean UI** — no ads clutter, no animations that hurt performance
- **Instant results** — all calculations update in real-time as you type
- **Fully client-side** — no server calls, no API dependencies
- **Works offline** — once loaded, tools function without internet
- **Copy-to-clipboard** buttons on applicable tools
- **File download** support for QR codes, compressed images, resized images, and WebP conversions

## 🔒 Privacy

- **Zero data leaves your browser** — all processing is done client-side
- No user accounts, no cookies, no tracking (except what your hosting provider may add)
- No backend, no database, no external API calls

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22.12 or later (required by Astro 6)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/cvesh/utility-hub.git
cd utility-hub

# Install dependencies
npm install

# Start the development server
npm run dev
```

The development server starts at `http://localhost:4321`.

### Project Structure

```
utility-hub/
├── public/                      # Static assets (favicon)
├── src/
│   ├── components/
│   │   └── tools/               # 20 React interactive components (one per tool)
│   │       ├── AgeCalculator.tsx
│   │       ├── PercentageCalculator.tsx
│   │       ├── ...              # (all 20 tools)
│   │       └── ColorPicker.tsx
│   ├── layouts/
│   │   └── Layout.astro         # Shared layout with SEO meta tags & navigation
│   ├── lib/
│   │   └── utils/               # Pure utility functions (no UI code)
│   │       ├── ageCalculator.ts
│   │       ├── bmiCalculator.ts
│   │       ├── compoundInterest.ts
│   │       ├── dateDifference.ts
│   │       ├── devUtils.ts      # JSON, JWT, Base64, UUID, Timestamp, Regex
│   │       ├── percentageCalculator.ts
│   │       └── textUtils.ts     # Word count, case conversion, remove spaces
│   ├── pages/
│   │   ├── index.astro          # Homepage with links to all 20 tools
│   │   └── tools/               # 20 Astro pages with SEO content
│   │       ├── age-calculator.astro
│   │       ├── percentage-calculator.astro
│   │       ├── ...              # (all 20 tool pages)
│   │       └── color-picker.astro
│   └── styles/
│       └── global.css           # Complete utility-class CSS system
├── astro.config.mjs             # Astro + React configuration
├── package.json
└── README.md
```

## 📦 Available Commands

| Command                 | Action                                                |
| :---------------------- | :---------------------------------------------------- |
| `npm install`           | Install all dependencies                              |
| `npm run dev`           | Start local dev server at `localhost:4321`            |
| `npm run build`         | Build static site to `./dist/`                        |
| `npm run preview`       | Preview the production build locally                  |

## 🌐 Deployment

The site generates a fully static output in `dist/`. Deploy to any static hosting provider:

| Provider          | Build command      | Output directory |
| :---------------- | :----------------- | :--------------- |
| Cloudflare Pages  | `npm run build`    | `dist`           |
| Vercel            | `npm run build`    | `dist`           |
| Netlify           | `npm run build`    | `dist`           |
| GitHub Pages      | `npm run build`    | `dist`           |
| Any static server | `npm run build`    | `dist`           |

### Custom Domain

Update `astro.config.mjs` with your domain:

```js
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

Then rebuild and redeploy.

## 🧪 Build Verification

```bash
npm run build
# Expected output: "21 page(s) built" (20 tools + homepage)
```

The build completes in approximately **1–2 seconds** and produces no warnings or errors.

## 📄 License

This project is open source.