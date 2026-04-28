"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { cards as allCards } from "@/lib/cards";
import { PageHeader } from "@/components/PageHeader";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Use vocab cards (shorter, easier to scan)
const matchPool = allCards.filter((c) => c.type === "vocab");
const PAIRS_PER_ROUND = 6;

type Tile = {
  key: string;
  cardId: string;
  text: string;
  side: "term" | "def";
};

type Status = "idle" | "playing" | "won";

export default function MatchPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load best time from localStorage
  useEffect(() => {
    const stored = typeof window !== "undefined"
      ? localStorage.getItem("metaphysics-match-best")
      : null;
    if (stored) setBestTime(parseFloat(stored));
  }, []);

  function startGame() {
    const chosen = shuffle(matchPool).slice(0, PAIRS_PER_ROUND);
    const newTiles: Tile[] = [];
    for (const c of chosen) {
      newTiles.push({ key: `${c.id}-t`, cardId: c.id, text: c.front, side: "term" });
      newTiles.push({ key: `${c.id}-d`, cardId: c.id, text: c.shortAnswer, side: "def" });
    }
    setTiles(shuffle(newTiles));
    setMatched(new Set());
    setSelectedKey(null);
    setWrongPair(null);
    setErrors(0);
    setElapsed(0);
    setStatus("playing");
    startTimeRef.current = Date.now();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        setElapsed((Date.now() - startTimeRef.current) / 1000);
      }
    }, 100);
  }

  function tap(tile: Tile) {
    if (status !== "playing") return;
    if (matched.has(tile.cardId)) return;
    if (wrongPair) return;
    if (!selectedKey) {
      setSelectedKey(tile.key);
      return;
    }
    if (selectedKey === tile.key) {
      setSelectedKey(null);
      return;
    }
    const prev = tiles.find((t) => t.key === selectedKey);
    if (!prev) return;
    if (prev.cardId === tile.cardId && prev.side !== tile.side) {
      // Correct match
      const newMatched = new Set(matched);
      newMatched.add(tile.cardId);
      setMatched(newMatched);
      setSelectedKey(null);
      if (newMatched.size === PAIRS_PER_ROUND) {
        // Game won
        if (intervalRef.current) clearInterval(intervalRef.current);
        const finalTime = startTimeRef.current
          ? (Date.now() - startTimeRef.current) / 1000
          : 0;
        setElapsed(finalTime);
        setStatus("won");
        // Save best time (only if no errors? we count anyway for personal best)
        if (bestTime === null || finalTime < bestTime) {
          setBestTime(finalTime);
          if (typeof window !== "undefined") {
            localStorage.setItem("metaphysics-match-best", String(finalTime));
          }
        }
      }
    } else {
      // Wrong: flash both red briefly
      setWrongPair([prev.key, tile.key]);
      setErrors((e) => e + 1);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedKey(null);
      }, 600);
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (status === "idle") {
    return (
      <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto">
        <PageHeader title="Match" />
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">⚡</div>
          <h2 className="text-xl font-bold text-ink mb-2">Match mode</h2>
          <p className="text-sm text-muted mb-1 leading-relaxed">
            Pair {PAIRS_PER_ROUND} terms with their definitions as fast as you can.
          </p>
          <p className="text-xs text-muted mb-5">
            Tap a term, then its matching definition. Wrong pairs flash red.
          </p>
          {bestTime !== null && (
            <p className="text-xs text-accent font-semibold mb-4">
              🏆 Best time: {bestTime.toFixed(2)}s
            </p>
          )}
          <button
            onClick={startGame}
            className="px-6 py-3 rounded-xl bg-ink text-white font-medium active:scale-95 transition"
          >
            Start
          </button>
        </div>
      </main>
    );
  }

  if (status === "won") {
    const isPersonalBest = bestTime !== null && elapsed <= bestTime + 0.05;
    return (
      <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto">
        <PageHeader title="Match" />
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-3">{isPersonalBest && errors === 0 ? "🏆" : "🎉"}</div>
          <h2 className="text-xl font-bold text-ink mb-2">
            {elapsed.toFixed(2)}s
          </h2>
          <p className="text-sm text-muted mb-1">
            {errors === 0 ? "Perfect run!" : `${errors} wrong ${errors === 1 ? "tap" : "taps"}`}
          </p>
          {isPersonalBest && (
            <p className="text-xs text-accent font-semibold mb-4">New personal best!</p>
          )}
          {!isPersonalBest && bestTime !== null && (
            <p className="text-xs text-muted mb-4">Best: {bestTime.toFixed(2)}s</p>
          )}
          <div className="flex gap-2 justify-center">
            <button
              onClick={startGame}
              className="px-5 py-2.5 rounded-xl bg-ink text-white font-medium active:scale-95 transition"
            >
              Play again
            </button>
            <button
              onClick={() => setStatus("idle")}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 bg-white text-ink font-medium active:scale-95 transition"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-6 max-w-2xl mx-auto">
      <PageHeader
        title="Match"
        subtitle={`${matched.size} / ${PAIRS_PER_ROUND} · ${elapsed.toFixed(1)}s`}
      />

      {/* Progress */}
      <div className="h-1 bg-neutral-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${(matched.size / PAIRS_PER_ROUND) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {tiles.map((tile) => {
          const isMatched = matched.has(tile.cardId);
          const isSelected = selectedKey === tile.key;
          const isWrong = wrongPair && (wrongPair[0] === tile.key || wrongPair[1] === tile.key);

          let className =
            "min-h-[110px] sm:min-h-[130px] p-3 rounded-xl border-2 text-left text-xs sm:text-[13px] leading-snug transition-all flex items-center ";

          if (isMatched) {
            className += "border-emerald-300 bg-emerald-50 text-muted opacity-50 cursor-default";
          } else if (isWrong) {
            className += "border-rose-400 bg-rose-50 text-ink shake";
          } else if (isSelected) {
            className += "border-accent bg-accentSoft text-ink ring-2 ring-accent ring-opacity-30 scale-[1.02]";
          } else {
            className += "border-neutral-200 bg-white text-ink hover:border-accent hover:bg-cardFront active:scale-[0.98]";
          }

          if (tile.side === "term") {
            className += " font-semibold";
          }

          return (
            <button
              key={tile.key}
              onClick={() => tap(tile)}
              disabled={isMatched}
              className={className}
            >
              <span className="line-clamp-5">{tile.text}</span>
            </button>
          );
        })}
      </div>

      {errors > 0 && (
        <p className="text-center text-xs text-muted mt-4">
          {errors} wrong {errors === 1 ? "tap" : "taps"}
        </p>
      )}
    </main>
  );
}
