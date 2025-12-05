# VoxenShop — Mini E‑Commerce Demo (Next.js + TypeScript)

A small demo marketplace built with Next.js App Router, TypeScript and Tailwind CSS. It includes a Home page, Product listing, Product details, Cart, Checkout, Login (client-side), and Orders — all wired together with React Context for state and localStorage persistence for demo purposes.

This README documents how to run the project locally, the main architecture, where data is stored today, and how to deploy to Vercel.

---

## Quick Start

Prerequisites:
- Node.js (16+ recommended) — check with `node -v`.
- npm (comes with Node) or an alternative package manager.

Install dependencies and run the dev server:

```powershell
cd C:\My\Voxen\ecommerce-app
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production:

```powershell
npm run build
npm run start
```

---

## Project Structure (high level)

- `app/` — Next.js App Router pages and layouts. Key pages:
  - `app/page.tsx` — Home
  - `app/products/page.tsx` — Products listing
  - `app/checkout/page.tsx` — Checkout flow
  - `app/login` — Login / register UI
  - `app/api/*` — mock API routes for products
- `components/` — Reusable UI components (`ProductCard`, `HeroCarousel`, `Navbar`, etc.)
- `context/` — React Context providers for app state:
  - `AuthContext.tsx` — client-side auth (localStorage)
  - `CartContext.tsx` — cart persistence and helpers
  - `OrderContext.tsx` — order creation/storage
- `data/products.ts` — mock product data used by API routes and pages
- `public/`, `styles/`, `next.config.js`, `package.json` — standard Next.js files

---

## Features

- Product listing with search, categories, price filtering, and sorting
- Sale banners and featured carousel on Home
- Product details page
- Cart with quantity updates and persistence
- Checkout flow with client-side validation and order creation
- Login/register stored in `localStorage` (demo only)
- Orders list persisted to `localStorage`

---

## Where user and app data is currently saved

This demo stores users, cart items and orders in the browser `localStorage` (no backend):

- `AuthContext` reads/writes a `users` array and `currentUser` session key (look in `src/context/AuthContext.tsx`).
- `CartContext` persists cart state to a `cart` key in `localStorage`.
- `OrderContext` persists orders to an `orders` key.

These are intentionally simple for a demo. See the sections below for how to move to a server-backed approach.

---

## Validation & UX

- Checkout includes client-side validation for shipping and payment fields and shows inline error messages.
- ProductCard and other interactive components are implemented as client components when needed.

---



Notes:
- If your app fetches external images, ensure `next.config.js` `images.remotePatterns` includes the domains.
- For App Router projects, Vercel supports the setup out-of-the-box.

---

## Moving from localStorage to a server (recommended for production)

High-level steps:

1. Add API endpoints (serverless functions or a small API server) for auth and orders.
2. Replace `AuthContext.register/login` to POST to `/api/auth/register` and `/api/auth/login`.
3. Use secure cookies (httpOnly) or JWTs for authentication — do not store secrets in `localStorage`.
4. Replace `OrderContext.addOrder` to POST orders to the server (which stores them in a DB).
5. Keep client-side caching as an optional performance layer.

Suggested backend options: Supabase, Firebase, PlanetScale (MySQL), or a small Express/Next server with PostgreSQL.

---

## Development notes & troubleshooting

- If images fail to load in production, add the host to `next.config.js` `images.remotePatterns` and redeploy.
- If build fails on Vercel, check build logs for missing env vars, Node version mismatches, or TypeScript errors.
- Use `npm run build` locally to reproduce production build issues before deploying.

---



If you'd like, I can:
- Add serverless API endpoints (orders/auth) that persist to a simple JSON file (demo),
- Or scaffold an integration with Supabase for persistent users and orders.

Tell me which option you prefer and I'll implement it.
