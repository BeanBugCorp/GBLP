import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles/GarabatosByLily.css";
import logoAzul from "./assets/logo-azul.png";
import monitaAzul from "./assets/monita-azul.png";
import { CONTENT, DOODLES } from "./content";

function scrollToId(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ===========================================================================
   NAV
   =========================================================================== */
function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <a
        className="site-logo"
        href={location.pathname === "/" ? "#top" : "/"}
        onClick={(e) => { if (location.pathname === "/") scrollToId(e, "top"); }}
      >
        <img src={CONTENT.brand.logo} alt={CONTENT.brand.name} />
      </a>
    </header>
  );
}

function NavBar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleNavClick = (e, id) => {
    if (isHome) scrollToId(e, id);
  };

  return (
    <nav className="navbar">
      <div className="wrap navbar-inner">
        <a className="nl-portafolio" style={{ color: "var(--azul)" }} href="/#trabajo" onClick={(e) => handleNavClick(e, "trabajo")}>Portafolio</a>
        <a className="nl-faq" style={{ color: "var(--amarillo-fuerte)" }} href="/FAQ">FAQ</a>
        <a className="nl-servicios" style={{ color: "var(--naranja)" }} href="/#servicios" onClick={(e) => handleNavClick(e, "servicios")}>Servicios</a>
        <a className="nl-colab" style={{ color: "var(--rosa-fuerte)" }} href="/#colaboraciones" onClick={(e) => handleNavClick(e, "colaboraciones")}>Colaboraciones</a>
      </div>
    </nav>
  );
}

/* ===========================================================================
   FOOTER
   =========================================================================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="reveal">
          <img src={logoAzul} alt="Garabatos by Lily" className="footer-logo" />
          <img src={monitaAzul} alt="" aria-hidden="true" className="footer-monita" />
          <div className="footer-note">
            © {new Date().getFullYear()} Garabatos by Lily — Lilian Camarena.
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===========================================================================
   BACK TO TOP — floating button, fixed to the bottom-right corner
   =========================================================================== */
function BackToTop() {
  return (
    <button
      className="back-to-top"
      aria-label="Volver al inicio"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M12 5l-6.5 6.5M12 5l6.5 6.5" stroke="currentColor"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* ===========================================================================
   CONTACT CIRCLE MENU — floating bottom-left
   =========================================================================== */
function ContactFab() {
  const [open, setOpen] = useState(false);

  const items = [
    {
      label: "Instagram",
      href: CONTENT.brand.instagram,
      color: "#C13584",
      pos: "translate(0px,-85px)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      label: "TikTok",
      href: CONTENT.brand.tiktok,
      color: "#010101",
      pos: "translate(85px,0px)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.76a8.27 8.27 0 004.84 1.55V6.86a4.85 4.85 0 01-1.07-.17z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className={`contact-fab${open ? " open" : ""}`}>
      {items.map((item) => (
        <a
          key={item.label}
          className="contact-fab-item"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          style={{ background: item.color, "--pos": item.pos }}
        >
          {item.icon}
          <span className="contact-fab-label">{item.label}</span>
        </a>
      ))}
      <button
        className="contact-fab-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar contacto" : "Abrir contacto"}
        aria-expanded={open}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        )}
      </button>
    </div>
  );
}

/* ===========================================================================
   LAYOUT WRAPPER — wraps every page with the shared chrome
   =========================================================================== */
export default function Layout({ children }) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="gbl-root">
      <SiteHeader />
      <NavBar />
      {children}
      <Footer />
      <BackToTop />
      <ContactFab />
    </div>
  );
}
