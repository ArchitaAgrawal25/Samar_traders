import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: "01",
    name: "uPVC Casement Windows",
    category: "uPVC",
    type: "Windows",
    location: "Gomti Nagar, Lucknow",
    desc: "Energy-efficient multi-chamber uPVC frames with German hardware, weather-sealed gaskets and tilt-turn operation for maximum ventilation control.",
    materials: ["uPVC frames", "Toughened glass", "ROTO hardware"],
    images: ["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpeg"],
  },
  {
    id: "02",
    name: "Aluminium Sliding Doors",
    category: "Aluminium",
    type: "Doors",
    location: "Hazratganj, Lucknow",
    desc: "Slim-profile aluminium sliding systems with floor-to-ceiling glass for seamless indoor-outdoor flow. Powder-coated in 200+ RAL shades.",
    materials: ["6063-T5 Aluminium", "Structural glazing", "Stainless rollers"],
    images: ["/images/hero2.jpg", "/images/hero3.jpeg", "/images/hero1.jpg"],
  },
  {
    id: "03",
    name: "Wooden Entry Doors",
    category: "Wood",
    type: "Doors",
    location: "Aliganj, Lucknow",
    desc: "Solid teak and engineered hardwood doors with CNC-routed panels, termite-treatment and custom lacquer finishes for lasting impressions.",
    materials: ["Solid teak", "Engineered wood", "Mortise lock"],
    images: ["/images/hero3.jpeg", "/images/hero1.jpg", "/images/hero2.jpg"],
  },
  {
    id: "04",
    name: "Glass Partitions",
    category: "Glass",
    type: "Partitions",
    location: "Vikas Nagar, Lucknow",
    desc: "10mm toughened and frosted glass office partitions with slim aluminium frames, acoustic seals and full-height pivot doors.",
    materials: ["10mm toughened glass", "Frosted film", "Aluminium channels"],
    images: ["/images/hero1.jpg", "/images/hero3.jpeg", "/images/hero2.jpg"],
  },
  {
    id: "05",
    name: "uPVC Sliding Windows",
    category: "uPVC",
    type: "Windows",
    location: "Indira Nagar, Lucknow",
    desc: "Low-maintenance uPVC sliding windows with stainless mesh, multi-point locking and UV-stabilised profiles for Indian climate zones.",
    materials: ["uPVC profiles", "SS mosquito mesh", "Multi-point lock"],
    images: ["/images/hero2.jpg", "/images/hero1.jpg", "/images/hero3.jpeg"],
  },
  {
    id: "06",
    name: "Folding Balcony Enclosures",
    category: "Aluminium",
    type: "Enclosures",
    location: "Gomti Nagar Ext., Lucknow",
    desc: "Thermally broken aluminium bi-fold systems that fully retract to open balconies to the sky — ideal for apartments and penthouses.",
    materials: ["Thermally broken Al", "Laminated glass", "Concealed hinges"],
    images: ["/images/hero3.jpeg", "/images/hero2.jpg", "/images/hero1.jpg"],
  },
];

// ─── tiny helpers ────────────────────────────────────────────
function Tag({ children }) {
  return (
    <span
      className="font-sans text-stone-700 inline-block"
      style={{
        fontSize: "0.68rem",
        padding: "4px 12px",
        borderRadius: "99px",
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(200,190,170,0.5)",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </span>
  );
}

// ─── Modal ────────────────────────────────────────────────────
function ProductModal({ product, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power2.out" });
      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 32, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "expo.out" }
      );
    });
    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.22 });
    gsap.to(panelRef.current, { opacity: 0, y: 20, scale: 0.97, duration: 0.22, ease: "power2.in", onComplete: onClose });
  };

  // Close on overlay click
  const handleOverlayClick = (e) => { if (e.target === overlayRef.current) handleClose(); };

  // Keyboard close
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const prev = () => setImgIdx(i => (i - 1 + product.images.length) % product.images.length);
  const next = () => setImgIdx(i => (i + 1) % product.images.length);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(20,18,14,0.55)", backdropFilter: "blur(8px)" }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-[880px] max-h-[90vh] overflow-y-auto rounded-[24px]"
        style={{
          background: "#f8f6f1",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-stone-200"
          style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(200,190,170,0.5)" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-[1.1fr_1fr]">
          {/* ── Left: image gallery ── */}
          <div className="relative" style={{ minHeight: "320px" }}>
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${product.images[imgIdx]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "24px 0 0 24px",
                minHeight: "320px",
                transition: "background-image 0.4s",
              }}
            >
              {/* gradient overlay */}
              <div
                className="absolute inset-0 rounded-[24px_0_0_24px]"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 50%)" }}
              />
            </div>

            {/* Image nav */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
              <div className="flex gap-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className="transition-all duration-200"
                    style={{
                      width: imgIdx === i ? "22px" : "6px",
                      height: "6px",
                      borderRadius: "99px",
                      background: imgIdx === i ? "#fff" : "rgba(255,255,255,0.45)",
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {[prev, next].map((fn, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/90"
                    style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d={i === 0 ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: detail ── */}
          <div className="flex flex-col gap-5 p-6 md:p-7">
            {/* Category label */}
            <div>
              <span
                className="font-sans text-stone-500 uppercase tracking-[0.16em]"
                style={{ fontSize: "0.58rem" }}
              >
                {product.category} — {product.type}
              </span>
            </div>

            {/* Name + location */}
            <div>
              <h3
                className="font-serif text-stone-900 m-0 mb-1"
                style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}
              >
                {product.name}
              </h3>
              <p className="font-sans text-stone-500 m-0 flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 21s-8-6.686-8-12a8 8 0 1 1 16 0c0 5.314-8 12-8 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                {product.location}
              </p>
            </div>

            {/* Desc */}
            <p className="font-sans text-stone-600 m-0 leading-relaxed" style={{ fontSize: "0.85rem" }}>
              {product.desc}
            </p>

            {/* Materials */}
            <div>
              <p
                className="font-sans uppercase tracking-[0.14em] text-stone-400 mb-2 m-0"
                style={{ fontSize: "0.58rem" }}
              >
                Materials Used
              </p>
              <div className="flex flex-wrap gap-2">
                {product.materials.map(m => <Tag key={m}>{m}</Tag>)}
              </div>
            </div>

            {/* CTA card */}
            <div
              className="rounded-[16px] p-4 mt-auto"
              style={{ background: "rgba(168,213,200,0.18)", border: "1px solid rgba(168,213,200,0.4)" }}
            >
              <p
                className="font-sans text-[#2a7a6a] mb-1 flex items-center gap-1.5"
                style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
                Inspired by this?
              </p>
              <h4
                className="font-serif text-stone-900 m-0 mb-1.5"
                style={{ fontSize: "1.05rem", fontWeight: 400, lineHeight: 1.2 }}
              >
                Want something similar for your space?
              </h4>
              <p className="font-sans text-stone-500 m-0 mb-3" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                Share a few details and we'll come measure, sketch, and quote — tailored to your home or studio. No obligation.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Link
                  to="/contact"
                  onClick={handleClose}
                  className="inline-flex items-center gap-1.5 font-sans font-medium text-white no-underline transition-all duration-200 hover:scale-105"
                  style={{
                    fontSize: "0.78rem",
                    padding: "9px 18px",
                    borderRadius: "99px",
                    background: "#1c1917",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                  }}
                >
                  Get a quote
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  onClick={handleClose}
                  className="inline-flex items-center font-sans font-medium text-stone-700 no-underline transition-all duration-200 hover:text-stone-900"
                  style={{
                    fontSize: "0.78rem",
                    padding: "9px 18px",
                    borderRadius: "99px",
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(200,190,170,0.55)",
                  }}
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────
export default function OurProducts() {
  const [hovered, setHovered] = useState(0);
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(null);

  const sectionRef = useRef(null);
  const previewRef = useRef(null);
  const imgRefs = useRef([]);
  const rowRefs = useRef([]);
  const headingRef = useRef(null);
  const eyebrowRef = useRef(null);
  const descRef = useRef(null);
  const galleryLinkRef = useRef(null);

  // Cross-fade images on hover change
  useEffect(() => {
    imgRefs.current.forEach((img, i) => {
      if (!img) return;
      gsap.to(img, {
        opacity: i === hovered ? 1 : 0,
        duration: 0.55,
        ease: "power2.inOut",
      });
    });
  }, [hovered]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, descRef.current, galleryLinkRef.current].filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
            delay: i * 0.06,
          }
        );
      });

      gsap.fromTo(previewRef.current,
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden py-20 md:py-28"
        style={{ background: "#f0ede7" }}
      >
        {/* bg blobs */}
        <div aria-hidden="true" className="absolute pointer-events-none" style={{ top: "0%", left: "-5%", width: "38vw", height: "38vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,185,155,0.16) 0%,transparent 70%)" }} />
        <div aria-hidden="true" className="absolute pointer-events-none" style={{ bottom: "5%", right: "-4%", width: "32vw", height: "32vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(168,213,200,0.13) 0%,transparent 70%)" }} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8">

          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10 md:mb-14">
            <div>
              <div ref={eyebrowRef} className="opacity-0 flex items-center gap-3 mb-3">
                <span className="font-sans tracking-[0.18em] uppercase text-[#999999]" style={{ fontSize: "0.9rem",
                fontWeight: 800,
                color: "#6b6560",}}>Our Projects</span>                
              </div>

              <h2
                ref={headingRef}
                className="opacity-0 font-serif font-normal text-stone-900 m-0 mb-2"
                style={{ fontSize: "clamp(1.9rem,4vw,3.5rem)", lineHeight: 1.06, letterSpacing: "-0.025em" }}
              >
                Crafted for{" "}
                <em style={{ fontStyle: "italic", color: "#c8822a" }}>every space.</em>
              </h2>

              <p
                ref={descRef}
                className="opacity-0 font-sans text-stone-500 m-0 max-w-[420px] leading-relaxed"
                style={{ fontSize: "clamp(0.78rem,1.1vw,0.88rem)" }}
              >
                Hover an item to preview. Click any product to step inside — photos, materials and a quick way to ask for something similar.
              </p>
            </div>

            <Link
              ref={galleryLinkRef}
              to="/products"
              className="opacity-0 inline-flex items-center gap-1.5 font-sans text-sm text-stone-700 no-underline border-b border-[rgba(180,170,155,0.5)] pb-px transition-all duration-200 hover:text-stone-900 hover:border-stone-900 self-start md:self-auto mb-1 whitespace-nowrap"
            >
              Full gallery
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </div>

          {/* ── Two-col layout ── */}
          <div className="flex flex-col md:grid md:gap-8" style={{ gridTemplateColumns: "1.3fr 0.7fr", alignItems: "start" }}>

            {/* ── Left: product list ── */}
            <div className="flex flex-col" style={{ gap: "0" }}>
              {PRODUCTS.map((p, i) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  index={i}
                  isHovered={hovered === i}
                  isActive={active === i}
                  rowRef={(el) => (rowRefs.current[i] = el)}
                  onMouseEnter={() => { setHovered(i); setActive(i); }}
                  onClick={() => setModal(p)}
                />
              ))}
            </div>

            {/* ── Right: sticky preview (desktop only) ── */}
            <div
              className="hidden md:block"
              style={{ position: "sticky", top: "100px" }}
            >
              <div
                ref={previewRef}
                className="relative rounded-[22px] overflow-hidden opacity-0"
                style={{ aspectRatio: "5/6", background: "#d4c9b5", boxShadow: "0 20px 60px rgba(0,0,0,0.13)" }}
              >
                {/* Stacked images, cross-fade */}
                {PRODUCTS.map((p, i) => (
                  <div
                    key={p.id}
                    ref={(el) => (imgRefs.current[i] = el)}
                    className="absolute inset-0 transition-none"
                    style={{
                      backgroundImage: `url(${p.images[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: i === 0 ? 1 : 0,
                    }}
                  />
                ))}

                {/* Bottom overlay with product info */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(15,12,8,0.75) 0%, transparent 100%)", zIndex: 2 }}
                >
                  <p className="font-sans text-white/60 m-0 mb-0.5" style={{ fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {PRODUCTS[hovered].category} · {PRODUCTS[hovered].type}
                  </p>
                  <p className="font-serif text-white m-0 mb-1.5" style={{ fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.01em" }}>
                    {PRODUCTS[hovered].name}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRODUCTS[hovered].materials.slice(0, 2).map(m => (
                      <span
                        key={m}
                        className="font-sans text-white/80"
                        style={{ fontSize: "0.8rem", padding: "3px 10px", borderRadius: "99px", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Counter badge top-left */}
                <div
                  className="absolute top-4 left-4 z-10"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", borderRadius: "99px", padding: "4px 12px", border: "1px solid rgba(255,255,255,0.3)" }}
                >
                  <span className="font-sans text-white" style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                    {String(hovered + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Step inside button top-right */}
                <button
                  onClick={() => setModal(PRODUCTS[hovered])}
                  className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 font-sans font-medium text-stone-800 transition-all duration-200 hover:scale-105"
                  style={{ fontSize: "0.75rem", padding: "6px 14px", borderRadius: "99px", background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.9)", letterSpacing: "0.04em" }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                  Step inside
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal && <ProductModal product={modal} onClose={() => setModal(null)} />}
    </>
  );
}

// ─── Product Row ──────────────────────────────────────────────
function ProductRow({ product, index, isHovered, isActive, rowRef, onMouseEnter, onClick }) {
  const arrowRef = useRef(null);

  useEffect(() => {
    if (!arrowRef.current) return;
    gsap.to(arrowRef.current, {
      scale: isHovered ? 1.1 : 1,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [isHovered]);

  return (
    <div
      ref={rowRef}
      className="flex items-center gap-4 cursor-pointer transition-all duration-200 opacity-0"
      style={{
        padding: "14px 16px",
        borderRadius: "14px",
        background: isHovered ? "rgba(255,255,255,0.65)" : "transparent",
        boxShadow: isHovered ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
        borderBottom: "1px solid rgba(200,190,170,0.2)",
      }}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {/* Number */}
      <span
        className="font-sans text-stone-400 shrink-0 tabular-nums"
        style={{ fontSize: "0.6rem", letterSpacing: "0.1em", width: "18px" }}
      >
        {product.id}
      </span>

      {/* Thumbnail */}
      <div
        className="shrink-0 rounded-[10px] overflow-hidden transition-all duration-300"
        style={{
          width: isHovered ? "52px" : "44px",
          height: isHovered ? "52px" : "44px",
          backgroundImage: `url(${product.images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: isHovered ? "0 4px 14px rgba(0,0,0,0.14)" : "0 2px 6px rgba(0,0,0,0.08)",
        }}
      />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="font-serif text-stone-900 m-0 leading-tight truncate transition-all duration-200"
          style={{ fontSize: isHovered ? "1.25rem" : "1.1rem", fontWeight: 400, letterSpacing: "-0.01em" }}
        >
          {product.name}
        </p>
        <p
          className="font-sans text-stone-400 m-0 mt-0.5 uppercase tracking-[0.12em] truncate"
          style={{ fontSize: "0.65rem" }}
        >
          {product.location} · {product.category}
        </p>
      </div>

      {/* Arrow button */}
      <div
        ref={arrowRef}
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-250"
        style={{
          background: isHovered ? "#1c1917" : "transparent",
          border: isHovered ? "none" : "1px solid rgba(200,190,170,0.45)",
          color: isHovered ? "#fff" : "#9a9188",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d={isHovered ? "M5 12h14M12 5l7 7-7 7" : "M7 17L17 7M7 7h10v10"} />
        </svg>
      </div>
    </div>
  );
}