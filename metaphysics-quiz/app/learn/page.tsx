"use client";

import { useState, useEffect, useMemo } from "react";
import { cards as allCards, type Card } from "@/lib/cards";
import { renderMarkdown } from "@/lib/markdown";
import { PageHeader } from "@/components/PageHeader";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Question = {
  card: Card;
  options: string[]; // shortAnswer texts
  correctIndex: number;
};

function buildQuestion(target: Card, pool: Card[]): Question {
  // Pick 3 distractors (different ids, different short answers)
  const distractors = shuffle(
    pool.filter((c) => c.id !== target.id && c.shortAnswer !== target.shortAnswer)
  ).slice(0, 3);
  const options = shuffle([target.shortAnswer, ...distractors.map((d) => d.shortAnswer)]);
  return {
    card: target,
    options,
    correctIndex: options.indexOf(target.shortAnswer),
  };
}

export default function LearnPage() {
  const [queue, setQueue] = useState<Card[]>([]);
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });
  const [started, setStarted] = useState(false);

  const totalCards = useMemo(() => allCards.length, []);

  function start() {
    const initialQueue = shuffle(allCards);
    setQueue(initialQueue);
    setMastered(new Set());
    setStats({ correct: 0, attempted: 0 });
    setSelected(null);
    setShowAnswer(false);
    setStarted(true);
    setCurrent(buildQuestion(initialQueue[0], allCards));
  }

  function answer(idx: number) {
    if (showAnswer || !current) return;
    setSelected(idx);
    setShowAnswer(true);
    const correct = idx === current.correctIndex;
    setStats((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      attempted: s.attempted + 1,
    }));
    if (correct) {
      setMastered((m) => new Set(m).add(current.card.id));
    }
  }

  function nextCard() {
    if (!current) return;
    const wasCorrect = selected === current.correctIndex;
    let newQueue = queue.slice(1);
    // If wrong, push card back into queue 3-5 positions later
    if (!wasCorrect) {
      const insertAt = Math.min(newQueue.length, 3 + Math.floor(Math.random() * 3));
      newQueue = [...newQueue.slice(0, insertAt), current.card, ...newQueue.slice(insertAt)];
    }
    setQueue(newQueue);
    setSelected(null);
    setShowAnswer(false);
    if (newQueue.length === 0) {
      setCurrent(null);
    } else {
      setCurrent(buildQuestion(newQueue[0], allCards));
    }
  }

  // Keyboard: 1-4 to answer, Enter to continue
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!current) return;
      if (!showAnswer && /^[1-4]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < current.options.length) answer(idx);
      } else if (showAnswer && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        nextCard();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, showAnswer, selected]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!started) {
    return (
      <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto">
        <PageHeader title="Learn" />
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">📚</div>
          <h2 className="text-xl font-bold text-ink mb-2">Learn mode</h2>
          <p className="text-sm text-muted mb-5 leading-relaxed">
            Multiple-choice for all 25 cards. Cards you miss get cycled back into
            the queue until you've mastered them all.
          </p>
          <button
            onClick={start}
            className="px-6 py-3 rounded-xl bg-ink text-white font-medium active:scale-95 transition"
          >
            Start studying
          </button>
        </div>
      </main>
    );
  }

  if (!current) {
    return (
      <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto">
        <PageHeader title="Learn" />
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-xl font-bold text-ink mb-2">All cards mastered!</h2>
          <p className="text-sm text-muted mb-1">
            Final accuracy:{" "}
            <strong className="text-ink">
              {Math.round((stats.correct / stats.attempted) * 100)}%
            </strong>
          </p>
          <p className="text-xs text-muted mb-5">
            {stats.correct} / {stats.attempted} answers correct across the session
          </p>
          <button
            onClick={start}
            className="px-6 py-3 rounded-xl bg-ink text-white font-medium active:scale-95 transition"
          >
            Restart
          </button>
        </div>
      </main>
    );
  }

  const progress = (mastered.size / totalCards) * 100;
  const isCorrect = selected === current.correctIndex;

  return (
    <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto flex flex-col">
      <PageHeader
        title="Learn"
        subtitle={`${mastered.size} / ${totalCards} mastered`}
      />

      {/* Progress */}
      <div className="h-1 bg-neutral-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-cardFront border-2 border-accent rounded-2xl p-5 mb-4">
        <div className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-2">
          {current.card.type === "vocab" ? "What is..." : "Question"}
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-ink leading-snug">
          {current.card.front}
        </h2>
        {current.card.frontSub && (
          <p className="text-sm italic text-muted mt-1">{current.card.frontSub}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2 flex-1">
        {current.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrectOption = i === current.correctIndex;
          let className = "w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all text-sm leading-snug ";

          if (showAnswer) {
            if (isCorrectOption) {
              className += "border-emerald-500 bg-emerald-50 text-ink pulse-correct";
            } else if (isSelected) {
              className += "border-rose-400 bg-rose-50 text-ink shake";
            } else {
              className += "border-neutral-200 bg-white text-muted opacity-60";
            }
          } else {
            className += "border-neutral-200 bg-white hover:border-accent hover:bg-accentSoft active:scale-[0.99] text-ink";
          }

          return (
            <button
              key={i}
              onClick={() => answer(i)}
              disabled={showAnswer}
              className={className}
            >
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-neutral-100 text-xs font-bold text-muted flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="flex-1">{opt}</span>
                {showAnswer && isCorrectOption && (
                  <span className="text-emerald-600 text-lg">✓</span>
                )}
                {showAnswer && isSelected && !isCorrectOption && (
                  <span className="text-rose-500 text-lg">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Reveal & continue */}
      {showAnswer && (
        <div className="mt-4 space-y-3">
          {!isCorrect && (
            <div className="bg-cardBack border border-neutral-200 rounded-xl p-4">
              <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-2">
                Full answer
              </div>
              <div className="md-text text-sm text-ink leading-relaxed max-h-48 overflow-y-auto subtle-scroll">
                {renderMarkdown(current.card.fullAnswer)}
              </div>
            </div>
          )}
          <button
            onClick={nextCard}
            className="w-full py-3 rounded-xl bg-ink text-white font-medium active:scale-95 transition"
          >
            {isCorrect ? "Next →" : "Got it, continue →"}
          </button>
        </div>
      )}

      {/* Live score */}
      <div className="text-center text-xs text-muted mt-4">
        Session: {stats.correct} / {stats.attempted}
        {stats.attempted > 0 && (
          <> · {Math.round((stats.correct / stats.attempted) * 100)}%</>
        )}
      </div>
    </main>
  );
}
