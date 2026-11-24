# Namma Yojane – Karnataka Scheme Finder

A bilingual (English / ಕನ್ನಡ) prototype that helps people in Karnataka discover
government schemes they may be eligible for.

> **Demo prototype.** All scheme records are fictional sample data. Login and the
> "AI assistant" are placeholders – no real authentication or AI model is connected.
> Always confirm details on official government websites.

## Features

- **Explore** – search and filter schemes by category, department and benefit type.
- **Find my schemes** – a 5-step questionnaire; answers stay in the browser
  (sessionStorage) and are matched with transparent rules in
  `src/utils/eligibility.js`. Any failed requirement (age, gender, student,
  farmer, disability, occupation) excludes a scheme.
- **Scheme details**, **saved schemes** (stored in localStorage) and a Kannada toggle.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Deploy (GitHub Pages)

The workflow in `.github/workflows/deploy.yml` builds and publishes the site on
every push to `main`.

1. Push this repository to GitHub.
2. In the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Tech

React 19, Vite, React Router, Tailwind CSS, lucide-react icons.
