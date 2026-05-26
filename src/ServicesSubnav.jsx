import { useState } from "react";

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
    sublabel: "Murales personalizados",
    emoji: "🖼️",
    color: "#47b1b1",
    shadow: "#47b1b188",
  },
  {
    id: "activaciones",
    label: "Activaciones",
    sublabel: "Live customization",
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
    <nav
      aria-label="Servicios"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "28px 16px 20px",
        background: "rgba(255, 246, 230, 0.98)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {SERVICES.map((s, i) => {
          const isActive = active === s.id;
          const isHovered = hovering === s.id;
          const isFilled = isActive || isHovered;

          return (
            <button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              onMouseEnter={() => setHovering(s.id)}
              onMouseLeave={() => setHovering(null)}
              onFocus={() => setHovering(s.id)}
              onBlur={() => setHovering(null)}
              aria-pressed={isActive}
              aria-label={`${s.label} — ${s.sublabel}`}
              style={{
                padding: "14px 32px",
                borderRadius: "8px",
                border: `3px solid ${s.color}`,
                cursor: "pointer",
                fontFamily: "'California Vibes', cursive, sans-serif",
                fontSize: "clamp(16px, 2.5vw, 22px)",
                whiteSpace: "nowrap",
                background: isFilled ? s.color : "white",
                color: isFilled ? "white" : s.color,
                transform: isActive
                  ? "rotate(0deg) scale(1.08)"
                  : isHovered
                  ? "rotate(0deg) scale(1.05)"
                  : `rotate(${BASE_ROTATIONS[i]}) scale(1)`,
                boxShadow: isActive
                  ? `4px 5px 0px ${s.color}, 0 8px 24px ${s.shadow}`
                  : isHovered
                  ? `3px 3px 0px ${s.color}, 0 4px 16px ${s.shadow}`
                  : `3px 3px 0px ${s.shadow}`,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                position: "relative",
                transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                outline: "none",
              }}
            >
              <span style={{ fontSize: "24px", lineHeight: 1 }}>{s.emoji}</span>
              {s.label}

              {isActive && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    background: "#ef5c21",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "2px solid white",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        style={{
          margin: 0,
          fontFamily: "'Nunito', sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: displayedService.color,
          transition: "color 0.2s ease",
        }}
      >
        ✦ {displayedService.sublabel} ✦
      </p>
    </nav>
  );
}
