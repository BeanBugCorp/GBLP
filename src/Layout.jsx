import { useState, useEffect } from "react";
import { MdMail, MdClose, MdChat } from "react-icons/md";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./styles/Layout.css";
import logoAzul from "./assets/logo-azul.png";
import monitaAzul from "./assets/monita-azul.png";
import { CONTENT } from "./content";

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
        <a className="nl-servicios" href="/servicios">Servicios</a>
        <a className="nl-portafolio" href="/portafolio">Portafolio</a>
        <a className="nl-colab" href="/colaboraciones">Colaboraciones</a>
        <a className="nl-faq" href="/FAQ">FAQ</a>
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
      label: "Email",
      href: CONTENT.brand.cotizarHref,
      color: "#D44638",
      pos: "translate(0px,-85px)",
      icon: <MdMail size={20} color="white" aria-hidden="true" />,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/526647699736",
      color: "#25D366",
      pos: "translate(43px,-74px)",
      icon: <FaWhatsapp size={20} color="white" aria-hidden="true" />,
    },
    {
      label: "Instagram",
      href: CONTENT.brand.instagram,
      color: "#C13584",
      pos: "translate(74px,-43px)",
      icon: <AiOutlineInstagram size={20} color="white" aria-hidden="true" />,
    },
    {
      label: "TikTok",
      href: CONTENT.brand.tiktok,
      color: "#010101",
      pos: "translate(85px,0px)",
      icon: <FaTiktok size={20} color="white" aria-hidden="true" />,
    },
  ];

  return (
    <div className={`contact-fab${open ? " open" : ""}`}>
      {items.map((item) => (
        <a
          key={item.label}
          className={`contact-fab-item contact-fab-item--${item.label}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
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
          <MdClose size={22} color="white" aria-hidden="true" />
        ) : (
          <MdChat size={22} color="white" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

/* ===========================================================================
   LAYOUT WRAPPER — wraps every page with the shared chrome
   =========================================================================== */
export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

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
    <div role = "main" className="gbl-root">
      <SiteHeader />
      <NavBar />
      {children}
      <Footer />
      {isHome && <BackToTop />}
      <ContactFab />
    </div>
  );
}
