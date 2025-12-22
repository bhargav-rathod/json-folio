# Project Architecture & Structure

This document explains the architecture and structure of the Portfolio website, built with Next.js, TypeScript, and Tailwind CSS. It is designed for easy onboarding, maintainability, and future releases.

---

## 1. High-Level Overview

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State/Effects:** React hooks
- **Deployment:** Vercel (recommended)
- **Performance:** Dynamic imports, Suspense, code splitting, image optimization

---

## 2. Directory Structure

```
json-folio/
├── archived/                # Legacy or backup data and images
├── public/                  # Static assets (images, favicon, etc.)
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sections/    # All main page sections (About, Skills, Projects, etc.)
│   │   │   ├── Navbar.tsx   # Top navigation bar
│   │   │   ├── Loading.tsx  # Loading spinner/component
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ProjectCarousel.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   ├── config/          # Theme and configuration files
│   │   ├── context/         # (Reserved for React context, if needed)
│   │   ├── functions/       # Utility functions (analytics, effects, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── styles/          # (Reserved for custom CSS modules)
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility helpers (icons, etc.)
│   │   ├── globals.css      # Global styles (Tailwind base)
│   │   ├── layout.tsx       # App layout (header/footer wrappers)
│   │   ├── page.tsx         # Main entry point (home page)
│   ├── components/          # (Reserved for shared/global components)
│   ├── utils/               # (Reserved for shared/global utilities)
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies and scripts
├── README.md                # Basic project info
└── projectArchitecture.md   # (This file)
```

---

## 3. Key Architectural Concepts

### a. **Sections as Components**
- Each major part of the portfolio (About, Skills, Projects, etc.) is a React component in `src/app/components/sections/`.
- Sections are dynamically imported in `page.tsx` and wrapped in `<Suspense>` for optimal client-side performance.

### b. **Dynamic Imports & Suspense**
- Heavy or non-critical components are loaded only when needed, reducing initial bundle size and improving load speed.
- Example:
  ```tsx
  const ProjectsSection = dynamic(() => import('./components/sections/ProjectsSection'), { ssr: false, loading: () => <div /> });
  <Suspense fallback={<div />}> <ProjectsSection ... /> </Suspense>
  ```

### c. **Type Safety**
- All data structures and props are typed in `src/app/types/portfolio-data.type.ts` for reliability and maintainability.

### d. **Utility Functions & Hooks**
- Reusable logic (e.g., analytics, typewriter effect) is in `src/app/functions/` and `src/app/hooks/`.

### e. **Styling**
- Tailwind CSS is used for rapid, consistent styling.
- Global styles and customizations are in `globals.css` and `tailwind.config.ts`.

### f. **Static Assets**
- All images and static files are in `public/`.
- Use Next.js `Image` component for optimized image loading.

### g. **Configuration**
- Theme and other config files are in `src/app/config/`.

---

## 4. Adding or Modifying Sections

1. **Create/Edit Section:**
   - Add a new file in `src/app/components/sections/` (e.g., `NewSection.tsx`).
   - Export as default.
2. **Update Exports:**
   - Add export in `src/app/components/sections/index.ts` if needed.
3. **Dynamic Import:**
   - In `page.tsx`, add a dynamic import and wrap in `<Suspense>`.
4. **Pass Data:**
   - Update the data structure in `portfolio-data.type.ts` if new data is needed.

---

## 5. Best Practices for Future Releases

- **Use dynamic imports** for all large or non-critical components.
- **Keep all types in `types/`** for maintainability.
- **Use hooks for shared logic** (e.g., scroll tracking, analytics).
- **Purge unused CSS** via Tailwind config for minimal bundle size.
- **Optimize images** and use the Next.js `Image` component.
- **Document new sections and utilities** in this file for team clarity.
- **Test performance** with Lighthouse and Next.js bundle analyzer before release.
- **Keep dependencies updated** and remove unused packages.

---

## 6. Release Checklist

- [ ] All new sections/components are dynamically imported and wrapped in `<Suspense>`
- [ ] Types are updated for any new data
- [ ] No unused CSS or JS in the bundle
- [ ] Images are optimized and loaded via Next.js `Image`
- [ ] All new logic is documented in this file
- [ ] Run `npm run analyze` and address any large bundle warnings
- [ ] Update `README.md` and `projectArchitecture.md` as needed

---

**This architecture ensures the project is scalable, maintainable, and high-performing for future releases.** 