import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   PROJECT DATA
   Project 1: 4 photos
   Project 2: 2 videos + 4 photos
   Project 3: 2 photos
   Project 4: 3 photos + 2 videos
═══════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "01",
    name: "Hillcrest Villa",
    location: "Gomti Nagar, Lucknow",
    description:
      "A sprawling family villa wrapped in floor-to-ceiling uPVC sliding walls, anchored by a warm teak entry door cut from a single slab. Every opening frame-flush with the architecture.",
    materials: ["uPVC Sliding Tracks", "Teak hardwood entry", "10mm toughened glass", "Anodised hardware"],
    accent: "#2a7a6a",
    media: [
      { type: "image", src: "/images/hero1.jpg" },
      { type: "image", src: "/images/hero2.jpg" },
      { type: "image", src: "/images/hero3.jpeg" },
      { type: "image", src: "/images/door1.jpg" },
    ],
  },
  {
    id: "02",
    name: "Lakeside Apartments",
    location: "Hazratganj, Lucknow",
    description:
      "Slim-profile casement windows across 24 apartments, each unit demanding a bespoke sizing run. Delivered in six weeks with zero rework on site.",
    materials: ["uPVC Casement frames", "ROTO Germany hardware", "EPDM triple gasket seal", "SS mosquito mesh"],
    accent: "#a07840",
    media: [
      { type: "video", src: "/videos/project2-v1.mp4", poster: "/images/hero2.jpg" },
      { type: "video", src: "/videos/project2-v2.mp4", poster: "/images/door2.jpg" },
      { type: "image", src: "/images/door3.png" },
      { type: "image", src: "/images/door4.jpg" },
      { type: "image", src: "/images/win1.jpg" },
      { type: "image", src: "/images/win2.webp" },
    ],
  },
  {
    id: "03",
    name: "Aster Café",
    location: "Indira Nagar, Lucknow",
    description:
      "A modular kitchen installation for a 40-cover café — L-shaped layout, full appliance integration, and a custom stone-topped island that doubles as a prep and pass counter.",
    materials: ["Modular kitchen cabinetry", "Quartz stone countertop", "Soft-close drawer systems", "Built-in appliance housing"],
    accent: "#7a5c3a",
    media: [
      { type: "image", src: "/images/show1.JPG" },
      { type: "image", src: "/images/show3.JPG" },
    ],
  },
  {
    id: "04",
    name: "Whitefield Office Park",
    location: "Aliganj, Lucknow",
    description:
      "Glass partition walls across three floors of a corporate office, with frameless pivot doors and acoustic seals engineered to hit 38dB reduction — verified post-install.",
    materials: ["10mm toughened glass", "Aluminium channels", "Acoustic EPDM seals", "Frameless pivot hinges"],
    accent: "#3a5a7a",
    media: [
      { type: "image", src: "/images/show5.JPG" },
      { type: "image", src: "/images/show7.JPG" },
      { type: "image", src: "/images/hero2.jpg" },
      { type: "video", src: "/videos/project4-v1.mp4", poster: "/images/show5.JPG" },
      { type: "video", src: "/videos/project4-v2.mp4", poster: "/images/show7.JPG" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX / MODAL
═══════════════════════════════════════════════════════════════ */
function Lightbox({ media, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const n = media.length;
  const item = media[idx];

  const prev = useCallback(() => setIdx((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIdx((i) => (i + 1) % n), [n]);

  /* lock scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* entrance animation */
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out" });
    gsap.fromTo(panelRef.current,
      { scale: 0.93, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.36, ease: "expo.out" }
    );
  }, []);

  /* keyboard nav */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  /* pause video when navigating away */
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [idx]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18 });
    gsap.to(panelRef.current, {
      scale: 0.94, opacity: 0, y: 12, duration: 0.16, ease: "power2.in",
      onComplete: onClose,
    });
  };

  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const imageCount = media.filter(m => m.type === "image").length;
  const videoCount = media.filter(m => m.type === "video").length;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(4, 3, 2, 0.96)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: 10,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(8px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s, transform 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.20)"; e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.transform = "scale(1)"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Main panel */}
      <div
        ref={panelRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          maxWidth: "960px",
          maxHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* Media viewer */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "14px",
            background: "#0d0b09",
            flexShrink: 1,
            minHeight: 0,
            /* key: let it shrink to fit viewport */
            maxHeight: "calc(100svh - 130px)",
          }}
        >
          {item.type === "video" ? (
            <video
              ref={videoRef}
              key={item.src}
              src={item.src}
              poster={item.poster}
              controls
              playsInline
              autoPlay
              muted
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                maxHeight: "calc(100svh - 130px)",
                objectFit: "contain",
                borderRadius: "14px",
              }}
            />
          ) : (
            <img
              key={item.src}
              src={item.src}
              alt=""
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                maxHeight: "calc(100svh - 130px)",
                objectFit: "contain",
                borderRadius: "14px",
              }}
            />
          )}
        </div>

        {/* Controls row */}
        {n > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
            <button
              onClick={prev}
              aria-label="Previous"
              style={{
                width: "36px", height: "36px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s, transform 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.20)"; e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.38)", letterSpacing: "0.12em", fontVariantNumeric: "tabular-nums" }}>
              {String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>

            <button
              onClick={next}
              aria-label="Next"
              style={{
                width: "36px", height: "36px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s, transform 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.20)"; e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* Thumbnail strip */}
        {n >= 2 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              overflowX: "auto",
              paddingBottom: "4px",
              maxWidth: "100%",
              flexShrink: 0,
              scrollbarWidth: "none",
            }}
          >
            {media.map((m, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to item ${i + 1}`}
                style={{
                  width: "46px",
                  height: "34px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: "pointer",
                  border: i === idx ? "2px solid rgba(255,255,255,0.85)" : "2px solid transparent",
                  opacity: i === idx ? 1 : 0.42,
                  transform: i === idx ? "scale(1.06)" : "scale(1)",
                  transition: "opacity 0.2s, transform 0.2s, border-color 0.2s",
                  padding: 0,
                  background: "#111",
                }}
              >
                {m.type === "video" ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: m.poster ? `url(${m.poster})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: m.poster ? undefined : "#333",
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={m.src}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY TILE
═══════════════════════════════════════════════════════════════ */
function GalleryTile({ item, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const tileRef = useRef(null);

  return (
    <div
      ref={tileRef}
      onClick={onClick}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4/3",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#d8d0c5",
        flexShrink: 0,
      }}
      className="gallery-tile"
    >
      {/* Shimmer */}
      {!loaded && item.type === "image" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #d8d0c5 25%, #e8e0d4 50%, #d8d0c5 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s ease-in-out infinite",
          }}
        />
      )}

      {item.type === "video" ? (
        <>
          <video
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Video badge */}
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "4px 9px",
              borderRadius: "99px",
              background: "rgba(0,0,0,0.62)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.14)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <svg width="7" height="7" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.45rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "white" }}>
              Video
            </span>
          </div>
        </>
      ) : (
        <img
          src={item.src}
          alt=""
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
          className="gallery-tile-img"
        />
      )}

      {/* Hover overlay */}
      <div
        className="gallery-tile-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 100%)",
          transition: "background 0.3s",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="gallery-tile-icon"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transform: "scale(0.7)",
            transition: "opacity 0.25s, transform 0.25s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c1917" strokeWidth="2.5">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>

      <style>{`
        .gallery-tile:hover .gallery-tile-img {
          transform: scale(1.06);
        }
        .gallery-tile:hover .gallery-tile-overlay {
          background: linear-gradient(135deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.18) 100%);
        }
        .gallery-tile:hover .gallery-tile-icon {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY GRID
   Layouts:
     2  → equal 2-col
     3  → wide hero top + 2-col bottom
     4  → 2×2 grid
     5  → 3-col top + 2-col bottom
     6  → 3×2 grid
═══════════════════════════════════════════════════════════════ */
function GalleryGrid({ media }) {
  const [lightbox, setLightbox] = useState(null);
  const n = media.length;

  const open = (i) => setLightbox(i);
  const close = () => setLightbox(null);

  const tiles = media.map((item, i) => (
    <GalleryTile key={i} item={item} onClick={() => open(i)} />
  ));

  const renderGrid = () => {
    if (n === 2) return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
        {tiles}
      </div>
    );

    if (n === 3) return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Hero wide */}
        <div style={{ width: "100%", position: "relative", borderRadius: "14px", overflow: "hidden", aspectRatio: "16/7", cursor: "pointer", background: "#d8d0c5" }}>
          <GalleryTile item={media[0]} onClick={() => open(0)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          {tiles.slice(1)}
        </div>
      </div>
    );

    if (n === 4) return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
        {tiles}
      </div>
    );

    if (n === 5) return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {tiles.slice(0, 3)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          {tiles.slice(3)}
        </div>
      </div>
    );

    if (n === 6) return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {tiles}
      </div>
    );

    /* fallback */
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
        {tiles}
      </div>
    );
  };

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .gallery-force-2col { grid-template-columns: repeat(2, 1fr) !important; }
          .gallery-force-1col { grid-template-columns: 1fr !important; }
        }
      `}</style>
      {renderGrid()}
      {lightbox !== null && (
        <Lightbox media={media} startIdx={lightbox} onClose={close} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT SECTION
═══════════════════════════════════════════════════════════════ */
function ProjectSection({ project, index }) {
  const sectionRef = useRef(null);
  const { open } = useQuoteModal();

  const imageCount = project.media.filter(m => m.type === "image").length;
  const videoCount = project.media.filter(m => m.type === "video").length;

  const mediaLabel = (() => {
    const parts = [];
    if (imageCount > 0) parts.push(`${imageCount} photo${imageCount > 1 ? "s" : ""}`);
    if (videoCount > 0) parts.push(`${videoCount} video${videoCount > 1 ? "s" : ""}`);
    return parts.join(" · ");
  })();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".proj-reveal"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reset",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const isLast = index === PROJECTS.length - 1;

  return (
    <section
      ref={sectionRef}
      id={`project-${project.id}`}
      style={{
        width: "100%",
        paddingBottom: isLast ? 0 : "0",
        scrollMarginTop: "88px",
      }}
    >
      {/* ── Section divider */}
      {index > 0 && (
        <div style={{ width: "100%", height: "1px", background: "rgba(180,168,148,0.18)", marginBottom: "64px" }} />
      )}

      {/* ── Project header block */}
      <div
        className="proj-reveal"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {/* Left: number + name + location */}
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.18em",
                color: "rgba(160,150,132,0.8)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              N° {project.id}
            </span>
            <span style={{ height: "1px", width: "24px", background: "rgba(180,168,148,0.45)" }} />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.50rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(160,150,132,0.75)",
              }}
            >
              {mediaLabel}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: "clamp(1.8rem, 3.8vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#1c1710",
              margin: "0 0 8px",
            }}
          >
            {project.name}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#9a9188" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 21s-8-6.686-8-12a8 8 0 1 1 16 0c0 5.314-8 12-8 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem" }}>
              {project.location}
            </span>
          </div>
        </div>

        {/* Right: description + materials + CTA */}
        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "clamp(0.84rem, 1.1vw, 0.94rem)",
              lineHeight: 1.75,
              color: "#6b6258",
              margin: 0,
            }}
          >
            {project.description}
          </p>

          {/* Materials */}
          <div>
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.52rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#a8a098",
                margin: "0 0 10px",
              }}
            >
              Materials used
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.materials.map((mat) => (
                <span
                  key={mat}
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.7rem",
                    color: "#5a5248",
                    padding: "5px 12px",
                    borderRadius: "99px",
                    background: "rgba(255,255,255,0.68)",
                    border: "1px solid rgba(200,190,170,0.55)",
                    backdropFilter: "blur(6px)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <button
              onClick={open}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 22px",
                borderRadius: "99px",
                background: "#1c1917",
                border: "none",
                color: "#fff",
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.01em",
                boxShadow: "0 6px 20px rgba(28,25,23,0.20)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(28,25,23,0.28)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(28,25,23,0.20)"; }}
            >
              Enquire about this
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Gallery */}
      <div className="proj-reveal">
        <GalleryGrid media={project.media} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE HEADER
═══════════════════════════════════════════════════════════════ */
function PageHeader() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-hero-el",
        { opacity: 0, y: 26, filter: "blur(7px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.85, stagger: 0.09, ease: "expo.out", delay: 0.05,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBottom: "64px",
        paddingTop: "clamp(100px, 13vw, 136px)",
        background: "linear-gradient(160deg, #f9f7f2 0%, #f4f0e7 50%, #ede8dd 100%)",
      }}
    >
      {/* Glow blob */}
      <div style={{
        position: "absolute", top: "-80px", right: "10%",
        width: "420px", height: "420px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,110,0.22) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.035, pointerEvents: "none",
        backgroundImage: "radial-gradient(#1c1917 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 56px)" }}>
        {/* Breadcrumb */}
        <div className="proj-hero-el" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px", opacity: 0 }}>
          <Link to="/" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.56rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "#a8a098", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#5a5248"}
            onMouseLeave={e => e.currentTarget.style.color = "#a8a098"}
          >Home</Link>
          <span style={{ color: "#d0c8bc" }}>›</span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.56rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "#a07840" }}>Projects</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "32px" }}>
          <div>
            <div className="proj-hero-el" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", opacity: 0 }}>
              <span style={{ height: "1px", width: "32px", background: "linear-gradient(to right, #c8b99a, transparent)" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.24em", color: "#9a9188" }}>Project Gallery</span>
            </div>

            <h1
              className="proj-hero-el"
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                fontWeight: 400,
                lineHeight: 0.96,
                letterSpacing: "-0.04em",
                color: "#1c1710",
                margin: 0,
                opacity: 0,
              }}
            >
              Built &amp; delivered
              <br />
              <em style={{ fontStyle: "italic", color: "#a07840" }}>— in Lucknow.</em>
            </h1>

            <p
              className="proj-hero-el"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                lineHeight: 1.7,
                color: "#78716c",
                maxWidth: "480px",
                margin: "20px 0 0",
                opacity: 0,
              }}
            >
              A curated selection of completed installations — photos and videos from each site, direct from our team.
            </p>
          </div>

          {/* Stats */}
          <div className="proj-hero-el" style={{ display: "flex", flexWrap: "wrap", gap: "10px", opacity: 0 }}>
            {[{ v: PROJECTS.length, l: "Projects" }, { v: "2+", l: "Years" }, { v: "200+", l: "Installs" }].map(({ v, l }) => (
              <div key={l} style={{
                minWidth: "80px",
                borderRadius: "18px",
                border: "1px solid rgba(200,185,155,0.4)",
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(14px)",
                padding: "16px 20px",
                textAlign: "center",
              }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.7rem", fontWeight: 600, letterSpacing: "-0.04em", color: "#1c1710", margin: 0, lineHeight: 1 }}>{v}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.52rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#a8a098", margin: "6px 0 0" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BOTTOM CTA
═══════════════════════════════════════════════════════════════ */
function BottomCTA() {
  const { open } = useQuoteModal();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".bottom-cta-el",
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(60px, 8vw, 112px) clamp(20px, 5vw, 56px)",
        background: "linear-gradient(180deg, #1c1714 0%, #241e18 100%)",
        marginTop: "0",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none",
      }}>
        <div style={{ width: "500px", height: "500px", borderRadius: "50%", filter: "blur(110px)", background: "radial-gradient(circle, rgba(200,169,110,0.14) 0%, transparent 70%)" }} />
      </div>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "840px", margin: "0 auto", textAlign: "center" }}>
        <div className="bottom-cta-el" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px", opacity: 0 }}>
          <div style={{ height: "1px", width: "40px", background: "linear-gradient(to right, transparent, rgba(200,185,155,0.5))" }} />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.28em", color: "#c8b99a" }}>Start a project</span>
          <div style={{ height: "1px", width: "40px", background: "linear-gradient(to left, transparent, rgba(200,185,155,0.5))" }} />
        </div>

        <h2
          className="bottom-cta-el"
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 0.97,
            letterSpacing: "-0.04em",
            color: "#fff",
            margin: 0,
            opacity: 0,
          }}
        >
          Your space could be
          <br />
          <em style={{
            fontStyle: "italic",
            background: "linear-gradient(to right, #c8a96e, #e0c890, #9ecfbf)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            our next project.
          </em>
        </h2>

        <p
          className="bottom-cta-el"
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.42)",
            maxWidth: "440px",
            margin: "20px auto 40px",
            opacity: 0,
          }}
        >
          Tell us your brief. We visit, measure, and produce a detailed quote — no obligations, no pressure.
        </p>

        <div className="bottom-cta-el" style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", opacity: 0 }}>
          <button
            onClick={open}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "99px",
              background: "linear-gradient(135deg, #c8a96e 0%, #a07840 100%)",
              boxShadow: "0 12px 40px rgba(200,169,110,0.3)",
              border: "none", cursor: "pointer",
              fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#1c1710",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            Brief Us
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>
          <Link
            to="/contact"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "99px",
              border: "1px solid rgba(200,185,155,0.25)",
              backdropFilter: "blur(12px)",
              fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", fontWeight: 600,
              color: "rgba(255,255,255,0.65)", textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
          >
            Talk to us
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */
export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb" }}>
      <PageHeader />

      {/* Projects list */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(48px, 7vw, 96px) clamp(20px, 5vw, 56px)" }}>
        {PROJECTS.map((project, i) => (
          <ProjectSection key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Spacer before dark footer */}
      <div style={{ height: "clamp(40px, 5vw, 72px)", background: "#f5f2eb" }} />

      <BottomCTA />
    </div>
  );
}