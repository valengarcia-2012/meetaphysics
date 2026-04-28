# Metaphysics Quiz

A flashcard study app for the metaphysics final exam. Built with Next.js + Tailwind.

## Four study modes

- **Flashcards** — Tap to flip. Filter by vocab / essays / all. Shuffle and restart.
- **Learn** — Multiple choice. Cards you miss cycle back into the queue until you've mastered them all.
- **Match** — Timed pairing game. 6 pairs. Best time saved to localStorage.
- **Test** — 10-question scored quiz with per-question review and grade.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel (one-shot)

### Option 1: Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Accept the defaults — Vercel auto-detects Next.js. Done in ~30 seconds.

### Option 2: GitHub + Vercel dashboard

1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to https://vercel.com/new
3. Import the repo. Vercel auto-detects Next.js — just click **Deploy**.

You'll get a URL like `metaphysics-quiz-yourname.vercel.app`. Open it on your phone and tap "Add to Home Screen" for an app-like experience.

## Editing cards

All study content is in `lib/cards.ts`. Each card has:
- `front` — the term or essay question
- `shortAnswer` — one-sentence summary used in multiple-choice options & match game
- `fullAnswer` — full markdown answer shown on flashcard back & after wrong learn-mode answers

Markdown supports `**bold**`, `*italic*`, blockquotes (`> ...`), and ordered/unordered lists.

## Tech stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3
- TypeScript
- No external state management, no database — fully static, deployable anywhere
- Best Match-mode time persists to `localStorage`
