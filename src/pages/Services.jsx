import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../Layout";
import ServicesSubnav from "../ServicesSubnav";
import { CONTENT, SERVICE_IDS, SERVICE_META, SERVICES_DETAIL } from "../content";
import "../styles/Services.css";

// Window Painting gallery
import wpEspejoRosa from "../assets/servicios/wp/espejo-rosa.jpg";
import wpMadres from "../assets/servicios/wp/madres.jpg";
import wpMty from "../assets/servicios/wp/mty.jpg";
import wpPump from "../assets/servicios/wp/pump.jpg";
import wpVal from "../assets/servicios/wp/val.jpg";
import wpXmas from "../assets/servicios/wp/xmas.jpg";

// Murales gallery
import murBwLily from "../assets/servicios/murales/bw-lily.jpg";
import murFlor from "../assets/servicios/murales/flor.jpg";
import murJacAzul from "../assets/servicios/murales/jac-azul.jpg";
import murJacLily from "../assets/servicios/murales/jac-lily.jpg";
import murSquiggleLily from "../assets/servicios/murales/squiggle-lily.jpg";
import murTelvista from "../assets/servicios/murales/telvista.jpg";

// Activaciones gallery
import actAdidasLily from "../assets/servicios/acts/adidas-lily.jpg";
import actAdidasVentana from "../assets/servicios/acts/adidas-ventana.jpg";
import actFerragamoBolsas from "../assets/servicios/acts/ferragamo-bolsas.jpg";
import actFerragamoLily from "../assets/servicios/acts/ferragamo-lily.jpg";
import actJoMaloneLily from "../assets/servicios/acts/jomalone-lily.jpg";
import actJoMaloneLily2 from "../assets/servicios/acts/jomalone-lily2.jpg";

function buildMailto(serviceName) {
  const body = [
    `Hola! Me interesa cotizar sobre el servicio ${serviceName}`,
    "",
    "Nombre:",
    "Correo:",
    "Teléfono:",
  ].join("\n");
  return (
    `mailto:garabatosbylily@gmail.com` +
    `?subject=${encodeURIComponent(`Cotización - ${serviceName}`)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

const GALLERY_IMAGES = {
  window:       [wpEspejoRosa, wpMadres, wpMty, wpPump, wpVal, wpXmas],
  murales:      [murBwLily, murFlor, murJacAzul, murJacLily, murSquiggleLily, murTelvista],
  activaciones: [actAdidasLily, actAdidasVentana, actFerragamoBolsas, actFerragamoLily, actJoMaloneLily, actJoMaloneLily2],
};

/* Simple carousel for the right column */
function ServiceCarousel({ images, name, color }) {
  const [idx, setIdx] = useState(0);
  const n = images.length;
  const prev = () => setIdx((i) => (i - 1 + n) % n);
  const next = () => setIdx((i) => (i + 1) % n);

  return (
    <div className="svc-carousel" style={{ "--svc-color": color }}>
      <div className="svc-carousel-track">
        {images.map((src, i) => (
          <div
            key={i}
            className={`svc-carousel-slide${i === idx ? " active" : ""}`}
          >
            <img src={src} alt={`${name} ${i + 1}`} loading="lazy" />
          </div>
        ))}

        <button className="svc-carousel-btn prev" onClick={prev} aria-label="Anterior">
          ‹
        </button>
        <button className="svc-carousel-btn next" onClick={next} aria-label="Siguiente">
          ›
        </button>
      </div>

      <div className="svc-carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={i === idx ? "on" : ""}
            onClick={() => setIdx(i)}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceGallery({ svcId, name }) {
  const images = GALLERY_IMAGES[svcId];
  return (
    <div className="svc-gallery">
<div className="svc-gallery-grid">
        {images.map((src, i) => (
          <figure key={i} className="svc-gallery-fig">
            <img src={src} alt={`${name} ${i + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
}

function ServiceSection({ service, svcId }) {
  const meta = SERVICE_META[svcId];
  const detail = SERVICES_DETAIL[svcId];

  return (
    <section
      id={`section-${svcId}`}
      className="svc-section"
      style={{ "--svc-color": meta.color, "--svc-bg": meta.bg }}
    >
      <div className="wrap">
        {/* Title */}
        <header className="svc-header reveal">
          <span className="svc-emoji" aria-hidden="true">{meta.emoji}</span>
          <h2 className="script-h svc-name">{service.name}</h2>
        </header>

        {/* Two-column body */}
        <div className="svc-body reveal">
          {/* Left: text */}
          <div className="svc-text">
            <p className="svc-intro">{detail.intro}</p>
            {detail.sections.map((sec, si) => (
              <div key={si} className="svc-text-section">
                <h3 className="svc-section-title">{sec.title}</h3>
                {sec.text && <p className="svc-section-body">{sec.text}</p>}
                {sec.items && (
                  <ul className="svc-bullets">
                    {sec.items.map((item, ii) => (
                      <li key={ii}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="svc-cta">
              <a href={buildMailto(service.name)} className="svc-btn">
                Cotiza este servicio
              </a>
            </div>
          </div>

          {/* Right: carousel */}
          <div className="svc-carousel-col">
            <ServiceCarousel
              images={service.images}
              name={service.name}
              color={meta.color}
            />
          </div>
        </div>

        {/* Gallery */}
        <ServiceGallery svcId={svcId} name={service.name} />
      </div>
    </section>
  );
}

export default function Services() {
  const { hash } = useLocation();

  // Derive initial active section from the URL hash at mount time
  const [activeId, setActiveId] = useState(() => {
    const id = window.location.hash.replace("#section-", "");
    return SERVICE_IDS.includes(id) ? id : "window";
  });

  // Scroll to the target section when the hash is present
  useEffect(() => {
    const id = hash.replace("#section-", "");
    if (SERVICE_IDS.includes(id)) {
      const el = document.getElementById(`section-${id}`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      }
    }
  }, [hash]);

  useEffect(() => {
    const ios = SERVICE_IDS.map((id) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0, rootMargin: "-40% 0px -60% 0px" }
      );
      io.observe(el);
      return io;
    }).filter(Boolean);

    return () => ios.forEach((io) => io.disconnect());
  }, []);

  return (
    <Layout>
      <main className="services-page">
        <div className="services-hero">
          <div className="wrap reveal">
            <p className="services-tagline">Arte que transforma espacios</p>
          </div>
        </div>

        <div className="svc-subnav-rail">
          <ServicesSubnav active={activeId} onChange={setActiveId} />
        </div>

        {CONTENT.servicios.map((s, idx) => (
          <ServiceSection
            key={SERVICE_IDS[idx]}
            service={s}
            svcId={SERVICE_IDS[idx]}
          />
        ))}
      </main>
    </Layout>
  );
}
