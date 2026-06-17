import { useState, useEffect, useCallback } from "react";
import LazyImage from "../components/LazyImage";
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
      <main className="pg-page">

        <header className="pg-header">
          <h1 className={`pg-title ${season.id}`}>
            <span>Mi portafolio</span>
          </h1>
          <p className="pg-subtitle">
            Colecciones por temporada — escoge una para explorar.
          </p>
        </header>

        <div className="pg-slider-wrap">
          <div className="pg-slider">
            <div className={`pg-pill ${season.id} active-${active}`}/>
            {PORTAFOLIO_SEASONS.map((s, i) => (
              <button
                key={s.id}
                className="pg-seg"
                onClick={() => setActive(i)}
                aria-label={s.name}
              >
                <span className={`pg-emoji ${i === active ? 'active' : ''}`}>
                  {s.emoji}
                </span>
              </button>
            ))}
          </div>
          <p key={season.id} className={`pg-season-name ${season.id}`}>
            {season.name}
          </p>
        </div>

        {/* key forces remount so the entrance animation replays on season change */}
        <div key={season.id} className={`pg-grid ${season.id}`}>
          {season.photos.map((src, i) => {
            const tilt = i % 3 === 0 ? -1.4 : i % 3 === 1 ? 1.2 : -0.5;
            return (
              <figure
                key={i}
                className={`pg-item anim-${i}`}
              >
                <button
                  className="pg-card"
                  onClick={() => setLightbox(src)}
                >
                  <LazyImage src = {src} alt = {`${season.name} ${i+1}`} />
                </button>
              </figure>
            );
          })}
        </div>

      </main>

      {lightbox && (
        <div className={`pg-backdrop ${season.id}`} onClick={closeLightbox}>
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
