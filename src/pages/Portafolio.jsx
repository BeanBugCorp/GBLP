import { useState, useEffect, useCallback } from "react";
import Layout from "../Layout";
import { PORTAFOLIO_SEASONS } from "../content";
import "../styles/Portafolio.css";

export default function Portafolio() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const season = PORTAFOLIO_SEASONS[active];
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox]);

  return (
    <Layout>
      <div className="pg-page">

        <header className="pg-header">
          <h1 className="pg-title">
            Mi <span style={{ color: season.accent }}>portafolio</span>
          </h1>
          <p className="pg-subtitle">
            Colecciones por temporada — escoge una para explorar.
          </p>
        </header>

        <div className="pg-slider-wrap">
          <div className="pg-slider">
            <div
              className="pg-pill"
              style={{
                width: `calc((100% - 12px) / ${PORTAFOLIO_SEASONS.length})`,
                transform: `translateX(${active * 100}%)`,
                background: season.accent,
              }}
            />
            {PORTAFOLIO_SEASONS.map((s, i) => (
              <button
                key={s.id}
                className="pg-seg"
                onClick={() => setActive(i)}
                aria-label={s.name}
                style={{ color: i === active ? "#fff" : "#9a8b78" }}
              >
                <span
                  className="pg-emoji"
                  style={{ transform: i === active ? "scale(1.18)" : "scale(1)" }}
                >
                  {s.emoji}
                </span>
              </button>
            ))}
          </div>
          <p key={season.id} className="pg-season-name" style={{ color: season.accent }}>
            {season.name}
          </p>
        </div>

        {/* key forces remount so the entrance animation replays on season change */}
        <div key={season.id} className="pg-grid" style={{ "--season-accent": season.accent }}>
          {season.photos.map((src, i) => {
            const tilt = i % 3 === 0 ? -1.4 : i % 3 === 1 ? 1.2 : -0.5;
            return (
              <figure
                key={i}
                className="pg-item"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <button
                  className="pg-card"
                  onClick={() => setLightbox(src)}
                  style={{ "--tilt": `${tilt}deg` }}
                >
                  <img src={src} alt={`${season.name} ${i + 1}`} loading="lazy" />
                </button>
              </figure>
            );
          })}
        </div>

      </div>

      {lightbox && (
        <div className="pg-backdrop" onClick={closeLightbox} style={{ "--season-accent": season.accent }}>
          <button className="pg-close" onClick={closeLightbox} aria-label="Cerrar">✕</button>
          <img
            className="pg-full"
            src={lightbox}
            alt="Vista ampliada"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
}
