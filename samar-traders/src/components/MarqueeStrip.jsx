const ITEMS = [
  "uPVC Doors", "uPVC Windows", "Sliding Doors & Windows", "Casement Doors & Windows", "French Doors & Windows", "Modular Kitchens", "Custom Kitchen Designs", "Kitchen Cabinets & Accessories", "Sliding Wardrobes", 
  "Hinged Wardrobes", "Walk-in Wardrobes", "Custom Wardrobes", "Residential Interior Design", "Commercial Interior Design",

];

function Diamond() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "5px",
        height: "5px",
        background: "currentColor",
        borderRadius: "1px",
        transform: "rotate(45deg) translateY(-1px)",
        opacity: 0.4,
        flexShrink: 0,
      }}
    />
  );
}

export default function MarqueeStrip() {
  const track = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div style={{ width: "100%", position: "relative", zIndex: 2 }}>

      {/* ── scrolling band with its own background ── */}
      <div
        style={{
          background: "linear-gradient(180deg,#ece8e0 0%,#e8e3d9 100%)",
          borderTop: "1px solid rgba(160,148,128,0.28)",
          borderBottom: "1px solid rgba(160,148,128,0.28)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* edge fades */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,#e8e3d9 0%,transparent 9%,transparent 91%,#e8e3d9 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            padding: "14px 0",
            width: "max-content",
            animation: "samar-marquee 38s linear infinite",
            willChange: "transform",
          }}
        >
          {track.map((label, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "32px",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily:
                    i % 2 === 0
                      ? "'Playfair Display', Georgia, serif"
                      : "'Inter', ui-sans-serif, system-ui",
                  fontStyle: i % 2 === 0 ? "italic" : "normal",
                  fontWeight: i % 2 === 0 ? 400 : 500,
                  fontSize: i % 2 === 0 ? "1.05rem" : "0.76rem",
                  letterSpacing: i % 2 === 0 ? "-0.01em" : "0.1em",
                  textTransform: i % 2 === 0 ? "none" : "uppercase",
                  color: i % 2 === 0 ? "#3a3632" : "#9a9188",
                }}
              >
                {label}
              </span>
              <Diamond />
            </span>
          ))}
        </div>
      </div>

      {/* ── caption sits on the page background, outside the strip ── */}
      <div
        style={{
          textAlign: "center",
          padding: "8px 0 6px",
          
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', ui-sans-serif, system-ui",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9a9188",
          }}
        >
          Capabilities&nbsp;·&nbsp;Crafted Since 2017
        </span>
      </div>

      <style>{`
        @keyframes samar-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="samar-marquee"] { animation: none; }
        }
      `}</style>
    </div>
  );
}