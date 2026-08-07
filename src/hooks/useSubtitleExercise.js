import { useMemo } from "react";

function seededShuffle(list, seedString) {
  let seed = 0;
  for (let i = 0; i < seedString.length; i++) {
    seed = (seed * 31 + seedString.charCodeAt(i)) >>> 0;
  }

  function rand() {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function useSubtitleExercise(subtitleText = "") {
  const { parts, answers } = useMemo(() => {
    const regex = /\{([^}]+)\}/g;
    const parsedParts = [];
    const parsedAnswers = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(subtitleText)) !== null) {
      if (match.index > lastIndex) {
        parsedParts.push({
          type: "text",
          value: subtitleText.slice(lastIndex, match.index),
        });
      }

      const expected = match[1].trim();
      const answerIndex = parsedAnswers.length;
      parsedAnswers.push(expected);
      parsedParts.push({ type: "input", answerIndex });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < subtitleText.length) {
      parsedParts.push({
        type: "text",
        value: subtitleText.slice(lastIndex),
      });
    }

    return { parts: parsedParts, answers: parsedAnswers };
  }, [subtitleText]);

  const uniqueAnswers = useMemo(() => [...new Set(answers)], [answers]);

  const shuffledAnswers = useMemo(() => {
    const normalized = uniqueAnswers.map((w) => w.toLowerCase());
    return seededShuffle(normalized, subtitleText || "seed");
  }, [uniqueAnswers, subtitleText]);

  return { parts, answers, shuffledAnswers };
}
