import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   PROJECT DATA
   Each project: name, location, description, materials, media[]
   media item: { type: "image"|"video", src, poster? }
───────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "01",
    name: "Hillcrest Villa",
    location: "Gomti Nagar, Lucknow",
    description:
      "A sprawling family villa wrapped in floor-to-ceiling uPVC sliding walls, anchored by a warm teak entry door cut from a single slab. Every opening frame-flush with the architecture.",
    materials: ["uPVC Sliding Tracks", "Teak hardwood entry", "10mm toughened glass", "Anodised hardware"],
    accent: "#2a7a6a",
    // 4 photos
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
      "Slim-profile casement windows across 24 apartments, each unit demanding a bespoke sizing run. Delivered in six weeks with zero rework on the site.",
    materials: ["uPVC Casement frames", "ROTO Germany hardware", "EPDM triple gasket seal", "SS mosquito mesh"],
    accent: "#a07840",
    // 2 videos + 1 photo
    media: [
      { type: "video", src: "/videos/project2-v1.mp4", poster: "/images/hero2.jpg" },
      { type: "video", src: "/videos/project2-v2.mp4", poster: "/images/door2.jpg" },
      { type: "image", src: "/images/door3.png" },
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
    // 2 photos
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
    // 3 photos + 2 videos
    media: [
      { type: "image", src: "/images/show5.JPG" },
      { type: "image", src: "/images/hero2.jpg" },
      { type: "image", src: "/images/show7.JPG" },
      { type: "video", src: "/videos/project4-v1.mp4", poster: "/images/show5.JPG" },
      { type: "video", src: "/videos/project4-v2.mp4", poster: "/images/show7.JPG" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   SINGLE MEDIA TILE
   — images: lazy-loaded, object-fit cover
   — videos: autoplay muted loop on desktop, controls on mobile
     with poster fallback. Uses a native <video> tag so iOS/Android
     can render it inline without full-screen forcing.
───────────────────────────────────────────────────────────── */
function MediaTile({ item, onClick, className = "", style = {} }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Attempt autoplay; on mobile autoplay is blocked so the poster shows
  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;
    const v = videoRef.current;
    const tryPlay = () => {
      v.play().catch(() => {
        // Silently fail — poster image stays visible, controls allow manual play
      });
    };

    if (v.readyState >= 2) {
      tryPlay();
    } else {
      v.addEventListener("canplay", tryPlay, { once: true });
    }
    return () => v.removeEventListener("canplay", tryPlay);
  }, [item]);

  const sharedClass = `
    relative overflow-hidden rounded-2xl cursor-pointer
    group bg-stone-900
    transition-transform duration-500 ease-out
    hover:-translate-y-0.5
    ${className}
  `;

  if (item.type === "video") {
    return (
      <div className={sharedClass} style={style} onClick={onClick}>
        {/* Skeleton shimmer until poster loads */}
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-stone-800/60" />
        )}
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          /* controls on mobile so users can tap-to-play */
          controls
          preload="none"
          onLoadedData={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            /* critical: remove controls overlay space on mobile */
            WebkitMediaControls: "none",
          }}
          className="w-full h-full object-cover"
        />
        {/* Video badge — top-left, pointer-events-none so it doesn't block controls */}
        <div
          className="absolute top-3 left-3 pointer-events-none flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{
            background: "rgba(10,8,6,0.65)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          <span className="font-sans text-white font-semibold" style={{ fontSize: "0.48rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Video
          </span>
        </div>
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)" }} />
      </div>
    );
  }

  return (
    <div className={sharedClass} style={style} onClick={onClick}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-stone-800/40" />
      )}
      <img
        src={item.src}
        alt=""
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MEDIA GALLERY
   Adaptive layouts per media count:
     1  → single wide (16:9)
     2  → two equal columns
     3  → hero left (60%) + two stacked right (40%)
     4  → hero top-full + three columns below
     5  → two-col top row + three-col bottom row
   All aspect-ratios are explicit so no layout shift occurs.
───────────────────────────────────────────────────────────── */
function MediaGallery({ media, accent }) {
  const [lightbox, setLightbox] = useState(null);
  const n = media.length;

  /* Lightbox keyboard nav */
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft")  setLightbox(i => (i - 1 + n) % n);
      if (e.key === "ArrowRight") setLightbox(i => (i + 1) % n);
      if (e.key === "Escape")     setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, n]);

  const tileBase = "w-full";

  /* ── 1 item ── */
  if (n === 1) return (
    <>
      <MediaTile item={media[0]} onClick={() => setLightbox(0)}
        className={tileBase} style={{ aspectRatio: "16/9" }} />
      {lightbox !== null && <Lightbox media={media} idx={lightbox} onClose={() => setLightbox(null)} onPrev={() => setLightbox(i => (i - 1 + n) % n)} onNext={() => setLightbox(i => (i + 1) % n)} />}
    </>
  );

  /* ── 2 items ── */
  if (n === 2) return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {media.map((item, i) => (
          <MediaTile key={i} item={item} onClick={() => setLightbox(i)}
            className={tileBase} style={{ aspectRatio: "4/3" }} />
        ))}
      </div>
      {lightbox !== null && <Lightbox media={media} idx={lightbox} onClose={() => setLightbox(null)} onPrev={() => setLightbox(i => (i - 1 + n) % n)} onNext={() => setLightbox(i => (i + 1) % n)} />}
    </>
  );

  /* ── 3 items: hero + 2 stacked ── */
  if (n === 3) return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] gap-3">
        {/* Hero left */}
        <MediaTile item={media[0]} onClick={() => setLightbox(0)}
          className={tileBase} style={{ aspectRatio: "4/3" }} />
        {/* Two stacked right */}
        <div className="grid grid-rows-2 gap-3">
          {media.slice(1).map((item, i) => (
            <MediaTile key={i} item={item} onClick={() => setLightbox(i + 1)}
              className={tileBase} style={{ aspectRatio: "3/2" }} />
          ))}
        </div>
      </div>
      {lightbox !== null && <Lightbox media={media} idx={lightbox} onClose={() => setLightbox(null)} onPrev={() => setLightbox(i => (i - 1 + n) % n)} onNext={() => setLightbox(i => (i + 1) % n)} />}
    </>
  );

  /* ── 4 items: wide hero + three below ── */
  if (n === 4) return (
    <>
      <div className="flex flex-col gap-3">
        <MediaTile item={media[0]} onClick={() => setLightbox(0)}
          className={tileBase} style={{ aspectRatio: "21/9" }} />
        <div className="grid grid-cols-3 gap-3">
          {media.slice(1).map((item, i) => (
            <MediaTile key={i} item={item} onClick={() => setLightbox(i + 1)}
              className={tileBase} style={{ aspectRatio: "1/1" }} />
          ))}
        </div>
      </div>
      {lightbox !== null && <Lightbox media={media} idx={lightbox} onClose={() => setLightbox(null)} onPrev={() => setLightbox(i => (i - 1 + n) % n)} onNext={() => setLightbox(i => (i + 1) % n)} />}
    </>
  );

  /* ── 5 items: 2-col top + 3-col bottom ── */
  if (n === 5) return (
    <>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {media.slice(0, 2).map((item, i) => (
            <MediaTile key={i} item={item} onClick={() => setLightbox(i)}
              className={tileBase} style={{ aspectRatio: "4/3" }} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {media.slice(2).map((item, i) => (
            <MediaTile key={i} item={item} onClick={() => setLightbox(i + 2)}
              className={tileBase} style={{ aspectRatio: "4/3" }} />
          ))}
        </div>
      </div>
      {lightbox !== null && <Lightbox media={media} idx={lightbox} onClose={() => setLightbox(null)} onPrev={() => setLightbox(i => (i - 1 + n) % n)} onNext={() => setLightbox(i => (i + 1) % n)} />}
    </>
  );

  /* ── 6+ items: 3-col grid ── */
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {media.map((item, i) => (
          <MediaTile key={i} item={item} onClick={() => setLightbox(i)}
            className={tileBase} style={{ aspectRatio: "4/3" }} />
        ))}
      </div>
      {lightbox !== null && <Lightbox media={media} idx={lightbox} onClose={() => setLightbox(null)} onPrev={() => setLightbox(i => (i - 1 + n) % n)} onNext={() => setLightbox(i => (i + 1) % n)} />}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────────────────────── */
function Lightbox({ media, idx, onClose, onPrev, onNext }) {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);
  const item       = media[idx];
  const n          = media.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.fromTo(panelRef.current,
        { scale: 0.94, opacity: 0, y: 16 },
        { scale: 1, opacity: 1, y: 0, duration: 0.38, ease: "expo.out" });
    });
    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(panelRef.current,
      { scale: 0.95, opacity: 0, y: 12, duration: 0.18, ease: "power2.in", onComplete: onClose });
  };

  return (
    <div ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(6,4,2,0.92)", backdropFilter: "blur(20px)" }}
      onClick={(e) => e.target === overlayRef.current && handleClose()}>

      {/* Close */}
      <button onClick={handleClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-white/10"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div ref={panelRef} className="flex flex-col items-center gap-4 w-full max-w-5xl">
        {/* Media */}
        <div className="relative w-full overflow-hidden rounded-[18px]"
          style={{ maxHeight: "78vh", background: "#111" }}>
          {item.type === "video" ? (
            <video
              key={item.src}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              muted
              style={{ width: "100%", maxHeight: "78vh", display: "block", objectFit: "contain" }}
            />
          ) : (
            <img src={item.src} alt=""
              style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", display: "block" }} />
          )}
        </div>

        {/* Counter + prev/next */}
        {n > 1 && (
          <div className="flex items-center gap-5">
            <button onClick={onPrev}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="font-sans text-white/40 tabular-nums" style={{ fontSize: "0.72rem", letterSpacing: "0.12em" }}>
              {String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button onClick={onNext}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* Thumbnail strip */}
        {n >= 3 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {media.map((m, i) => (
              <button key={i}
                onClick={() => {
                  const diff = i - idx;
                  if (diff > 0) for (let x = 0; x < diff; x++) onNext();
                  if (diff < 0) for (let x = 0; x > diff; x--) onPrev();
                }}
                className="relative shrink-0 overflow-hidden rounded-[8px] transition-all duration-200"
                style={{
                  width: "52px", height: "38px",
                  opacity: i === idx ? 1 : 0.4,
                  outline: i === idx ? "2px solid rgba(255,255,255,0.8)" : "2px solid transparent",
                  transform: i === idx ? "scale(1.06)" : "scale(1)",
                }}>
                {m.type === "video" ? (
                  <div className="w-full h-full flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: m.poster ? `url(${m.poster})` : "none", background: m.poster ? undefined : "#333" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                ) : (
                  <img src={m.src} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD
   Full-width card per project. On mobile everything stacks
   vertically; on md+ the info sits alongside media.
───────────────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const { open } = useQuoteModal();
  const isEven = index % 2 === 0;

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current.querySelectorAll(".card-reveal"),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 82%", toggleActions: "play none none reset" },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);

  const mediaCount = project.media.length;
  const imageCount = project.media.filter(m => m.type === "image").length;
  const videoCount = project.media.filter(m => m.type === "video").length;

  return (
    <article
      ref={cardRef}
      id={`project-${project.id}`}
      className="relative w-full"
      style={{ scrollMarginTop: "90px" }}
    >
      {/* ── Project number watermark ── */}
      <div className="absolute -top-4 right-0 select-none pointer-events-none font-serif text-stone-900/[0.04]"
        style={{ fontSize: "clamp(5rem,12vw,9rem)", lineHeight: 1, fontWeight: 700 }}>
        {project.id}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

        {/* ── Info column: alternates left/right on large screens ── */}
        <div className={`flex flex-col gap-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>

          {/* Header */}
          <div className="card-reveal opacity-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-sans tabular-nums text-stone-400"
                style={{ fontSize: "0.56rem", letterSpacing: "0.18em" }}>
                N° {project.id}
              </span>
              <span className="h-px flex-1 max-w-[32px]" style={{ background: "rgba(180,170,155,0.4)" }} />
              <span className="font-sans uppercase tracking-[0.14em] text-stone-400"
                style={{ fontSize: "0.52rem" }}>
                {videoCount > 0 && imageCount > 0
                  ? `${imageCount} photo${imageCount > 1 ? "s" : ""} · ${videoCount} video${videoCount > 1 ? "s" : ""}`
                  : videoCount > 0
                    ? `${videoCount} video${videoCount > 1 ? "s" : ""}`
                    : `${imageCount} photo${imageCount > 1 ? "s" : ""}`}
              </span>
            </div>

            <h2 className="font-serif font-normal text-stone-900 m-0 mb-1 leading-tight tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)" }}>
              {project.name}
            </h2>

            <div className="flex items-center gap-1.5 text-stone-500" style={{ fontSize: "0.78rem" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 21s-8-6.686-8-12a8 8 0 1 1 16 0c0 5.314-8 12-8 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span className="font-sans">{project.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="card-reveal opacity-0 font-sans text-stone-500 leading-relaxed m-0"
            style={{ fontSize: "clamp(0.85rem,1.1vw,0.95rem)", lineHeight: 1.75 }}>
            {project.description}
          </p>

          {/* Materials */}
          <div className="card-reveal opacity-0">
            <p className="font-sans font-bold uppercase tracking-[0.18em] text-stone-400 mb-3 m-0"
              style={{ fontSize: "0.55rem" }}>
              Materials used
            </p>
            <div className="grid grid-cols-1 gap-0">
              {project.materials.map((mat, i, arr) => (
                <div key={mat}
                  className="flex items-center gap-3 py-2.5 transition-colors duration-150 hover:bg-[rgba(200,185,155,0.06)] -mx-2 px-2 rounded-lg"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(180,170,155,0.2)" : "none" }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: project.accent }} />
                  <span className="font-sans text-stone-700" style={{ fontSize: "0.84rem" }}>
                    {mat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="card-reveal opacity-0 flex flex-wrap gap-3 pt-1">
            <button onClick={open}
              className="inline-flex items-center gap-2 rounded-full font-sans font-semibold text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
              style={{
                fontSize: "0.78rem",
                padding: "10px 22px",
                background: "#1c1917",
                boxShadow: "0 6px 22px rgba(0,0,0,0.18)",
                border: "none",
                cursor: "pointer",
              }}>
              Enquire about this
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Media column ── */}
        <div className={`card-reveal opacity-0 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <MediaGallery media={project.media} accent={project.accent} />
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE HEADER
───────────────────────────────────────────────────────────── */
function PageHeader() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-hero-el",
        { opacity: 0, y: 24, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.09, ease: "expo.out", delay: 0.05 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={ref}
      className="relative overflow-hidden pb-14 pt-28 md:pt-32"
      style={{ background: "linear-gradient(160deg, #f9f7f2 0%, #f4f0e7 50%, #ede8dd 100%)" }}>

      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-24 right-[12%] h-[420px] w-[420px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.22) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(#1c1917 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="proj-hero-el opacity-0 mb-8 flex items-center gap-2">
          <Link to="/" className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-stone-400 no-underline hover:text-stone-700 transition-colors">
            Home
          </Link>
          <span className="text-stone-300">›</span>
          <span className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#a07840]">
            Projects
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <div className="proj-hero-el opacity-0 mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-[#c8b99a] to-transparent" />
              <span className="font-sans font-extrabold uppercase tracking-[0.24em] text-stone-400"
                style={{ fontSize: "0.58rem" }}>
                Project Gallery
              </span>
            </div>

            <h1 className="proj-hero-el opacity-0 m-0 font-serif font-normal text-stone-900 leading-[0.95] tracking-[-0.04em]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
              Built &amp; delivered
              <br />
              <em className="italic" style={{ color: "#a07840" }}>— in Lucknow.</em>
            </h1>

            <p className="proj-hero-el opacity-0 mt-5 font-sans text-stone-500 leading-relaxed max-w-[480px]"
              style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}>
              A curated selection of completed installations — photos and videos from each site, direct from our team.
            </p>
          </div>

          {/* Stats pill */}
          <div className="proj-hero-el opacity-0 flex flex-wrap gap-3">
            {[
              { v: PROJECTS.length, l: "Projects" },
              { v: "2+", l: "Years" },
              { v: "200+", l: "Installs" },
            ].map(({ v, l }) => (
              <div key={l}
                className="rounded-[18px] border border-[rgba(200,185,155,0.4)] bg-white/55 px-5 py-4 backdrop-blur-xl text-center"
                style={{ minWidth: "80px" }}>
                <p className="m-0 font-serif font-semibold text-stone-900 leading-none"
                  style={{ fontSize: "1.7rem", letterSpacing: "-0.04em" }}>{v}</p>
                <p className="m-0 mt-1 font-sans font-bold uppercase text-stone-400"
                  style={{ fontSize: "0.52rem", letterSpacing: "0.16em" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PROJECTS PAGE
───────────────────────────────────────────────────────────── */
export default function Projects() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f5f2eb" }}>
      <PageHeader />

      {/* Project cards */}
      <div className="mx-auto max-w-[1240px] px-5 md:px-12 py-16 md:py-24">
        <div className="flex flex-col gap-24 md:gap-32">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <BottomCTA />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BOTTOM CTA
───────────────────────────────────────────────────────────── */
function BottomCTA() {
  const { open } = useQuoteModal();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".bottom-cta-el",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref}
      className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28"
      style={{ background: "linear-gradient(180deg, #1c1714 0%, #241e18 100%)" }}>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(200,169,110,0.14) 0%, transparent 70%)" }} />
      </div>
      <div className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />

      <div className="relative z-10 mx-auto max-w-[840px] text-center">
        <div className="bottom-cta-el opacity-0 mb-5 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c8b99a]/50" />
          <span className="font-sans font-extrabold uppercase tracking-[0.28em] text-[#c8b99a]"
            style={{ fontSize: "0.58rem" }}>
            Start a project
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c8b99a]/50" />
        </div>

        <h2 className="bottom-cta-el opacity-0 m-0 font-serif font-normal text-white leading-[0.96] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)" }}>
          Your space could be
          <br />
          <em className="bg-gradient-to-r from-[#c8a96e] via-[#e0c890] to-[#9ecfbf] bg-clip-text italic text-transparent">
            our next project.
          </em>
        </h2>

        <p className="bottom-cta-el opacity-0 mt-5 mb-10 font-sans text-white/45 leading-relaxed max-w-[440px] mx-auto"
          style={{ fontSize: "0.9rem" }}>
          Tell us your brief. We visit, measure, and produce a detailed quote — no obligations, no pressure.
        </p>

        <div className="bottom-cta-el opacity-0 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={open}
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-sans font-semibold text-stone-900 transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #c8a96e 0%, #a07840 100%)",
              boxShadow: "0 12px 40px rgba(200,169,110,0.3)",
              fontSize: "0.85rem",
              border: "none",
              cursor: "pointer",
            }}>
            Brief Us
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>
          <Link to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 font-sans font-semibold text-white/70 no-underline backdrop-blur-xl transition-all duration-200 hover:bg-white/10 hover:text-white"
            style={{ borderColor: "rgba(200,185,155,0.25)", fontSize: "0.85rem" }}>
            Talk to us
          </Link>
        </div>
      </div>
    </footer>
  );
}
