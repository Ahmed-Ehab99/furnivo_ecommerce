# Furnivo

**Modern furniture eCommerce — React, Next.js & TypeScript**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)

---

## Project Overview

**Furnivo** is a full-stack furniture eCommerce application built with modern web technologies. It provides a responsive, accessible storefront where users can browse categories, view product details, manage a shopping cart, and complete checkout with authentication and Stripe payments.

**Main goals:**

- Deliver a fast, SEO-friendly shopping experience using the Next.js App Router.
- Support multiple locales (e.g. English and Arabic) with RTL layout.
- Integrate authentication, cart, checkout, and payment in one cohesive flow.

---

## Features

- **Home page** — Hero, categories, featured products, and feature highlights.
- **Categories navigation** — Browse by category with slug-based routing and localized content.
- **Product cards** — Price, discount badge, add-to-cart, stock awareness, and responsive layout.
- **Product detail page** — Full product info, gallery, and add-to-cart actions.
- **Shopping UI** — Cart page, cart drawer/button, and add-to-cart components.
- **Checkout** — Multi-step flow (e.g. delivery address, review order) with validation.
- **Authentication** — Email/password and Google sign-in via Better Auth.
- **Payments** — Stripe integration with success/cancel handling and webhooks.
- **Responsive design** — Mobile-first layout with breakpoints and touch-friendly UI.
- **Modern UI** — shadcn/ui (Radix) components, Tailwind, theme toggle, and consistent design tokens.
- **Internationalization (i18n)** — `next-intl` with English and Arabic and RTL support.

---

## Tech Stack

| Technology | Purpose |
|------------|--------|
| **React 19** | UI components and client interactivity |
| **Next.js 16** | App Router, SSR, API routes, and deployment |
| **TypeScript** | Type safety and better DX |
| **Tailwind CSS 4** | Utility-first styling and design system |
| **shadcn/ui (Radix)** | Accessible, customizable UI primitives |
| **next-intl** | Locales (en/ar) and RTL |
| **Better Auth** | Authentication (email/password + Google) |
| **Prisma + Neon** | Database ORM and serverless Postgres |
| **Redux Toolkit** | Cart and checkout state |
| **Stripe** | Payments and webhooks |
| **ImageKit** | Image delivery and optimization |
| **React Hook Form + Zod** | Forms and validation |

---

## Project Structure

```
furnivo_ecommerce/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Locale-based routes (en, ar)
│   │   ├── page.tsx        # Home
│   │   ├── shop/           # Shop listing & filters
│   │   ├── category/[slug]/# Category page
│   │   ├── product/[slug]/ # Product detail
│   │   ├── cart/           # Cart page & actions
│   │   ├── checkout/       # Checkout steps
│   │   ├── auth/           # Sign in / Sign up
│   │   ├── search/         # Search results
│   │   └── payment/        # Success / cancel
│   ├── api/                # API routes (auth, webhooks)
│   └── globals.css         # Global styles & theme
├── components/
│   ├── global/             # Shared UI (Navbar, Footer, ProductCard, etc.)
│   ├── home/               # Home sections (Hero, Categories, Features)
│   └── ui/                 # shadcn/ui primitives (button, dialog, etc.)
├── layouts/                # (if used) Reusable layout wrappers
├── hooks/                  # Custom React hooks (e.g. useCart, useCheckout)
├── lib/                    # Utilities, auth, db, env, types, Stripe, ImageKit
├── types/                  # (or in lib/) Shared TypeScript types
├── redux/                  # Redux store, slices (cart, checkout)
├── contexts/               # React context (e.g. AuthContext)
├── providers/              # App providers (theme, intl, checkout)
├── i18n/                   # next-intl routing & config
├── prisma/                 # Schema, migrations, seed
└── public/                 # Static assets (images, fonts, SVGs)
```

| Folder | Purpose |
|--------|--------|
| `app/` | Routes, layouts, and server components; API and server logic. |
| `components/` | Reusable React components; `global` for site-wide, `home` for homepage, `ui` for design system. |
| `lib/` | Core utilities (`utils`, `db`, `auth`, `env`, `types`), third-party config (Stripe, ImageKit). |
| `redux/` | Global client state for cart and checkout. |
| `contexts/` & `providers/` | Auth and other app-wide context and providers. |
| `i18n/` | Locale list, routing, and next-intl setup. |
| `prisma/` | Data model, migrations, and seed data. |
| `public/` | Static files served at the root. |

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd furnivo_ecommerce

# Install dependencies
npm install
```

---

## Environment Setup

Create a `.env` file in the project root. Required variables (see `lib/env.ts` for full schema):

```env
# Database (Neon recommended)
DATABASE_URL=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Translations (i18nexus)
I18NEXUS_API_KEY=

# Stripe
STRIPE_SECRETE_KEY=
STRIPE_WEBHOOK_SECRET=

# ImageKit
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

Use `.env.example` as a template and never commit real secrets.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (`next dev`) |
| `npm run build` | Build for production (`next build`) |
| `npm run start` | Start production server (`next start`) |
| `npm run lint` | Run ESLint |

---

## UI & Design System

- **Tailwind CSS** — Utility classes, custom theme in `app/globals.css` (`@theme inline`), and design tokens (e.g. `--color-primary`, `--radius-*`). Plugins: `@tailwindcss/typography`, `tailwind-scrollbar`, `tw-animate-css`.
- **shadcn/ui** — Radix-based components in `components/ui/` (e.g. Button, Dialog, Tabs, Carousel, Drawer) for consistency and accessibility.
- **Reusable components** — Shared building blocks live in `components/global/` (e.g. `ProductCard`, `Navbar`, `Footer`, `AddToCartBtn`) and are used across pages.

---

## Routing

Routing is handled by **Next.js App Router** with **next-intl** for locales:

- All main routes are under `app/[locale]/`, so every URL is prefixed by a locale (e.g. `/en/shop`, `/ar/product/sofa`).
- Locales are configured in `i18n/routing.ts` (e.g. `en`, `ar`); the default locale is used when no prefix is present.
- RTL is applied when `locale === "ar"` (e.g. in the root layout).
- Key routes: Home (`/`), Shop (`/shop`), Category (`/category/[slug]`), Product (`/product/[slug]`), Cart (`/cart`), Checkout (`/checkout`), Auth (`/auth`), Search (`/search`), Payment success/cancel (`/payment/success`, `/payment/cancel`).

---

## Future Improvements

- **Testing** — Add unit tests (e.g. Vitest) and E2E tests (e.g. Playwright) for critical flows (cart, checkout, auth).
- **Performance** — Further image optimization, bundle analysis, and caching strategies for product/category data.
- **Backend** — Optional separate API service or BFF layer if moving beyond Next.js API routes.
- **Cart & checkout** — Persistent cart (e.g. DB or cookie), guest checkout, and saved addresses.
- **Auth** — More providers, account settings, and password reset flows.
- **SEO & analytics** — Structured data, sitemap refinements, and conversion tracking.

---

## Screenshots

| Section | Description |
|--------|-------------|
| ![Home](docs/screenshots/home.png) | Home page — hero, categories, and features |
| ![Shop](docs/screenshots/shop.png) | Shop listing with filters and product grid |
| ![Product](docs/screenshots/product.png) | Product detail with gallery and add to cart |
| ![Cart](docs/screenshots/cart.png) | Shopping cart and summary |
| ![Checkout](docs/screenshots/checkout.png) | Checkout steps (address, review, payment) |

*Add real screenshots under `docs/screenshots/` and replace the table above with actual images.*

---

## License

This project is private. All rights reserved.

---

## Author

Furnivo eCommerce — built with React, Next.js, and TypeScript.
