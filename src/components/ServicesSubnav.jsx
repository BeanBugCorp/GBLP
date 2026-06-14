import { useState } from "react";
import "../styles/ServicesSubnav.css"

const SERVICES = [
  {
    id: "window",
    label: "Window Painting",
    sublabel: "Garabatos en ventana",
    emoji: "🪟",
    color: "#ef5c21",
    shadow: "#ef5c2188",
  },
  {
    id: "murales",
    label: "Murales",
    sublabel: "Murales garabateados",
    emoji: "🖼️",
    color: "#47b1b1",
    shadow: "#47b1b188",
  },
  {
    id: "activaciones",
    label: "Activaciones",
    sublabel: "Garabatos en vivo",
    emoji: "🎨",
    color: "#e9619e",
    shadow: "#e9619e88",
  },
];

const BASE_ROTATIONS = ["-3deg", "2deg", "-1.5deg"];

export default function ServicesSubnav({ active: activeProp, onChange }) {
  const [internalActive, setInternalActive] = useState("window");
  const [hovering, setHovering] = useState(null);

  const active = activeProp !== undefined ? activeProp : internalActive;

  const displayedService =
    SERVICES.find((s) => s.id === hovering) ??
    SERVICES.find((s) => s.id === active);

  const handleSelect = (id) => {
    if (onChange) onChange(id);
    if (activeProp === undefined) setInternalActive(id);

    const target = document.getElementById(`section-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav aria-label="Servicios" className = "nav">
      <div className="services-subnav-row">
        {SERVICES.map((s, i) => {
          const isActive = active === s.id;
          const isHovered = hovering === s.id;
          const isFilled = isActive || isHovered;

          return (
            <button
              key={s.id}
              className= {`services-subnav-btn services-subnav-btn--${s.id}${isFilled ? ' is-filled' : ''}${isActive ? ' is-active' : ''}`}
              onClick={() => handleSelect(s.id)}
              onMouseEnter={() => setHovering(s.id)}
              onMouseLeave={() => setHovering(null)}
              onFocus={() => setHovering(s.id)}
              onBlur={() => setHovering(null)}
              aria-pressed={isActive}
              aria-label={`${s.label} — ${s.sublabel}`}
            >
              <span className="services-subnav-emoji">{s.emoji}</span>
              {s.label}

              {isActive && (
                <span
                  aria-hidden="true"
                  className = "services-subnav-emoji-active"
                  // style={{
                  //   position: "absolute",
                  //   top: "-10px",
                  //   right: "-10px",
                  //   background: "#ef5c21",
                  //   width: "20px",
                  //   height: "20px",
                  //   borderRadius: "50%",
                  //   border: "2px solid white",
                  //   boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  // }}
                />
              )}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className={`sub-label sub-label--${displayedService.id}`}
        // style={{
        //   margin: 0,
        //   fontFamily: "'Nunito', sans-serif",
        //   fontSize: "11px",
        //   fontWeight: 700,
        //   letterSpacing: "0.1em",
        //   textTransform: "uppercase",
        //   color: displayedService.color,
        //   transition: "color 0.2s ease",
        // }}
      >
        ✦ {displayedService.sublabel} ✦
      </p>
    </nav>
  );
}
