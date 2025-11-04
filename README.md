

# Dynamic Portfolio & Smart CV Generator

This is a lightweight React app that renders a portfolio and generates a PDF CV from a single JSON file. You only need to edit `data/developer.json` to make it yours.

The CV download reflects any filters you pick (e.g. Backend, Fullstack) and uses a compact, print‑friendly layout.

## Run Locally

Prerequisites: Node.js 18+

1) Install dependencies

   `npm install`

2) Start the dev server

   `npm run dev`

   Open the URL printed by Vite (usually `http://localhost:5173`).
# Dynamic Portfolio & Smart CV Generator

This is a lightweight React app that renders a portfolio and generates a PDF CV from a single JSON file.

## Overview

- The app renders a single-page portfolio and provides a PDF download of the CV.
- Content comes from a JSON file you can edit to customize the CV.

## How data is loaded (two options)

1) Runtime static file (recommended for easy edits)
- `public/data/developer.json` — this file is copied into `dist/` during build and served as a static asset.
- Edit this file and re-deploy (see Deploy section) to update the live site without changing application code.

2) Bundled fallback
- `src/data/developer.json` is imported into the app and bundled into the JS. It's used as a fallback when the runtime static file is not available.
- Editing this file requires rebuilding the app for changes to appear on the live site.

The app currently attempts a runtime fetch of `data/developer.json` and falls back to the bundled JSON when needed.

## Run Locally

Prerequisites: Node.js 18+

1) Install dependencies

```bash
npm ci
```

2) Start the dev server

```bash
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Build & Preview

```bash
npm run build
npm run preview
```

## Edit your CV JSON (recommended workflow)

- Edit `public/data/developer.json` to change your CV content (personal info, summary, skills, experience, projects, education).
- Keep `relevance` tags consistent across skills/experience/projects; they power the filter chips. Avoid using `all` as a tag — the app adds “All” automatically.

Quick local edit & publish

```bash
# 1) edit public/data/developer.json
git add public/data/developer.json
git commit -m "Update CV data"
git push origin main

# 2) publish to GitHub Pages using the included script
npm ci
npm run deploy
```

This deploy script runs a build and publishes `dist/` to the `gh-pages` branch (the repo already contains a `deploy` script in `package.json`).

Edit in the GitHub UI

- You can also edit `public/data/developer.json` directly on GitHub (click the file in the repo, click the pencil icon, edit, and commit). To have the live site update automatically you'll need an Actions workflow that builds & deploys on push — otherwise run `npm run deploy` locally to publish.

## Troubleshooting

- If your live site shows `Loading Portfolio...`:
  - Open DevTools → Network and check `https://<your-user>.github.io/<repo>/data/developer.json` — it should return HTTP 200 and the JSON body.
  - If it returns 404, the static file wasn't included in the deployed `dist/` (run `npm run deploy` locally or set up Actions).
  - If the JSON returns 200 but the page still shows loading, open Console and paste any errors here and I'll help debug.

## Notes about routing & GitHub Pages

- The Vite `base` config is set to the repo path so asset URLs resolve correctly when deployed to `https://<user>.github.io/<repo>/`.
- If you use client-side browser history routing (React Router), you may see 404s for nested routes on refresh. Two ways to handle that:
  - Use HashRouter instead of BrowserRouter (hash URLs work under static hosting), or
  - Add a `404.html` that redirects to `index.html` (I can add this for you).

## Example JSON shape

Below is a complete example you can copy into `public/data/developer.json`:

```json
{
  "personal": {
    "name": "Jane Doe",
    "title": "Senior Software Engineer (Backend / Full Stack)",
    "contact": {
      "email": "jane@example.com",
      "phone": "+1 555 123 4567",
      "location": "Berlin, Germany",
      "linkedin": "https://www.linkedin.com/in/janedoe/",
      "github": "https://github.com/janedoe"
    }
  },
  "summary": {
    "introduction": "Backend‑focused engineer with a passion for scalable systems and DX.",
    "body": [
      "Experienced with Django/Flask REST APIs and microservices.",
      "Strong with Docker, PostgreSQL, Kafka, Redis, and CI/CD.",
      "Comfortable on the frontend with React when needed."
    ]
  },
  "skills": [
    { "name": "Python", "category": "Languages", "relevance": ["backend", "fullstack"] },
    { "name": "Django & DRF", "category": "Backend", "relevance": ["backend", "fullstack"] },
    { "name": "React", "category": "Frontend", "relevance": ["frontend", "fullstack"] }
  ],
  "experience": [
    {
      "title": "Senior Software Engineer (Backend)",
      "company": "Acme Corp",
      "period": "Dec 2022 - Present",
      "location": "Remote",
      "description": [
        "Designed and shipped REST APIs with Django and DRF.",
        "Improved p95 latency by 60% via caching and query tuning."
      ],
      "technologies": ["Python", "Django", "PostgreSQL", "Docker"],
      "relevance": ["backend", "fullstack"]
    }
  ],
  "projects": [
    {
      "title": "Invoice Portal",
      "description": "Self‑serve invoice and payment portal for customers.",
      "technologies": ["Django", "PostgreSQL"],
      "link": "https://github.com/janedoe/invoice-portal",
      "relevance": ["backend", "fullstack"]
    }
  ],
  "education": [
    {
      "degree": "BSc Computer Science",
      "institution": "University of Example",
      "period": "2016 - 2020",
      "details": "Graduated with honors."
    }
  ]
}
```

If you'd like, I can also:
- Add a GitHub Actions workflow to auto-build & deploy `dist` to `gh-pages` on push.
- Add a `404.html` redirect to `index.html` for client-side routing support.

Open a message telling me which of those you'd like and I will add them next.
