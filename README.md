# Portfolio

This project is a personal portfolio built with **Next.js 16**, **React 19**, modular UI architecture, and full multilingual support. It includes a complete development environment featuring **Storybook**, **unit testing**, **linting**, and **i18n** integration.

### URL

https://www.tomasdamianovich.dev/

---

## 🚀 Tech Stack

- **Next.js 16** — Modern framework with SSR/SSG and performance optimizations  
- **React 19** — Component-driven UI with concurrent features  
- **TypeScript** — Type-safe development  
- **i18next + react-i18next** — Internationalization and language management  
- **Storybook 9** — Visual documentation and isolated component development  
- **Jest**, **Testing Library**, **Vitest** — Unit and interaction testing  
- **ESLint** — Code quality and consistent formatting  
- **DOMPurify** — HTML sanitization for security  
- **Vercel Analytics** — Performance monitoring

---

## 📦 Getting Started

### Install dependencies
```bash
pnpm install
```

### Run the development server
```bash
pnpm dev
```

App will be available at:
http://localhost:3000

### Available Scripts

```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production with Turbopack
pnpm start            # Start production server
pnpm storybook        # Start Storybook development server
pnpm build-storybook  # Build Storybook for production
pnpm test             # Run tests with Jest
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage report
pnpm lint             # Run ESLint
```

---

## 🌍 Internationalization

This project uses i18next with a custom hybrid backend for loading and managing translations. The application supports three languages: **English**, **Spanish**, and **German**.

### Language Detection

The language detection follows this priority order:

1. **Query Parameter** (highest priority)
   - Use `?lang=es`, `?lang=en`, or `?lang=de` to preselect a language
   - Example: `https://www.tomasdamianovich.dev/?lang=es`
   - The query parameter is saved to localStorage for future visits

2. **localStorage**
   - If no query parameter is present, the app uses the language stored in localStorage
   - This preference is set when the user manually changes the language

3. **Default**
   - Falls back to English (`en`) if no preference is found

### Features

- **Server-Side Rendering (SSR)** compatible — No hydration errors
- **Query parameter support** — Preselect language via URL
- **Persistent preferences** — Language choice saved in localStorage
- **Automatic detection** — Respects user's browser language on first visit

---

## 📁 Project Structure

```bash
/
├─ .storybook/              # Storybook configuration
├─ components/              # React components
│  ├─ base/                 # Base UI components (Button, Pill)
│  ├─ features/             # Feature components (DarkModeToggle, LanguageSelector)
│  └─ structures/           # Structural components (Section)
├─ helpers/                 # Utility functions
├─ hooks/                   # Custom React hooks
├─ locales/                 # Translation files (source)
│  ├─ en/
│  ├─ es/
│  └─ de/
├─ pages/                   # Next.js pages
│  ├─ _app.tsx             # App wrapper
│  ├─ _document.tsx        # Document customization
│  └─ index.tsx            # Home page
├─ public/                  # Static assets
│  ├─ locales/             # Translation files (served)
│  ├─ robots.txt           # SEO robots file
│  └─ sitemap.xml          # SEO sitemap
├─ scripts/                 # Build and utility scripts
├─ styles/                  # Global styles and CSS modules
├─ i18n.ts                  # i18next configuration
├─ i18n-server-backend.ts  # Server-side i18n backend
└─ package.json
```

---

## 🎨 Features

- **Dark Mode** — Toggle between light and dark themes
- **Multilingual** — Support for English, Spanish, and German
- **Responsive Design** — Mobile-first approach
- **SEO Optimized** — Meta tags, structured data, sitemap, and robots.txt
- **Accessibility** — ARIA labels and keyboard navigation
- **Performance** — Optimized images, code splitting, and lazy loading
- **Security** — HTML sanitization with DOMPurify
### Views

<img alt="portfolio desktop view" src="https://github.com/user-attachments/assets/c7a81f22-e5e4-48fb-a2cc-d01cc963e480" />

<img alt="portfolio mobile view" src="https://github.com/user-attachments/assets/b0cb3bb1-008f-4fbe-be9b-9530baccc093" />

