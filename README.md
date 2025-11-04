

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

3) Build for production (optional)

   `npm run build`

   Preview locally:

   `npm run preview`

Notes
- No API keys are required. The AI “Enhance” button is disabled by default. If you later enable it, set `VITE_GEMINI_API_KEY` in `.env.local`.

## Make It Yours (edit the JSON)

All content lives in `data/developer.json`. Replace the values with your information while keeping the same shape.

Minimal example:

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
      "github": "https://github.com/janedoe",
      "website": "janedoe.dev"
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
    },
    {
      "title": "Software Engineer",
      "company": "Beta Ltd",
      "period": "Jun 2021 - Nov 2022",
      "location": "Berlin, Germany",
      "description": [
        "Built internal tools and reporting dashboards with Flask and React."
      ],
      "technologies": ["Flask", "React", "Redis"],
      "relevance": ["fullstack"]
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

Tips
- Keep `relevance` tags consistent across skills/experience/projects; they power the filter chips. Avoid using `all` as a tag — the app adds “All” automatically.
- Use full URLs for `linkedin` and `github` (including `https://`).
- The download filename includes the total years of experience, calculated from the earliest job to today. Use periods like `Dec 2022 - Present` or `Jun 2021 - Nov 2022` for best results.

## Using Filters and Download

- Click a filter (e.g. Backend, Fullstack). The page updates to show only relevant items.
- Click “Download CV” to generate a PDF of the filtered view with compact spacing and print‑friendly typography.

## Optional: Re‑enable AI Summary Enhancer

The codebase contains an optional Gemini integration (currently not shown in the UI). To re‑enable it, set an env var and surface the control:

1) Set `.env.local`:

   `VITE_GEMINI_API_KEY=your_api_key`

2) Wire the enhancer UI back in `App.tsx` (the `ThinkingMode` component). The rest is already configured.

—

Questions or ideas to improve the template? Open an issue or PR!
# Dynamic_Portfolio_CV_Generator
