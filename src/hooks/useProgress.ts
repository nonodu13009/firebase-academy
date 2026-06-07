"use client";

import { useState, useEffect, useCallback } from "react";

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
    // Migration from old flat format
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

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const getStatus = useCallback(
    (slug: string): LevelStatus => {
      return progress.levels[slug] || "not-started";
    },
    [progress]
  );

  const markInProgress = useCallback(
    (slug: string) => {
      if (progress.levels[slug] === "completed") return;
      const updated: ProgressData = {
        ...progress,
        levels: { ...progress.levels, [slug]: "in-progress" },
        lastVisited: `/formation/${slug}`,
      };
      setProgress(updated);
      saveProgress(updated);
    },
    [progress]
  );

  const markCompleted = useCallback(
    (slug: string) => {
      const updated: ProgressData = {
        ...progress,
        levels: { ...progress.levels, [slug]: "completed" },
      };
      setProgress(updated);
      saveProgress(updated);
    },
    [progress]
  );

  const completedCount = Object.values(progress.levels).filter(
    (v) => v === "completed"
  ).length;

  const lastVisited = progress.lastVisited || null;

  return { getStatus, markInProgress, markCompleted, completedCount, lastVisited };
}
