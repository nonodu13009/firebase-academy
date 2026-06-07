"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type LevelStatus = "not-started" | "in-progress" | "completed";

interface ProgressData {
  levels: Record<string, LevelStatus>;
  lastVisited?: string;
}

const STORAGE_KEY = "firebase-academy-progress";

function loadProgress(): ProgressData {
  if (typeof window === "undefined") return { levels: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { levels: {} };
    const parsed = JSON.parse(raw);
    if (!parsed.levels) return { levels: {}, ...parsed };
    return parsed;
  } catch {
    return { levels: {} };
  }
}

function saveProgress(data: ProgressData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({ levels: {} });
  const progressRef = useRef(progress);

  // Keep ref in sync
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Load from localStorage once
  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    progressRef.current = loaded;
  }, []);

  const getStatus = useCallback(
    (slug: string): LevelStatus => {
      return progress.levels[slug] || "not-started";
    },
    [progress]
  );

  const markInProgress = useCallback((slug: string) => {
    const current = progressRef.current;
    if (current.levels[slug] === "completed" || current.levels[slug] === "in-progress") return;
    const updated: ProgressData = {
      ...current,
      levels: { ...current.levels, [slug]: "in-progress" },
      lastVisited: `/formation/${slug}`,
    };
    progressRef.current = updated;
    setProgress(updated);
    saveProgress(updated);
  }, []);

  const markCompleted = useCallback((slug: string) => {
    const current = progressRef.current;
    const updated: ProgressData = {
      ...current,
      levels: { ...current.levels, [slug]: "completed" },
    };
    progressRef.current = updated;
    setProgress(updated);
    saveProgress(updated);
  }, []);

  const completedCount = Object.values(progress.levels).filter(
    (v) => v === "completed"
  ).length;

  const lastVisited = progress.lastVisited || null;

  return { getStatus, markInProgress, markCompleted, completedCount, lastVisited };
}
