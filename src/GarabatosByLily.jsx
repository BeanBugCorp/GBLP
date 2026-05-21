import { useState, useEffect } from "react";
import Layout from "./Layout";
import { CONTENT } from "./content";
import "./styles/GarabatosByLily.css"

/* ============================================================================
   GARABATOS BY LILY — Landing Page
   ----------------------------------------------------------------------------
   HOW TO UPDATE THIS PAGE (read me!):
   Almost everything you'll ever want to change lives in the CONTENT object
   right below. You do NOT need to touch the code further down.

   • To change a photo:        replace its URL string.
   • To add a service photo:   add another URL to that service's `images` array
                                — the card automatically cycles through them.
   • To add a gallery photo:   add an object to CONTENT.gallery — any image
                                size works, the masonry layout handles it.
   • To change a link:         edit the `url` field.

   ⚠️ IMPORTANT — IMAGES: the photo links below currently point to Figma's
   temporary servers and STOP WORKING after ~7 days. Before you launch the
   real site, upload the photos to your hosting (or a service like Cloudinary /
   imgix) and paste those permanent URLs here.
   ========================================================================== */



/* ===========================================================================
   HERO
   =========================================================================== */
function Hero() {
  return (
    <header className="hero" id="top">
      <h1 className="sr-only">
        Garabatos by Lily — murales, window painting y activaciones por Lilian Camarena
      </h1>
      <div className="wrap">
        <div className="reveal">
          <img className="hero-banner" src={CONTENT.hero.banner} alt="Garabatos by Lily" />
        </div>
      </div>
    </header>
  );
}

/* ===========================================================================
   BIO + CAROUSEL
   =========================================================================== */
function Carousel({ photos }) {
  const [i, setI] = useState(0);
  const n = photos.length;

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 4200);
    return () => clearInterval(t);
  }, [n]);

  return (
    <div className="carousel">
      {photos.map((src, idx) => (
        <div key={idx} className={`carousel-slide${idx === i ? " active" : ""}`}>
          <img src={src} alt={`Lily ${idx + 1}`} loading="lazy" />
        </div>
      ))}
      <button className="carousel-btn prev" aria-label="Anterior"
        onClick={() => setI((p) => (p - 1 + n) % n)}>‹</button>
      <button className="carousel-btn next" aria-label="Siguiente"
        onClick={() => setI((p) => (p + 1) % n)}>›</button>
      <div className="carousel-dots">
        {photos.map((_, idx) => (
          <button key={idx} className={idx === i ? "on" : ""} aria-label={`Foto ${idx + 1}`}
            onClick={() => setI(idx)} />
        ))}
      </div>
    </div>
  );
}

function Bio() {
  return (
    <section className="bio">
      <div className="wrap bio-grid">
        <div className="reveal" style={{ "--d": 0 }}>
          <Carousel photos={CONTENT.bio.photos} />
        </div>
        <div className="bio-text reveal" style={{ "--d": 1 }}>
          <p className="hola">¡Hola!</p>
          <p>Soy Lily, creadora de Garabatos by Lily.</p>
          <p>
            <span className="garab">Garabateo </span> ventanas, paredes,
            acuarelas y más.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   SERVICIOS
   =========================================================================== */
function ServiceCard({ service, index }) {
  const [i, setI] = useState(0);
  const n = service.images.length;

  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(
      () => setI((p) => (p + 1) % n),
      3400 + index * 500 
    );
    return () => clearInterval(t);
  }, [n, index]);

  return (
    <article className="serv-card reveal" style={{ "--d": index }}>
      <div className="serv-imgwrap">
        {service.images.map((src, idx) => (
          <img key={idx} className={idx === i ? "on" : ""} src={src}
            alt={service.name} loading="lazy" />
        ))}
        {n > 1 && (
          <div className="serv-pips">
            {service.images.map((_, idx) => (
              <span key={idx} className={idx === i ? "on" : ""} />
            ))}
          </div>
        )}
      </div>
      <div className="serv-label">
        <h3>{service.name}</h3>
        <p>{service.desc}</p>
      </div>
    </article>
  );
}

function Servicios() {
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <div className="section-head reveal">
          <h2 className="script-h" style={{ color: "var(--azul)" }}>Servicios</h2>
        </div>
        <div className="serv-grid">
          {CONTENT.servicios.map((s, idx) => (
            <ServiceCard key={s.name} service={s} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   CONOCE MI TRABAJO (gallery)
   =========================================================================== */
function Trabajo() {
  return (
    <section className="section" id="trabajo">
      <div className="wrap">
        <div className="section-head reveal">
          <h2 className="script-h" style={{ color: "var(--rosa-fuerte)" }}>
            Conoce mi trabajo
          </h2>
        </div>
        <div className="gallery">
          {CONTENT.gallery.map((item, idx) => (
            <figure
              key={idx}
              className="gallery-fig reveal"
              style={{ "--d": idx % 3 }}
            >
              <img src={item.src} alt={item.title} loading="lazy" />
              <figcaption className="gallery-cap">
                <span>{item.subtitle}</span>
                <h3>{item.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   COLABORACIONES (infinite marquee)
   =========================================================================== */
function Colaboraciones() {
  // duplicated list -> seamless -50% loop
  const logos = [...CONTENT.colaboraciones, ...CONTENT.colaboraciones];
  return (
    <section className="section" id="colaboraciones">
      <div className="wrap">
        <div className="section-head reveal">
          <h2 className="script-h" style={{ color: "var(--azul)" }}>
            Colaboraciones
          </h2>
        </div>
      </div>
      <div className="marquee reveal">
        <div className="marquee-track">
          {logos.map((src, idx) => (
            <img key={idx} src={src} alt="Marca colaboradora" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   NOTAS IMPORTANTES (linked press cards)
   =========================================================================== */
function Notas() {
  return (
    <section className="section" id="notas">
      <div className="wrap">
        <div className="section-head reveal">
          <h2 className="script-h" style={{ color: "var(--amarillo-fuerte)" }}>
            Notas Importantes
          </h2>
        </div>
        <div className="notas-grid">
          {CONTENT.notas.map((nota, idx) => (
            <a
              key={idx}
              className="nota-card reveal"
              style={{ "--d": idx }}
              href={nota.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="nota-imgwrap">
                <img src={nota.src} alt={nota.title} loading="lazy" />
              </div>
              <div className="nota-body">
                <h3>{nota.title}</h3>
                <p>{nota.subtitle}</p>
                <span className="nota-link">Ver más →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ===========================================================================
   APP
   =========================================================================== */
export default function App() {
  return (
    <Layout>
      <Hero />
      <Bio />
      <Servicios />
      <Trabajo />
      <Colaboraciones />
      <Notas />
    </Layout>
  );
}
