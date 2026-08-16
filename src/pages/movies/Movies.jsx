import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovie } from "../../hooks/useMovies";
import { useSubtitleExercise } from "../../hooks/useSubtitleExercise";
import MobileKeyboard from "../../components/MobileKeyboard";
import "./Movies.css";

const Movies = () => {
  const touchStartX = useRef(0);
  const { slug } = useParams();

  const [activeContent, setActiveContent] = useState("subtitle");
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [draftByIndex, setDraftByIndex] = useState({});

  const { movie, loading } = useMovie(slug);
  const { parts, answers, shuffledAnswers } = useSubtitleExercise(
    movie?.moviesSubtitle || "",
  );

  const values = answers.map((_, idx) => draftByIndex[idx] || "");

  function handleChange(index, value) {
    setDraftByIndex((prev) => ({ ...prev, [index]: value }));
  }

  function isCorrect(index) {
    return (
      values[index]?.trim().toLowerCase() === answers[index]?.toLowerCase()
    );
  }

  function focusNext() {
    setActiveInputIndex((prev) => {
      const current = prev ?? 0;
      return current < values.length - 1 ? current + 1 : current;
    });
  }

  function handleTouchStart(e) {
    touchStartX.current = e.changedTouches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (window.innerWidth > 768) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    const threshold = 50;

    const order = ["synopsis", "subtitle", "words"];
    const currentIndex = order.indexOf(activeContent);

    if (deltaX < -threshold) {
      setActiveContent(order[(currentIndex + 1) % order.length]);
    } else if (deltaX > threshold) {
      setActiveContent(order[(currentIndex - 1 + order.length) % order.length]);
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (!movie) return <p>Filme não encontrado.</p>;

  return (
    <div>
      <div className="background-blur"></div>
      <div className="grid-container-movies">
        <div className="section-movies">
          <iframe
            title={movie.title}
            style={{ border: "none" }}
            src={movie.youtubeEmbed}
          />
          <div className="buttons-movies">
            <button onClick={() => setActiveContent("synopsis")}>
              Synopsis
            </button>

            <button onClick={() => setActiveContent("subtitle")}>
              Subtitles
            </button>

            <button onClick={() => setActiveContent("words")}>Words</button>
          </div>
        </div>

        <div
          className="main-movies"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {activeContent === "subtitle" && (
            <div className="lyrics-box">
              <p>
                {parts.map((part, i) => {
                  if (part.type === "text")
                    return <span key={i}>{part.value}</span>;

                  const idx = part.answerIndex;
                  return (
                    <input
                      key={i}
                      type="text"
                      value={values[idx] || ""}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onFocus={() => setActiveInputIndex(idx)}
                      onClick={() => setActiveInputIndex(idx)}
                      readOnly={window.innerWidth <= 768}
                      aria-label={`lacuna ${idx + 1}`}
                      className={`input-subtitle ${
                        (values[idx] || "").trim() === ""
                          ? ""
                          : isCorrect(idx)
                            ? "input-correct"
                            : "input-wrong"
                      }`}
                    />
                  );
                })}
              </p>
            </div>
          )}

          {activeContent === "synopsis" && (
            <div className="synopsis-box">{movie.synopsis}</div>
          )}

          {activeContent === "words" && (
            <div className="word-bank">
              {shuffledAnswers.map((word, i) => {
                const isUsed = values.some(
                  (value, index) =>
                    value.trim().toLowerCase() ===
                      answers[index]?.trim().toLowerCase() &&
                    word.trim().toLowerCase() ===
                      answers[index]?.trim().toLowerCase(),
                );

                return (
                  <span
                    key={`${word}-${i}`}
                    className={`word-chip ${isUsed ? "word-used" : ""}`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className="keyboard-movies">
          <MobileKeyboard
            value={
              activeInputIndex !== null ? values[activeInputIndex] || "" : ""
            }
            inputName={`blank-${activeInputIndex ?? 0}`}
            onChange={(val) => {
              const idx = activeInputIndex ?? 0;
              setActiveInputIndex(idx);
              handleChange(idx, val);
            }}
            onKeyPress={(btn) => {
              if (btn === "{enter}") focusNext();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
