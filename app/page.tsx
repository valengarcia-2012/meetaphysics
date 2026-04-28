import Link from "next/link";
import { cards } from "@/lib/cards";

const modes = [
  {
    href: "/flashcards",
    title: "Flashcards",
    desc: "Tap to flip. Front shows the term or question; back has the full answer.",
    icon: "🃏",
    accent: "from-purple-100 to-purple-50",
  },
  {
    href: "/learn",
    title: "Learn",
    desc: "Multiple choice. Get it wrong and the card cycles back until you nail it.",
    icon: "📚",
    accent: "from-blue-100 to-blue-50",
  },
  {
    href: "/match",
    title: "Match",
    desc: "Timed game: pair each term with its definition as fast as you can.",
    icon: "⚡",
    accent: "from-amber-100 to-amber-50",
  },
  {
    href: "/test",
    title: "Test",
    desc: "10-question mixed quiz. Get a score, see what you missed.",
    icon: "📝",
    accent: "from-emerald-100 to-emerald-50",
  },
];

export default function Home() {
  const vocabCount = cards.filter((c) => c.type === "vocab").length;
  const essayCount = cards.filter((c) => c.type === "essay").length;

  return (
    <main className="min-h-screen px-5 py-8 sm:py-12 max-w-2xl mx-auto">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">
          Final exam · May 4, 2026
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight">
          Metaphysics Quiz
        </h1>
        <p className="text-sm text-muted mt-2">
          Free will · Ethics · Fine-tuning argument for God
        </p>
        <p className="text-xs text-muted mt-2">
          {vocabCount} vocab cards · {essayCount} essay cards
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {modes.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:border-accent hover:shadow-lg active:scale-[0.98]`}
          >
            <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${m.accent} opacity-60 transition-opacity group-hover:opacity-100`} />
            <div className="relative">
              <div className="text-3xl mb-2">{m.icon}</div>
              <h2 className="text-lg font-bold text-ink mb-1">{m.title}</h2>
              <p className="text-sm text-muted leading-snug">{m.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-accentSoft p-4 text-sm text-ink">
        <p className="font-semibold mb-1">💡 Study tip</p>
        <p className="text-muted leading-relaxed">
          Lock in vocab first with <strong>Flashcards</strong>, then drill with <strong>Learn</strong>.
          Use <strong>Match</strong> for fast review and <strong>Test</strong> the day before.
        </p>
      </div>

      <footer className="mt-10 text-center text-xs text-muted">
        <p>Save to home screen for offline study.</p>
      </footer>
    </main>
  );
}
