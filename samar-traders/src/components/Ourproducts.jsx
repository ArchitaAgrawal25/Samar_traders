import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";
gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: "01",
    name: "Modular Kitchens",
    location: "Group Centre | CRPF Camp | Lucknow",
    desc: "Ongoing execution of 600 modular kitchens designed for efficient space utilization, durability, and long-term residential use across the CRPF campus.",
    materials: [
      "Modular plywood cabinetry",
      "Premium laminate finishes",
    ],
    images: [
      "/images/pr5-1.webp",
      "/images/pr5-2.jpeg",
    ],
  },
  {
    id: "02",
    name: "uPVC Windows",
    location: "The Magnolia | Marriage Lawn | Faizabad Road | Lucknow",
    desc: "Installed 50+ advanced uPVC window units featuring toughened glass, and precision weather-sealing to improve ventilation, durability, and overall comfort at the venue.",
    materials: ["uPVC frames", "Toughened glass"],
    images: ["/images/pr1-1.jpg", "/images/pr1-5.webp", "/images/pr1-2.jpg", "/images/pr1-3.jpg", "/images/pr1-4.jpg"],
  },
  {
    id: "03",
    name: "uPVC Doors & Windows",
    location: "St. Stephans Academy | General education school | Lucknow",
    desc: "30 High-performance uPVC door and window systems installed across the campus, offering excellent insulation, noise reduction, and smooth operational functionality.",
    materials: ["uPVC profiles", "Toughened glass"],
    images: ["/images/pr2-5.png", "/images/pr2-7.jpg", "/images/pr2-2.jpg", "/images/pr2-6.png", "/images/pr2-4.jpg"],
  },
  {
    id: "04",
    name: "uPVC Windows",
    location: "NABARD | Training Center | Lucknow",
    desc: "High-efficiency uPVC windows installed at the premises, offering improved insulation, noise control, and durable weather-sealed performance.",
    materials: ["uPVC profiles", "Toughened glass", "Premium hardware"],
    images: ["/images/pr3-2.avif", "/images/pr3-1.jpg"],
  },
  {
    id: "05",
    name: "uPVC Doors",
    location: "Deva Memorial Orthopaedics and eye hospital | Faizabad",
    desc: "High-performance uPVC doors with toughened glass panels, precision hardware, and weather-sealed frames for reliable strength, insulation, and smooth operation.",
    materials: ["uPVC profiles", "Toughened glass", "Premium hardware"],
    images: ["/images/pr4-1.png", "/images/pr4-4.webp", "/images/pr4-2.png", "/images/pr4-3.png"],
  },
];

// ─── tiny helpers ────────────────────────────────────────────
function Tag({ children }) {
  return (
    <span className="inline-block rounded-full border border-[rgba(200,190,170,0.5)] bg-white/70 px-3 py-1 font-sans text-[0.68rem] tracking-[0.02em] text-stone-700">
      {children}
    </span>
  );
}

// ─── Modal ────────────────────────────────────────────────────
function ProductModal({ product, onClose }) {
  const { open } = useQuoteModal();
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

  const handleOverlayClick = (e) => { if (e.target === overlayRef.current) handleClose(); };

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
        className="relative w-full max-w-[880px] max-h-[90vh] overflow-y-auto rounded-[24px] bg-[#f8f6f1]"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(200,190,170,0.5)] bg-white/80 transition-all duration-200 hover:bg-stone-200"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-[1.1fr_1fr]">
          {/* ── Left: image gallery ── */}
          <div className="relative min-h-[260px]">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${product.images[imgIdx]})`,
                borderRadius: "24px 24px 0 0",
                transition: "background-image 0.4s",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  borderRadius: "24px 24px 0 0",
                  background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 50%)",
                }}
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
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-white/90"
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
            {/* Name + location */}
            <div>
              <h3
                className="m-0 mb-1 font-serif font-normal leading-[1.1] tracking-[-0.02em] text-stone-900"
                style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}
              >
                {product.name}
              </h3>
              <p className="m-0 flex items-center gap-1 font-sans text-[0.75rem] text-stone-500">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 21s-8-6.686-8-12a8 8 0 1 1 16 0c0 5.314-8 12-8 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                {product.location}
              </p>
            </div>

            {/* Desc */}
            <p className="m-0 font-sans text-[0.85rem] leading-relaxed text-stone-600">
              {product.desc}
            </p>

            {/* Materials */}
            <div>
              <p className="m-0 mb-2 font-sans text-[0.58rem] uppercase tracking-[0.14em] text-stone-400">
                Materials Used
              </p>
              <div className="flex flex-wrap gap-2">
                {product.materials.map(m => <Tag key={m}>{m}</Tag>)}
              </div>
            </div>

            {/* CTA card */}
            <div className="mt-auto rounded-[16px] border border-[rgba(168,213,200,0.4)] p-4" style={{ background: "rgba(168,213,200,0.18)" }}>
              <p className="mb-1 flex items-center gap-1.5 font-sans text-[0.6rem] uppercase tracking-[0.1em] text-[#2a7a6a]">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
                Inspired by this?
              </p>
              <h4 className="m-0 mb-1.5 font-serif font-normal leading-[1.2] text-stone-900" style={{ fontSize: "1.05rem" }}>
                Want something similar for your space?
              </h4>
              <p className="m-0 mb-3 font-sans text-[0.75rem] leading-[1.5] text-stone-500">
                Share a few details and we'll come measure, sketch, and quote — tailored to your home or studio. No obligation.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { handleClose(); setTimeout(open, 250); }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#1c1917] px-[18px] py-[9px] font-sans text-[0.78rem] font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all duration-200 hover:scale-105"
                >
                  Get a quote
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <Link
                  to="/contact"
                  onClick={handleClose}
                  className="inline-flex items-center rounded-full border border-[rgba(200,190,170,0.55)] bg-white/70 px-[18px] py-[9px] font-sans text-[0.78rem] font-medium text-stone-700 no-underline transition-all duration-200 hover:text-stone-900"
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
        className="relative w-full overflow-hidden bg-[#f0ede7] py-20 md:py-28"
      >
        {/* bg blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{ top: "0%", left: "-5%", width: "38vw", height: "38vw", background: "radial-gradient(circle,rgba(200,185,155,0.16) 0%,transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{ bottom: "5%", right: "-4%", width: "32vw", height: "32vw", background: "radial-gradient(circle,rgba(168,213,200,0.13) 0%,transparent 70%)" }}
        />

        <div className="relative z-10 mx-2 max-w-[100%] px-1 md:mx-32 md:px-10">

          {/* ── Header ── */}
          <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <div ref={eyebrowRef} className="mb-3 flex items-center gap-3 opacity-0">
                <span
                  className="font-sans uppercase tracking-[0.18em] text-[#6b6560]"
                  style={{ fontSize: "0.9rem", fontWeight: 800 }}
                >
                  Our Projects
                </span>
              </div>

              <h2
                ref={headingRef}
                className="m-0 mb-2 font-serif font-normal leading-[1.06] tracking-[-0.025em] text-stone-900 opacity-0"
                style={{ fontSize: "clamp(1.9rem,4vw,3.5rem)" }}
              >
                Crafted for{" "}
                <em style={{ fontStyle: "italic", color: "#c8822a" }}>every space.</em>
              </h2>

              <p
                ref={descRef}
                className="m-0 font-sans leading-relaxed text-stone-500 opacity-0"
                style={{ fontSize: "clamp(0.78rem,1.1vw,0.88rem)" }}
              >
                Hover an item to preview. Click any product to step inside — photos, materials and a quick way to ask for something similar.
              </p>
            </div>

            <Link
              ref={galleryLinkRef}
              to="/projects"
              className="mb-1 inline-flex items-center gap-1.5 self-start whitespace-nowrap border-b border-[rgba(180,170,155,0.5)] pb-px font-sans text-sm text-stone-700 no-underline opacity-0 transition-all duration-200 hover:border-stone-900 hover:text-stone-900 md:self-auto"
            >
              Full gallery
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </div>

          {/* ── Two-col layout ── */}
          <div className="flex flex-col md:grid md:items-start md:gap-8" style={{ gridTemplateColumns: "1.3fr 0.7fr" }}>

            {/* ── Left: product list ── */}
            <div className="flex flex-col">
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
            <div className="sticky top-[100px] hidden md:block">
              <div
                ref={previewRef}
                className="relative overflow-hidden rounded-[22px] opacity-0"
                style={{
                  aspectRatio: "9/10",
                  background: "#d4c9b5",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.13)",
                }}
              >
                {/* Stacked images, cross-fade */}
                {PRODUCTS.map((p, i) => (
                  <div
                    key={p.id}
                    ref={(el) => (imgRefs.current[i] = el)}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${p.images[0]})`,
                      opacity: i === 0 ? 1 : 0,
                    }}
                  />
                ))}

                {/* Bottom overlay with product info */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-[2] p-5"
                  style={{ background: "linear-gradient(to top, rgba(15,12,8,0.75) 0%, transparent 100%)" }}
                >
                  <p
                    className="m-0 mb-1.5 font-serif font-normal leading-tight tracking-[-0.01em] text-white"
                    style={{ fontSize: "1.5rem" }}
                  >
                    {PRODUCTS[hovered].name}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRODUCTS[hovered].materials.slice(0, 2).map(m => (
                      <span
                        key={m}
                        className="rounded-full border border-[rgba(255,255,255,0.25)] bg-white/[0.18] px-[10px] py-[3px] font-sans text-[0.8rem] tracking-[0.04em] text-white/80"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Counter badge top-left */}
                <div
                  className="absolute left-4 top-4 z-10 rounded-full border border-[rgba(255,255,255,0.3)] px-3 py-1"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)" }}
                >
                  <span className="font-sans text-[0.6rem] tracking-[0.1em] text-white">
                    {String(hovered + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Step inside button top-right */}
                <button
                  onClick={() => setModal(PRODUCTS[hovered])}
                  className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.9)] bg-white/[0.82] px-[14px] py-[6px] font-sans text-[0.75rem] font-medium tracking-[0.04em] text-stone-800 transition-all duration-200 hover:scale-105"
                  style={{ backdropFilter: "blur(10px)" }}
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
      className="flex cursor-pointer items-center gap-0.5 opacity-0 transition-all duration-200 md:gap-4"
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
      <span className="hidden w-[18px] shrink-0 font-sans tabular-nums text-stone-400 md:inline-block" style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}>
        {product.id}
      </span>

      {/* Thumbnail */}
      <div
        className="shrink-0 overflow-hidden rounded-[10px] bg-cover bg-center transition-all duration-300"
        style={{
          width: isHovered ? "52px" : "44px",
          height: isHovered ? "52px" : "44px",
          backgroundImage: `url(${product.images[0]})`,
          boxShadow: isHovered ? "0 4px 14px rgba(0,0,0,0.14)" : "0 2px 6px rgba(0,0,0,0.08)",
        }}
      />

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className="m-0 truncate font-serif font-normal leading-tight tracking-[-0.01em] text-stone-900 transition-all duration-200"
          style={{ fontSize: isHovered ? "1.25rem" : "1.1rem" }}
        >
          {product.location}
        </p>
        <p className="m-0 mt-0.5 truncate font-sans uppercase tracking-[0.12em] text-stone-700" style={{ fontSize: "0.65rem" }}>
          {product.name}
        </p>
      </div>

      {/* Arrow button */}
      <div
        ref={arrowRef}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-[250ms]"
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