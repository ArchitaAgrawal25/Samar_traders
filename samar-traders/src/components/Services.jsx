import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    slug: "upvc",
    category: "Windows & Doors",
    name: "uPVC Doors & Windows",
    tagline: "Built for every season.",
    desc: "Premium sliding, casement, tilt-turn and French-style uPVC solutions engineered for Indian climates. Multi-chamber profiles reduce heat, block noise and resist rust, termites and weathering — all with zero maintenance.",
    highlights: [
      "Sliding, Casement, Tilt-Turn, French styles",
      "Multi-chamber thermal insulation",
      "German ROTO hardware fittings",
      "UV-stabilised, termite & rust proof",
      "Custom sizes for any opening",
      "10+ year durability guarantee",
    ],
    accent: "#2a7a6a",
    accentBg: "rgba(168,213,200,0.15)",
    accentBorder: "rgba(168,213,200,0.4)",
    tag: "Most popular",
    image: "/images/hero1.jpg",
  },
  {
    id: "02",
    slug: "kitchen",
    category: "Modular Kitchen",
    name: "Modular Kitchen Solutions",
    tagline: "Your kitchen, your way.",
    desc: "Fully customised modular kitchens designed around your cooking style, space and taste. From layout planning to final installation — smart cabinets, premium accessories and a finish that lasts decades.",
    highlights: [
      "Parallel, L-shape, U-shape & island layouts",
      "Soft-close hinges and drawer systems",
      "High-gloss, matte & wood-finish shutters",
      "Quartz, granite & laminate countertops",
      "Built-in appliance integration",
      "In-home design consultation included",
    ],
    accent: "#c8822a",
    accentBg: "rgba(252,220,170,0.15)",
    accentBorder: "rgba(252,220,170,0.4)",
    tag: "Custom design",
    image: "/images/hero2.jpg",
  },
  {
    id: "03",
    slug: "wardrobe",
    category: "Wardrobes",
    name: "Custom Wardrobes",
    tagline: "Maximum storage, minimal clutter.",
    desc: "Sliding, hinged and walk-in wardrobes crafted to make every inch count. Designed to match your room's aesthetic — from minimal whites to rich wood finishes — with interiors tailored to exactly how you organise.",
    highlights: [
      "Sliding, hinged & walk-in configurations",
      "Full-height, floor-to-ceiling designs",
      "Soft-close track systems",
      "Internal fittings: drawers, shelves, rails",
      "Mirror, glass & frosted panel options",
      "Fits any room size or shape",
    ],
    accent: "#6a5acd",
    accentBg: "rgba(220,210,255,0.15)",
    accentBorder: "rgba(220,210,255,0.4)",
    tag: "Space optimised",
    image: "/images/hero3.jpeg",
  },
  {
    id: "04",
    slug: "residential-interior",
    category: "Interior Design",
    name: "Residential Interior Design",
    tagline: "Spaces that feel like home.",
    desc: "Complete home interior solutions — from concept to completion. We design living rooms, bedrooms, dining areas and more with a focus on functionality, natural light and your personal style.",
    highlights: [
      "Living room, bedroom & dining design",
      "False ceiling and lighting planning",
      "Flooring, wall finishes & wallpapers",
      "Furniture selection & space planning",
      "3D visualization before execution",
      "End-to-end project management",
    ],
    accent: "#2a7a6a",
    accentBg: "rgba(168,213,200,0.15)",
    accentBorder: "rgba(168,213,200,0.4)",
    tag: "Full home",
    image: "/images/hero1.jpg",
  },
  {
    id: "05",
    slug: "commercial-interior",
    category: "Interior Design",
    name: "Commercial Interior Design",
    tagline: "Workspaces that work harder.",
    desc: "Professional interior design for offices, showrooms, clinics and retail spaces. We create environments that reflect your brand, impress your clients and improve how your team works every day.",
    highlights: [
      "Office, showroom & retail design",
      "Brand-aligned colour and material palettes",
      "Reception, workstation & cabin planning",
      "Glass partitions and acoustic panels",
      "Signage and wayfinding integration",
      "Turnkey delivery with minimal disruption",
    ],
    accent: "#c8822a",
    accentBg: "rgba(252,220,170,0.15)",
    accentBorder: "rgba(252,220,170,0.4)",
    tag: "Commercial",
    image: "/images/hero2.jpg",
  },
  {
    id: "06",
    slug: "space-planning",
    category: "Furniture & Planning",
    name: "Furniture & Space Planning",
    tagline: "Every square foot, optimised.",
    desc: "Smart furniture layout and space optimisation for homes, apartments and offices. We analyse your space, understand how you live or work, and design a plan that eliminates wasted area.",
    highlights: [
      "Room-by-room space analysis",
      "Custom furniture sizing and placement",
      "Traffic flow and ergonomics planning",
      "Multi-functional and convertible furniture",
      "Storage maximisation strategies",
      "Works with existing furniture too",
    ],
    accent: "#2f6f6a",
    accentBg: "rgba(168,213,200,0.12)",
    accentBorder: "rgba(168,213,200,0.35)",
    tag: "Smart planning",
    image: "/images/hero3.jpeg",
  },
];

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const { open } = useQuoteModal();

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "expo.out",
        delay: (index % 2) * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-[28px] border opacity-0"
      style={{
        background: service.accentBg,
        borderColor: service.accentBorder,
        boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
      }}
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Tag */}
        <div
          className="absolute left-4 top-4 rounded-full px-3 py-1 font-sans text-[0.58rem] font-bold uppercase tracking-[0.16em]"
          style={{
            background: "rgba(255,255,255,0.92)",
            color: service.accent,
            backdropFilter: "blur(8px)",
          }}
        >
          {service.tag}
        </div>

        {/* ID */}
        <span
          className="absolute bottom-4 right-5 font-serif italic text-white/50"
          style={{ fontSize: "3rem", lineHeight: 1 }}
        >
          {service.id}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <p
          className="mb-1 font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em]"
          style={{ color: service.accent }}
        >
          {service.category}
        </p>

        <h3
          className="mb-1 font-serif font-normal text-stone-900"
          style={{ fontSize: "clamp(1.3rem,2vw,1.6rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          {service.name}
        </h3>

        <p className="mb-4 font-serif italic text-stone-500" style={{ fontSize: "0.9rem" }}>
          {service.tagline}
        </p>

        <p className="mb-5 font-sans leading-relaxed text-stone-600" style={{ fontSize: "0.82rem" }}>
          {service.desc}
        </p>

        {/* Highlights */}
        <ul className="mb-6 space-y-2">
          {service.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span
                className="mt-[3px] h-[6px] w-[6px] shrink-0 rounded-full"
                style={{ background: service.accent }}
              />
              <span className="font-sans text-stone-700" style={{ fontSize: "0.78rem" }}>
                {h}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex gap-2">
          <button
            onClick={open}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full py-3 font-sans text-[0.8rem] font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:opacity-90"
            style={{ background: service.accent }}
          >
            Get a Quote
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border px-4 py-3 font-sans text-[0.8rem] font-semibold text-stone-700 no-underline transition-all duration-200 hover:bg-white/60"
            style={{ borderColor: "rgba(200,190,170,0.5)" }}
          >
            Ask us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { open } = useQuoteModal();

  const categories = ["All", "Windows & Doors", "Modular Kitchen", "Wardrobes", "Interior Design", "Furniture & Planning"];

  const filtered = activeCategory === "All"
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-hero-word",
        { opacity: 0, yPercent: 80, filter: "blur(6px)" },
        {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.1,
        }
      );

      gsap.fromTo(
        ".services-hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.7 }
      );

      gsap.fromTo(
        ".services-filter-btn",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.9,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#f5f3ee]">

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden px-5 pb-16 pt-36 md:px-16 md:pt-44"
      >
        {/* bg blobs */}
        <div className="pointer-events-none absolute -right-[10%] -top-[10%] h-[50vw] w-[50vw] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(168,213,200,0.2) 0%,transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-[5%] -left-[8%] h-[40vw] w-[40vw] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(252,220,170,0.18) 0%,transparent 70%)" }} />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Eyebrow */}
          <div className="services-hero-sub mb-4 flex items-center gap-3 opacity-0">
            <span className="h-px w-8 bg-[#c8b99a]" />
            <span className="font-sans text-[0.75rem] font-extrabold uppercase tracking-[0.22em] text-[#6b6560]">
              What we offer
            </span>
          </div>

          {/* Heading */}
          <h1
            className="mb-6 font-serif font-normal text-stone-900"
            style={{ fontSize: "clamp(2.8rem,7vw,6rem)", lineHeight: 1.0, letterSpacing: "-0.03em", maxWidth: "900px" }}
          >
            {"Our Services".split(" ").map((word, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                <span className="services-hero-word" style={{ display: "inline-block" }}>
                  {word}
                </span>
              </span>
            ))}
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
              <em className="services-hero-word italic text-[#2a7a6a]" style={{ display: "inline-block" }}>
                &amp; Solutions.
              </em>
            </span>
          </h1>

          {/* Sub */}
          <p
            className="services-hero-sub mb-10 max-w-[560px] font-sans leading-relaxed text-stone-500 opacity-0"
            style={{ fontSize: "clamp(0.9rem,1.2vw,1.05rem)" }}
          >
            From uPVC windows to complete home interiors — every service is delivered
            in-house, on time, and tailored exactly to your space and budget.
          </p>

          {/* Stats row */}
          <div className="services-hero-sub mb-12 flex flex-wrap gap-8 opacity-0">
            {[
              { val: "500+", label: "Projects done" },
              { val: "10+", label: "Years experience" },
              { val: "6", label: "Core services" },
              { val: "100%", label: "In-house team" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-[2rem] font-semibold leading-none text-stone-900" style={{ letterSpacing: "-0.03em" }}>
                  {s.val}
                </p>
                <p className="mt-1 font-sans text-[0.62rem] uppercase tracking-[0.12em] text-stone-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="services-filter-btn rounded-full px-4 py-2 font-sans text-[0.75rem] font-semibold opacity-0 transition-all duration-200"
                style={{
                  background: activeCategory === cat ? "#1c1917" : "rgba(255,255,255,0.7)",
                  color: activeCategory === cat ? "#fff" : "#57534e",
                  border: activeCategory === cat ? "none" : "1px solid rgba(200,190,170,0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES GRID ── */}
      <div className="px-5 pb-20 md:px-16">
        <div className="mx-auto max-w-7xl">

          {/* Count */}
          <p className="mb-8 font-sans text-[0.7rem] uppercase tracking-[0.12em] text-stone-400">
            Showing {filtered.length} service{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div
        className="mx-5 mb-16 overflow-hidden rounded-[32px] px-8 py-14 md:mx-16 md:px-16"
        style={{
          background: "linear-gradient(135deg,#1a1714 0%,#2a2420 50%,#1c1917 100%)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-sans text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#c8b99a]">
            Not sure where to start?
          </p>
          <h2
            className="mb-5 font-serif font-normal text-white"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.08 }}
          >
            Tell us your space.{" "}
            <em className="italic text-[#d6b58a]">We'll handle the rest.</em>
          </h2>
          <p className="mb-8 font-sans leading-relaxed text-white/60" style={{ fontSize: "0.9rem" }}>
            Book a free consultation — we'll visit, measure, and give you a detailed
            quote with no pressure and no obligation.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={open}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-sans text-[0.88rem] font-semibold text-white transition-all duration-200 hover:scale-[1.04]"
              style={{ background: "linear-gradient(135deg,#c8a96e 0%,#a07840 100%)", boxShadow: "0 8px 28px rgba(200,169,110,0.3)" }}
            >
              Get a free quote
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-sans text-[0.88rem] font-semibold text-white no-underline transition-all duration-200 hover:bg-white/10"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}