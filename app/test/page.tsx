"use client";

import { useState, useMemo } from "react";
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

const QUESTION_COUNT = 10;

type Question = {
  card: Card;
  options: string[];
  correctIndex: number;
};

function buildQuiz(): Question[] {
  const chosen = shuffle(allCards).slice(0, QUESTION_COUNT);
  return chosen.map((target) => {
    const distractors = shuffle(
      allCards.filter((c) => c.id !== target.id && c.shortAnswer !== target.shortAnswer)
    ).slice(0, 3);
    const options = shuffle([
      target.shortAnswer,
      ...distractors.map((d) => d.shortAnswer),
    ]);
    return {
      card: target,
      options,
      correctIndex: options.indexOf(target.shortAnswer),
    };
  });
}

type Status = "idle" | "playing" | "done";

export default function TestPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);

  function start() {
    const q = buildQuiz();
    setQuestions(q);
    setAnswers(Array(q.length).fill(null));
    setIndex(0);
    setStatus("playing");
    setReviewIndex(null);
  }

  function selectAnswer(idx: number) {
    if (status !== "playing") return;
    const newAnswers = [...answers];
    newAnswers[index] = idx;
    setAnswers(newAnswers);
  }

  function nextQuestion() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setStatus("done");
    }
  }

  function prevQuestion() {
    if (index > 0) setIndex(index - 1);
  }

  const score = useMemo(() => {
    return answers.reduce<number>(
      (sum, a, i) => sum + (a === questions[i]?.correctIndex ? 1 : 0),
      0
    );
  }, [answers, questions]);

  if (status === "idle") {
    return (
      <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto">
        <PageHeader title="Test" />
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">📝</div>
          <h2 className="text-xl font-bold text-ink mb-2">Practice test</h2>
          <p className="text-sm text-muted mb-5 leading-relaxed">
            {QUESTION_COUNT} multiple-choice questions drawn from all 25 cards.
            Answer all, get a score, review what you missed.
          </p>
          <button
            onClick={start}
            className="px-6 py-3 rounded-xl bg-ink text-white font-medium active:scale-95 transition"
          >
            Start test
          </button>
        </div>
      </main>
    );
  }

  if (status === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const grade =
      pct >= 90 ? { letter: "A", emoji: "🎯", color: "emerald" } :
      pct >= 80 ? { letter: "B", emoji: "✨", color: "emerald" } :
      pct >= 70 ? { letter: "C", emoji: "👍", color: "amber" } :
      pct >= 60 ? { letter: "D", emoji: "📖", color: "amber" } :
                  { letter: "F", emoji: "🔁", color: "rose" };

    if (reviewIndex !== null) {
      const q = questions[reviewIndex];
      const userAnswer = answers[reviewIndex];
      const correct = userAnswer === q.correctIndex;
      return (
        <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto">
          <PageHeader
            title="Review"
            subtitle={`Question ${reviewIndex + 1} / ${questions.length}`}
          />
          <div className="bg-cardFront border-2 border-accent rounded-2xl p-5 mb-4">
            <div className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-2">
              {q.card.type === "vocab" ? "What is..." : "Question"}
            </div>
            <h2 className="text-lg font-bold text-ink leading-snug">{q.card.front}</h2>
            {q.card.frontSub && (
              <p className="text-sm italic text-muted mt-1">{q.card.frontSub}</p>
            )}
          </div>

          <div className="space-y-2 mb-4">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex;
              const isUser = i === userAnswer;
              let cn = "p-3 rounded-xl border-2 text-sm leading-snug ";
              if (isCorrect) cn += "border-emerald-500 bg-emerald-50";
              else if (isUser) cn += "border-rose-400 bg-rose-50";
              else cn += "border-neutral-200 bg-white opacity-60";
              return (
                <div key={i} className={cn}>
                  <div className="flex items-start gap-2">
                    <span className="flex-1">{opt}</span>
                    {isCorrect && <span className="text-emerald-600">✓</span>}
                    {isUser && !isCorrect && <span className="text-rose-500">✗</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-cardBack border border-neutral-200 rounded-xl p-4 mb-4">
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-2">
              Full answer
            </div>
            <div className="md-text text-sm text-ink leading-relaxed">
              {renderMarkdown(q.card.fullAnswer)}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setReviewIndex(reviewIndex - 1)}
              disabled={reviewIndex === 0}
              className="flex-1 py-2.5 rounded-xl border border-neutral-300 bg-white text-ink text-sm font-medium disabled:opacity-40 active:scale-95 transition"
            >
              ← Prev
            </button>
            <button
              onClick={() => setReviewIndex(null)}
              className="flex-1 py-2.5 rounded-xl bg-ink text-white text-sm font-medium active:scale-95 transition"
            >
              Back to summary
            </button>
            <button
              onClick={() => setReviewIndex(reviewIndex + 1)}
              disabled={reviewIndex === questions.length - 1}
              className="flex-1 py-2.5 rounded-xl border border-neutral-300 bg-white text-ink text-sm font-medium disabled:opacity-40 active:scale-95 transition"
            >
              Next →
            </button>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto">
        <PageHeader title="Test" subtitle="Results" />
        <div className={`bg-white border-2 border-${grade.color}-200 rounded-2xl p-6 text-center mb-4`}>
          <div className="text-5xl mb-3">{grade.emoji}</div>
          <h2 className="text-3xl font-bold text-ink mb-1">
            {score} / {questions.length}
          </h2>
          <p className="text-sm text-muted">
            {pct}% · Grade {grade.letter}
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold text-ink mb-3">Question breakdown</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, i) => {
              const correct = answers[i] === q.correctIndex;
              return (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  className={`aspect-square rounded-lg border-2 text-sm font-bold transition active:scale-95 ${
                    correct
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-muted mt-3 text-center">
            Tap a number to review that question
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={start}
            className="flex-1 py-3 rounded-xl bg-ink text-white font-medium active:scale-95 transition"
          >
            New test
          </button>
        </div>
      </main>
    );
  }

  // Playing
  const q = questions[index];
  const selected = answers[index];
  const allAnswered = answers.every((a) => a !== null);

  return (
    <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto flex flex-col">
      <PageHeader
        title="Test"
        subtitle={`Question ${index + 1} / ${questions.length}`}
      />

      {/* Progress */}
      <div className="h-1 bg-neutral-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-cardFront border-2 border-accent rounded-2xl p-5 mb-4">
        <div className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-2">
          {q.card.type === "vocab" ? "What is..." : "Question"}
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-ink leading-snug">
          {q.card.front}
        </h2>
        {q.card.frontSub && (
          <p className="text-sm italic text-muted mt-1">{q.card.frontSub}</p>
        )}
      </div>

      <div className="space-y-2 flex-1">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          let cn = "w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all text-sm leading-snug ";
          if (isSelected) {
            cn += "border-accent bg-accentSoft text-ink ring-2 ring-accent ring-opacity-30";
          } else {
            cn += "border-neutral-200 bg-white hover:border-accent hover:bg-cardFront active:scale-[0.99] text-ink";
          }
          return (
            <button key={i} onClick={() => selectAnswer(i)} className={cn}>
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-neutral-100 text-xs font-bold text-muted flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="flex-1">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={prevQuestion}
          disabled={index === 0}
          className="flex-1 py-3 rounded-xl border border-neutral-300 bg-white text-ink font-medium disabled:opacity-40 active:scale-95 transition"
        >
          ← Prev
        </button>
        <button
          onClick={nextQuestion}
          disabled={selected === null}
          className="flex-[1.5] py-3 rounded-xl bg-ink text-white font-medium disabled:opacity-40 active:scale-95 transition"
        >
          {index === questions.length - 1
            ? allAnswered
              ? "Submit test"
              : "Submit (incomplete)"
            : "Next →"}
        </button>
      </div>

      {/* Answer dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {answers.map((a, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index
                ? "bg-accent w-6"
                : a !== null
                ? "bg-emerald-400"
                : "bg-neutral-300"
            }`}
            aria-label={`Question ${i + 1}`}
          />
        ))}
      </div>
    </main>
  );
}
