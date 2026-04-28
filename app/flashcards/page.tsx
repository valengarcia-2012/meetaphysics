"use client";

import { useState, useMemo, useEffect } from "react";
import { cards as allCards, type Card } from "@/lib/cards";
import { renderMarkdown } from "@/lib/markdown";
import { PageHeader } from "@/components/PageHeader";

type Filter = "all" | "vocab" | "essay";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [order, setOrder] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "all") return allCards;
    return allCards.filter((c) => c.type === filter);
  }, [filter]);

  // Reset deck when filter changes
  useEffect(() => {
    setOrder(filtered);
    setIndex(0);
    setFlipped(false);
  }, [filtered]);

  const card = order[index];

  function next() {
    if (index < order.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    }
  }
  function prev() {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
    }
  }
  function shuffleDeck() {
    setOrder(shuffle(filtered));
    setIndex(0);
    setFlipped(false);
  }
  function reset() {
    setOrder(filtered);
    setIndex(0);
    setFlipped(false);
  }

  // Keyboard nav
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, order.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!card) {
    return (
      <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto">
        <PageHeader title="Flashcards" />
        <p className="text-muted">No cards in this filter.</p>
      </main>
    );
  }

  const progress = ((index + 1) / order.length) * 100;

  return (
    <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto flex flex-col">
      <PageHeader title="Flashcards" subtitle={`${index + 1} / ${order.length}`} />

      {/* Filter tabs */}
      <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg mb-3">
        {(["all", "vocab", "essay"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === f
                ? "bg-white text-ink shadow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            {f === "all" ? "All (25)" : f === "vocab" ? "Vocab (15)" : "Essays (10)"}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-neutral-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      <div className="flip-container flex-1 min-h-[420px] mb-4">
        <div
          className={`flip-inner w-full h-full cursor-pointer ${flipped ? "flipped" : ""}`}
          onClick={() => setFlipped((f) => !f)}
        >
          {/* Front */}
          <div className="flip-face flex-col bg-cardFront border-2 border-accent rounded-2xl p-6 flex items-center justify-center text-center min-h-[420px]">
            <div className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-3">
              {card.type === "vocab" ? "Term" : "Question"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink leading-tight px-2">
              {card.front}
            </h2>
            {card.frontSub && (
              <p className="text-sm italic text-muted mt-2">{card.frontSub}</p>
            )}
            <p className="text-[11px] text-muted mt-6 italic">Tap to flip</p>
          </div>

          {/* Back */}
          <div className="flip-face flip-back bg-cardBack border border-neutral-200 rounded-2xl p-5 flex flex-col min-h-[420px]">
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-3 text-center">
              {card.type === "vocab" ? "Definition" : "Answer"}
            </div>
            <div className="md-text text-[14px] sm:text-[15px] text-ink leading-relaxed overflow-y-auto subtle-scroll flex-1">
              {renderMarkdown(card.fullAnswer)}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex-1 py-3 rounded-xl border border-neutral-300 bg-white text-ink font-medium disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition"
        >
          ← Prev
        </button>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="flex-[1.5] py-3 rounded-xl bg-ink text-white font-medium active:scale-95 transition"
        >
          Flip
        </button>
        <button
          onClick={next}
          disabled={index === order.length - 1}
          className="flex-1 py-3 rounded-xl border border-neutral-300 bg-white text-ink font-medium disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition"
        >
          Next →
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={shuffleDeck}
          className="flex-1 py-2 rounded-lg text-xs text-muted border border-neutral-200 hover:bg-neutral-50 active:scale-95 transition"
        >
          🔀 Shuffle
        </button>
        <button
          onClick={reset}
          className="flex-1 py-2 rounded-lg text-xs text-muted border border-neutral-200 hover:bg-neutral-50 active:scale-95 transition"
        >
          ↺ Restart
        </button>
      </div>
    </main>
  );
}
