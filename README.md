# Portfolio

This project is a personal portfolio built with **Next.js 15**, **React 19**, modular UI architecture, and full multilingual support. It includes a complete development environment featuring **Storybook**, **unit testing**, **linting**, and **i18n** integration.

---

## 🚀 Tech Stack

- **Next.js 15** — Modern framework with SSR/SSG and performance optimizations  
- **React 19** — Component-driven UI with concurrent features  
- **i18next + react-i18next** — Internationalization and language management  
- **Storybook 9** — Visual documentation and isolated component development  
- **Jest**, **Testing Library**, **Vitest** — Unit and interaction testing  
- **ESLint** — Code quality and consistent formatting

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

### Internationalization

This project uses i18next with i18next-http-backend for loading and managing translations.
Language detection and switching are handled through react-i18next.

### Folders Structure
```bash
/
├─ .storybook/                     # Storybook config
├─ public/                         # Static assets (images, favicons)
├─ src/
│  ├─ app/ or pages/               # Next.js entry (choose one)
│  │   ├─ layout.tsx
│  │   ├─ page.tsx
│  │   └─ ...                      # routes
│  ├─ components/                  # Reusable UI components
│  │   ├─ Button/
│  │   └─ Header/
│  ├─ ui/                          # Design system / tokens / primitives
│  ├─ styles/                      # Global styles, theme
│  ├─ hooks/                       # Custom hooks
│  ├─ lib/                         # Helpers, api clients
│  ├─ translations/                # i18n json files or backend loader
│  ├─ tests/                       # Unit/integration tests (if not colocated)
│  └─ pages-api/ or api/           # API routes (if used)
├─ .env.local                      # Environment variables (not committed)
├─ package.json
├─ pnpm-lock.yaml
└─ README.md
```
### Views

<img alt="portfolio desktop view" src="https://github.com/user-attachments/assets/c7a81f22-e5e4-48fb-a2cc-d01cc963e480" />

<img alt="portfolio mobile view" src="https://github.com/user-attachments/assets/b0cb3bb1-008f-4fbe-be9b-9530baccc093" />

