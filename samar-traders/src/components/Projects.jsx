import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

/* ─── Project Data ─── */
const PROJECTS = [
  {
    id: "01",
    name: "Hillcrest Villa",
    location: "Gomti Nagar, Lucknow",
    year: "2025",
    type: "Residential · Full home fit-out",
    brief:
      "A sprawling family villa wrapped in floor-to-ceiling uPVC sliding walls, anchored by a warm teak entry door cut from a single slab. Every opening frame-flush with the architecture.",
    materials: [
      { label: "uPVC Sliding Tracks", code: "M.01" },
      { label: "Teak hardwood entry", code: "M.02" },
      { label: "10mm toughened glass", code: "M.03" },
      { label: "Anodised hardware", code: "M.04" },
    ],
    images: ["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpeg"],
    accent: "#2a7a6a",
  },
  {
    id: "02",
    name: "Lakeside Apartments",
    location: "Hazratganj, Lucknow",
    year: "2025",
    type: "Multi-unit residential · 24 homes",
    brief:
      "Slim-profile casement windows across 24 apartments, each unit demanding a bespoke sizing run. Delivered in six weeks with zero rework on the site.",
    materials: [
      { label: "uPVC Casement frames", code: "M.01" },
      { label: "ROTO Germany hardware", code: "M.02" },
      { label: "EPDM triple gasket seal", code: "M.03" },
      { label: "SS mosquito mesh", code: "M.04" },
    ],
    images: ["/images/hero2.jpg", "/images/hero3.jpeg", "/images/hero1.jpg"],
    accent: "#a07840",
  },
  {
    id: "03",
    name: "Aster Café",
    location: "Indira Nagar, Lucknow",
    year: "2024",
    type: "Commercial · Café interior",
    brief:
      "A modular kitchen installation for a 40-cover café — L-shaped layout, full appliance integration, and a custom stone-topped island that doubles as a prep and pass counter.",
    materials: [
      { label: "Modular kitchen cabinetry", code: "M.01" },
      { label: "Quartz stone countertop", code: "M.02" },
      { label: "Soft-close drawer systems", code: "M.03" },
      { label: "Built-in appliance housing", code: "M.04" },
    ],
    images: ["/images/show1.JPG", "/images/show3.JPG", "/images/hero1.jpg"],
    accent: "#7a5c3a",
  },
  {
    id: "04",
    name: "Whitefield Office Park",
    location: "Aliganj, Lucknow",
    year: "2024",
    type: "Commercial · Office fit-out",
    brief:
      "Glass partition walls across three floors of a corporate office, with frameless pivot doors and acoustic seals engineered to hit 38dB reduction — verified post-install.",
    materials: [
      { label: "10mm toughened glass", code: "M.01" },
      { label: "Aluminium channels", code: "M.02" },
      { label: "Acoustic EPDM seals", code: "M.03" },
      { label: "Frameless pivot hinges", code: "M.04" },
    ],
    images: ["/images/show5.JPG", "/images/hero2.jpg", "/images/show7.JPG"],
    accent: "#3a5a7a",
  },
  {
    id: "05",
    name: "Coastal Retreat",
    location: "Vikas Nagar, Lucknow",
    year: "2024",
    type: "Residential · Wardrobe & Interior",
    brief:
      "Floor-to-ceiling sliding wardrobes across four bedrooms — mirror panels, internal LED strips and a walk-in configured around the client's existing furniture footprint.",
    materials: [
      { label: "Mirror sliding panels", code: "M.01" },
      { label: "Soft-close track system", code: "M.02" },
      { label: "Internal LED lighting", code: "M.03" },
      { label: "Velvet-lined drawer inserts", code: "M.04" },
    ],
    images: ["/images/wardrobe.jpg", "/images/interior.jpg", "/images/show4.JPG"],
    accent: "#6b4c6e",
  },
  {
    id: "06",
    name: "Banyan Boutique Hotel",
    location: "Gomti Nagar Ext., Lucknow",
    year: "2025",
    type: "Hospitality · Full interior",
    brief:
      "Complete interior design for a 18-room boutique property — uPVC French doors to private balconies, modular joinery in every room, and a bespoke lobby reception counter.",
    materials: [
      { label: "uPVC French doors", code: "M.01" },
      { label: "Modular room joinery", code: "M.02" },
      { label: "Solid teak reception desk", code: "M.03" },
      { label: "Decorative glass partitions", code: "M.04" },
    ],
    images: ["/images/interior2.png", "/images/show6.JPG", "/images/hero3.jpeg"],
    accent: "#8a4a3a",
  },
];

/* ─── Utilities ─── */
function Eyebrow({ children, color = "#6b6560" }) {
  return (
    <span
      className="font-sans font-extrabold uppercase"
      style={{ fontSize: "0.58rem", letterSpacing: "0.28em", color }}
    >
      {children}
    </span>
  );
}

/* ─── Sticky Index Sidebar ─── */
function IndexSidebar({ activeIndex, onSelect }) {
  return (
    <aside
      className="hidden lg:flex flex-col gap-0 sticky top-24 h-fit"
      style={{ width: "200px", flexShrink: 0 }}
    >
      <Eyebrow>Index</Eyebrow>

      <div className="mt-4 flex flex-col gap-0">
        {PROJECTS.map((p, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(i)}
              className="group flex items-center gap-3 py-2.5 text-left transition-all duration-100"
            >
              <span
                className="font-sans tabular-nums transition-colors duration-100"
                style={{ fontSize: "0.56rem", color: isActive ? "#1c1917" : "#b8b0a8", letterSpacing: "0.08em" }}
              >
                {p.id}
              </span>
              <span
                className="transition-all duration-200"
                style={{
                  display: "inline-block",
                  height: "1px",
                  width: isActive ? "28px" : "14px",
                  background: isActive ? "#1c1917" : "#c8b99a",
                }}
              />
              <span
                className="font-sans transition-colors duration-100"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#1c1917" : "#78716c",
                  letterSpacing: "-0.01em",
                }}
              >
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 border-t border-[rgba(180,170,155,0.3)] pt-6">
        <BriefUsButton />
      </div>
    </aside>
  );
}

/* ─── Brief Us CTA ─── */
function BriefUsButton() {
  const { open } = useQuoteModal();
  return (
    <button
      onClick={open}
      className="group inline-flex items-center gap-2 font-sans font-semibold text-stone-700 transition-colors duration-200 hover:text-stone-900"
      style={{ fontSize: "0.78rem", letterSpacing: "0.04em" }}
    >
      BRIEF US
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path d="M7 17L17 7M7 7h10v10" />
      </svg>
    </button>
  );
}

/* ─── Single Project Dossier ─── */
function ProjectDossier({ project, sectionRef }) {
  const { open } = useQuoteModal();
  const [mainImg, setMainImg] = useState(0);
  const imgRefs = useRef([]);
  const frameRef = useRef(null);

  // cross-fade images
  useEffect(() => {
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: i === mainImg ? 1 : 0, duration: 0.5, ease: "power2.inOut" });
    });
  }, [mainImg]);

  // scroll reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".dossier-reveal"),
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <article ref={sectionRef} className="pt-24 first:pt-0">
      {/* ── Project header ── */}
      <div
        className="dossier-reveal opacity-0 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-0 pb-4 border-b"
        style={{ borderColor: "rgba(180,170,155,0.35)" }}
      >
        <span
          className="font-sans text-stone-400 shrink-0"
          style={{ fontSize: "0.62rem", letterSpacing: "0.14em", width: "72px" }}
        >
          N° {project.id}
        </span>

        <h2
          className="flex-1 font-serif font-normal text-stone-900 m-0 leading-none tracking-[-0.03em]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
        >
          {project.name}
        </h2>

        <div className="flex flex-col items-end gap-1 shrink-0 md:pl-8">
          <div className="flex items-center gap-1.5 text-stone-500" style={{ fontSize: "0.72rem" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 21s-8-6.686-8-12a8 8 0 1 1 16 0c0 5.314-8 12-8 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="font-sans">{project.location}</span>
          </div>
          <span className="font-sans text-stone-400" style={{ fontSize: "0.62rem", letterSpacing: "0.06em" }}>
            {project.type}
          </span>
          <span
            className="font-serif italic"
            style={{ fontSize: "0.95rem", color: project.accent }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* ── Image grid ── */}
      <div className="dossier-reveal opacity-0 mt-5 grid gap-3" style={{ gridTemplateColumns: "1fr 0.62fr" }}>

        {/* Main hero image */}
        <div
          className="relative overflow-hidden rounded-[18px] cursor-pointer group"
          style={{ aspectRatio: "4/3" }}
        >
          {project.images.map((src, i) => (
            <div
              key={src}
              ref={(el) => (imgRefs.current[i] = el)}
              className="absolute inset-0 bg-cover bg-center transition-none"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === 0 ? 1 : 0,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-white/8 rounded-[18px]" />

          {/* Frame label */}
          <div
            className="absolute top-4 left-4 rounded-full border border-white/40 bg-white/20 px-3 py-1.5 backdrop-blur-xl"
            style={{ fontSize: "0.52rem", letterSpacing: "0.2em", color: "white", fontWeight: 600, fontFamily: "sans-serif", textTransform: "uppercase" }}
          >
            Frame {String(mainImg + 1).padStart(2, "0")} · Hero
          </div>

          {/* Image dots */}
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setMainImg(i)}
                className="transition-all duration-300"
                style={{
                  width: mainImg === i ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "99px",
                  background: mainImg === i ? "white" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right column: 2 stacked thumbnails */}
        <div className="flex flex-col gap-3">
          {project.images.slice(1, 3).map((src, i) => (
            <div
              key={src}
              onClick={() => setMainImg(i + 1)}
              className="relative overflow-hidden rounded-[18px] cursor-pointer group flex-1"
              style={{ minHeight: "100px" }}
            >
              <img
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors duration-300 rounded-[18px]" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Brief + Materials ── */}
      <div className="dossier-reveal opacity-0 mt-6 grid md:grid-cols-[1fr_0.85fr] gap-8 md:gap-16">

        {/* Brief */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Eyebrow color="#9a9188">Brief</Eyebrow>
          </div>
          <p
            className="font-sans text-stone-600 leading-relaxed m-0"
            style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: 1.75 }}
          >
            {project.brief}
          </p>
        </div>

        {/* Materials specified */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9a9188" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            <Eyebrow color="#9a9188">Materials Specified</Eyebrow>
          </div>

          <div className="flex flex-col gap-0">
            {project.materials.map((m, i, arr) => (
              <div
                key={m.code}
                className="flex items-center justify-between py-2.5 transition-colors duration-150 hover:bg-[rgba(200,185,155,0.07)] -mx-2 px-2 rounded-lg"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(180,170,155,0.2)" : "none" }}
              >
                <span className="font-sans text-stone-700" style={{ fontSize: "0.84rem" }}>
                  {m.label}
                </span>
                <span
                  className="font-sans text-stone-400 tabular-nums"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.1em" }}
                >
                  {m.code}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={open}
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 font-sans font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-stone-800"
              style={{ fontSize: "0.78rem" }}
            >
              Enquire about this
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </button>

            <button
              onClick={open}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(180,170,155,0.5)] bg-white/60 px-5 py-2.5 font-sans font-semibold text-stone-600 backdrop-blur-xl transition-all duration-200 hover:bg-white/80 hover:text-stone-900"
              style={{ fontSize: "0.78rem" }}
            >
              Specs &amp; finishes
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Hero header ─── */
function PageHeader() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-hero-el",
        { opacity: 0, y: 22, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.09, ease: "expo.out", delay: 0.05 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden pb-12 pt-28 md:pt-32"
      style={{ background: "linear-gradient(180deg, #f8f5ef 0%, #f5f2eb 100%)" }}
    >
      {/* Warm glow */}
      <div
        className="pointer-events-none absolute -top-20 right-[15%] h-[380px] w-[380px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.2) 0%, transparent 70%)" }}
      />
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(#1c1917 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">

        {/* Meta strip */}
        <div
          className="proj-hero-el opacity-0 mb-10 flex flex-wrap items-center gap-6"
          style={{ borderBottom: "1px solid rgba(180,170,155,0.3)", paddingBottom: "16px" }}
        >
          <div>
            <p className="m-0 font-sans text-stone-400" style={{ fontSize: "0.52rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>The Archive</p>
            <p className="m-0 font-sans font-semibold text-stone-600" style={{ fontSize: "0.68rem", letterSpacing: "0.08em" }}>
              Vol. 1 · 2025
            </p>
          </div>

          {[
            `${PROJECTS.length} Dossiers`,
            "2 Cities",
            "Photo · 2024 → 2025",
            "Click any project to enquire",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="h-px w-10 bg-[rgba(180,170,155,0.5)]" />
              <span
                className="font-sans font-semibold uppercase text-stone-400"
                style={{ fontSize: "0.55rem", letterSpacing: "0.18em" }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Main heading */}
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <h1
              className="proj-hero-el opacity-0 m-0 font-serif font-normal text-stone-900 leading-[0.96] tracking-[-0.04em]"
              style={{ fontSize: "clamp(3rem, 7.5vw, 6.5rem)" }}
            >
              An archive of openings
              <br />
              <em
                className="italic"
                style={{ color: "#78716c" }}
              >
                — with footage.
              </em>
            </h1>

            <p
              className="proj-hero-el opacity-0 mt-6 font-sans text-stone-500 leading-relaxed"
              style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)", maxWidth: "480px" }}
            >
              Every dossier below carries the location, the material list, and a short walkthrough.
              Scroll through. Pause anywhere.
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="proj-hero-el opacity-0 flex items-center gap-2 mt-2 self-start">
            <Link to="/" className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-stone-400 no-underline hover:text-stone-700 transition-colors">Home</Link>
            <span className="text-stone-300">›</span>
            <span className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#a07840]">Projects</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Main Page ─── */
export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef(PROJECTS.map(() => ({ current: null })));
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update active index based on scroll position
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.25 }
      );
      obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const scrollToProject = (i) => {
    sectionRefs.current[i]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#f5f2eb" }}>
      <PageHeader />

      {/* ── Body ── */}
      <div
        ref={containerRef}
        className="max-w-10xl px-6 md:px-12 py-16 md:py-20 flex gap-12 lg:gap-16"
      >
        {/* Sticky sidebar */}
        <IndexSidebar activeIndex={activeIndex} onSelect={scrollToProject} />

        {/* Dossiers column */}
        <div className="flex-1 min-w-0 flex flex-col divide-y"
          style={{ divideColor: "rgba(180,170,155,0.3)" }}>
          {PROJECTS.map((project, i) => {
            // ensure each ref object exists
            if (!sectionRefs.current[i]) {
              sectionRefs.current[i] = { current: null };
            }
            return (
              <div
                key={project.id}
                ref={(el) => { sectionRefs.current[i].current = el; }}
                style={{ scrollMarginTop: "100px" }}
              >
                <ProjectDossier
                  project={project}
                  sectionRef={{ current: sectionRefs.current[i].current }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <BottomCTA />
    </div>
  );
}

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
    <footer
      ref={ref}
      className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28"
      style={{ background: "linear-gradient(180deg, #1c1714 0%, #241e18 100%)" }}
    >
      {/* Warm glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="h-[500px] w-[500px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(200,169,110,0.14) 0%, transparent 70%)" }}
        />
      </div>
      {/* Warm grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[900px] text-center">
        <div className="bottom-cta-el opacity-0 mb-5 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c8b99a]/50" />
          <Eyebrow color="#c8b99a">Start a project</Eyebrow>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c8b99a]/50" />
        </div>

        <h2
          className="bottom-cta-el opacity-0 m-0 font-serif font-normal text-white leading-[0.96] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
        >
          Your project could be<br />
          <em
            className="bg-gradient-to-r from-[#c8a96e] via-[#e0c890] to-[#9ecfbf] bg-clip-text italic text-transparent"
          >
            dossier 07.
          </em>
        </h2>

        <p
          className="bottom-cta-el opacity-0 mt-5 mb-10 font-sans text-white/45 leading-relaxed max-w-[480px] mx-auto"
          style={{ fontSize: "0.92rem" }}
        >
          Tell us your brief. We visit, measure, and produce a detailed quote — no obligations, no pressure.
        </p>

        <div className="bottom-cta-el opacity-0 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={open}
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-sans font-semibold text-stone-900 transition-all duration-200 hover:scale-[1.04]"
            style={{
              background: "linear-gradient(135deg, #c8a96e 0%, #a07840 100%)",
              boxShadow: "0 12px 40px rgba(200,169,110,0.3)",
              fontSize: "0.85rem",
            }}
          >
            Brief Us
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 font-sans font-semibold text-white/70 no-underline backdrop-blur-xl transition-all duration-200 hover:bg-white/8 hover:text-white"
            style={{ borderColor: "rgba(200,185,155,0.25)", fontSize: "0.85rem" }}
          >
            Or talk to us
          </Link>
        </div>
      </div>
    </footer>
  );
}