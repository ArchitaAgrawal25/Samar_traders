import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    name: "uPVC Windows",
    desc: "Premium sliding, casement, tilt-turn and French-style uPVC windows engineered for Indian climates. Multi-chamber profiles reduce heat, block noise and resist rust, termites and weathering — all with zero maintenance.",

    whyItLasts: [
      "Multi-chamber thermal insulation profiles",
      "German ROTO hardware fittings",
      "UV-stabilised, termite & rust proof",
      "Weather-sealed gaskets, zero seepage",
    ],

    specs: [
      {
        label: "Styles",
        value: "Sliding · Casement · Tilt-Turn · French",
      },
      {
        label: "Hardware",
        value: "ROTO Germany",
      },
      {
        label: "Lead time",
        value: "2 – 4 weeks",
      },
    ],

    enquire: "windows",
    accent: "#2a7a6a",

    image: "/images/door1.jpg",
    image2: "/images/door3.png",

    // "See All" link for this category
    seeAllLink: "/windows",
    seeAllLabel: "See all window types",
  },

  {
    id: "02",
    name: "uPVC Doors",
    desc: "Durable uPVC entry, sliding and casement doors built to withstand India's harsh climate. Termite-proof, rust-resistant frames with multi-point locking systems — delivering security, insulation and style with no upkeep.",

    whyItLasts: [
      "Multi-point locking for enhanced security",
      "German ROTO hardware fittings",
      "UV-stabilised, termite & rust proof",
      "Noise-dampening weather seals",
    ],

    specs: [
      {
        label: "Styles",
        value: "Sliding · Casement · Entry · French",
      },
      {
        label: "Hardware",
        value: "ROTO Germany",
      },
      {
        label: "Lead time",
        value: "2 – 4 weeks",
      },
    ],

    enquire: "doors",
    accent: "#3a6a8a",

    image: "/images/door2.jpg",
    image2: "/images/door4.jpg",

    // "See All" link for this category
    seeAllLink: "/doors",
    seeAllLabel: "See all door types",
  },

  {
    id: "03",
    name: "Modular Kitchen Solutions",
    desc: "Fully customised modular kitchens designed around your cooking style, space and taste. From layout planning to final installation — smart cabinets, premium accessories and a finish that lasts decades.",

    whyItLasts: [
      "Soft-close hinges and drawer systems",
      "High-gloss, matte & wood-finish shutters",
      "Quartz, granite & laminate countertops",
      "Built-in appliance integration",
    ],

    specs: [
      {
        label: "Layouts",
        value: "Parallel · L-shape · U-shape · Island",
      },
      {
        label: "Finish",
        value: "200+ options",
      },
      {
        label: "Lead time",
        value: "3 – 5 weeks",
      },
    ],

    enquire: "kitchen",
    accent: "#c8822a",

    image: "/images/kitchen.webp",
    image2: "/images/show1.JPG",

    seeAllLink: null,
    seeAllLabel: null,
  },

  {
    id: "04",
    name: "Custom Wardrobes",
    desc: "Sliding, hinged and walk-in wardrobes crafted to make every inch count. Designed to match your room's aesthetic — from minimal whites to rich wood finishes — with interiors tailored to exactly how you organise.",

    whyItLasts: [
      "Soft-close track systems",
      "Internal fittings: drawers, shelves, rails",
      "Mirror, glass & frosted panel options",
      "Fits any room size or shape",
    ],

    specs: [
      {
        label: "Types",
        value: "Sliding · Hinged · Walk-in",
      },
      {
        label: "Panels",
        value: "Mirror · Glass · Frosted",
      },
      {
        label: "Lead time",
        value: "2 – 3 weeks",
      },
    ],

    enquire: "wardrobes",
    accent: "#6a5acd",

    image: "/images/wardrobe.jpg",
    image2: "/images/furniture.jpg",

    seeAllLink: null,
    seeAllLabel: null,
  },

  {
    id: "05",
    name: "Interior Design",
    desc: "Complete interior solutions for homes and commercial spaces — from concept to completion. We design living rooms, bedrooms, offices, showrooms and more with a focus on functionality, natural light and your personal style.",

    whyItLasts: [
      "False ceiling and lighting planning",
      "Flooring, wall finishes & wallpapers",
      "Furniture selection & space planning",
      "3D visualization before execution",
    ],

    specs: [
      {
        label: "Scope",
        value: "Home · Office · Showroom · Retail",
      },
      {
        label: "Delivery",
        value: "End-to-end",
      },
      {
        label: "Consultation",
        value: "In-home, free",
      },
    ],

    enquire: "interior design",
    accent: "#2a7a6a",

    image: "/images/interior.jpg",
    image2: "/images/interior2.png",

    seeAllLink: null,
    seeAllLabel: null,
  },

  {
    id: "06",
    name: "Furniture & Space Planning",
    desc: "Smart furniture layout and space optimisation for homes, apartments and offices. We analyse your space, understand how you live or work, and design a plan that eliminates wasted area.",

    whyItLasts: [
      "Room-by-room space analysis",
      "Custom furniture sizing and placement",
      "Traffic flow and ergonomics planning",
      "Multi-functional and convertible furniture",
    ],

    specs: [
      {
        label: "Works with",
        value: "New & existing furniture",
      },
      {
        label: "Spaces",
        value: "Home · Office · Studio",
      },
      {
        label: "Consultation",
        value: "In-person",
      },
    ],

    enquire: "furniture",
    accent: "#2f6f6a",

    image: "/images/furniture2.jpeg",
    image2: "/images/furniture3.webp",

    seeAllLink: null,
    seeAllLabel: null,
  },
];
/* ── Index row ── */
function IndexRow({ service, index, last }) {
  const rowRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(rowRef.current,
      { opacity: 0, y: 14 },
      {
        opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
        delay: 0.06 + index * 0.07,
        scrollTrigger: { trigger: rowRef.current, start: "top 92%" },
      }
    );
  }, [index]);

  const scrollTo = () => {
    const el = document.getElementById(`chapter-${service.slug}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={rowRef}
      onClick={scrollTo}
      className={[
        "group flex cursor-pointer items-center gap-5 px-5 py-5 opacity-0 transition-all duration-200 hover:bg-white/50",
        !last ? "border-b border-stone-200/70" : "",
      ].join(" ")}
    >
      <span className="hidden w-8 shrink-0 font-sans text-[0.58rem] tracking-[0.1em] text-stone-400 sm:inline">
        {service.id}
      </span>
      <span
        className="flex-1 font-serif font-normal leading-none text-stone-900 transition-colors group-hover:text-stone-500"
        style={{ fontSize: "clamp(1rem,1.8vw,1.45rem)", letterSpacing: "-0.01em" }}
      >
        {service.name}
      </span>
      <span className="hidden w-32 shrink-0 font-sans text-[0.58rem] uppercase tracking-[0.12em] text-stone-400 md:block">
        {service.category}
      </span>
      <span className="flex items-center gap-1 rounded-full border border-[rgba(200,190,170,0.4)] bg-white/60 px-3 py-1.5 font-sans text-[0.55rem] font-bold uppercase tracking-[0.12em] text-stone-500 transition-all duration-200 group-hover:text-stone-900">
        Read
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </span>
    </div>
  );
}

/* ── Images block ── */
function ImagesBlock({ service, flipSmall }) {
  return (
    <div className="relative w-full p-5 md:p-7" style={{ minHeight: "540px" }}>
      <div
        className="absolute inset-5 overflow-hidden rounded-[22px] md:inset-7"
        style={{ boxShadow: "0 20px 56px rgba(0,0,0,0.13)" }}
      >
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-[600ms] cubic-bezier-[0.25,0.46,0.45,0.94]"
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        />
      </div>

      <div
        className="absolute z-10 overflow-hidden rounded-[16px]"
        style={{
          bottom: "0.5rem",
          ...(flipSmall ? { left: "0.5rem" } : { right: "0.5rem" }),
          width: "54%",
          aspectRatio: "4/3",
          boxShadow: "0 14px 40px rgba(0,0,0,0.24)",
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <img
          src={service.image2}
          alt={service.name}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

/* ── Content block ── */
function ContentBlock({ service }) {
  const { open } = useQuoteModal();

  return (
    <div className="flex flex-col justify-center bg-[#f5f3ee] px-8 py-16 md:px-14 md:py-20">
      {/* ── Heading row with "See All" button ── */}
      <div className="chapter-animate mb-2 flex items-start justify-between gap-4">
        <h2
          className="m-0 font-serif font-normal leading-[1.0] text-stone-900"
          style={{ fontSize: "clamp(2rem,3.8vw,3.5rem)", letterSpacing: "-0.03em" }}
        >
          {service.name}.
        </h2>

        {service.seeAllLink && (
          <Link
            to={service.seeAllLink}
            className="group mt-2 inline-flex shrink-0 items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-5 py-2.5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.14em] text-stone-700 no-underline shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-900 hover:bg-white hover:text-stone-900 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            title={service.seeAllLabel}
          >
            See All
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </Link>
        )}
      </div>

      {/* Desc */}
      <p className="chapter-animate mb-7 max-w-[500px] font-sans leading-relaxed text-stone-600" style={{ fontSize: "0.88rem" }}>
        {service.desc}
      </p>

      {/* Why it lasts */}
      <div className="chapter-animate mb-6">
        <div className="mb-3 flex items-center gap-2">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={service.accent} strokeWidth="2.2">
            <circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" />
          </svg>
          <span className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.16em]" style={{ color: service.accent }}>
            Why it lasts
          </span>
        </div>
        <div className="space-y-2.5">
          {service.whyItLasts.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={service.accent} strokeWidth="2.2" className="mt-[2px] shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-sans text-[0.82rem] leading-snug text-stone-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specs */}
      <div className="chapter-animate mb-8 border-t border-stone-200">
        {service.specs.map((spec) => (
          <div
            key={spec.label}
            className="flex items-baseline gap-6 border-b border-stone-200 py-3"
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#b8a898" strokeWidth="2" className="mt-1 shrink-0">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="w-24 shrink-0 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-stone-400">
              {spec.label}
            </span>
            <span className="font-sans text-[0.82rem] text-stone-800">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="chapter-animate flex flex-wrap gap-3">
        <button
          onClick={open}
          className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-sans text-[0.82rem] font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:opacity-90"
          style={{ background: "#1c1917", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
        >
          Enquire about {service.enquire} ↗
        </button>

        {service.seeAllLink && (
          <Link
            to={service.seeAllLink}
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-7 py-3.5 font-sans text-[0.82rem] font-semibold text-stone-700 no-underline transition-all duration-200 hover:border-stone-900 hover:bg-white hover:text-stone-900"
          >
            View all {service.category}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

/* ── Chapter ── */
function Chapter({ service, index }) {
  const sectionRef = useRef(null);
  const isEven = index % 2 === 1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".chapter-animate"),
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none reset",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      id={`chapter-${service.slug}`}
      ref={sectionRef}
      className="grid min-h-[600px] md:grid-cols-2"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* Mobile: ContentBlock always first (order-1), ImagesBlock always second (order-2).
          md+: restore alternating layout via md:order-* overrides. */}
      <div className={isEven ? "order-1 md:order-2" : "order-1 md:order-1"}>
        <ContentBlock service={service} />
      </div>
      <div className={isEven ? "order-2 md:order-1" : "order-2 md:order-2"}>
        <ImagesBlock service={service} flipSmall={isEven} />
      </div>
    </div>
  );
}

export default function Services() {
  const heroRef = useRef(null);
  const { open } = useQuoteModal();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ee]">

      {/* ── HERO / INDEX ── */}
      <div ref={heroRef} className="px-6 pb-12 pt-32 md:px-12 md:pt-20">
        <div className="mx-[2px]">

          <div className="hero-fade mb-0 flex flex-col gap-8 opacity-0 md:flex-row md:items-start md:justify-evenly">
            <div>
              <p className="mb-2 font-sans text-[0.6rem] font-bold uppercase tracking-[0.22em] text-stone-800">
                Samar Trading · Est. 2017
              </p>
              <h1
                className="m-0 font-serif font-normal text-stone-900"
                style={{ fontSize: "clamp(2.4rem,5vw,4.5rem)", lineHeight: 0.98, letterSpacing: "-0.04em" }}
              >
                Products
                <em
                  className="italic"
                  style={{
                    background: "linear-gradient(135deg, #a07840 0%, #c8a96e 40%, #2a7a6a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  &amp; Services.
                </em>
              </h1>
            </div>

            <div className="self-start md:pt-10">
              <p className="m-0 font-sans leading-relaxed text-stone-800" style={{ fontSize: "0.88rem" }}>
                Explore the full range of products offered by us.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hero-fade my-10 border-t border-stone-300/50 opacity-0" />

          {/* Index */}
          <div className="hero-fade flex flex-col gap-0 opacity-0 md:flex-row md:gap-16">
            <div className="mb-6 shrink-0 md:mb-0 md:w-52">
              <p className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.2em] text-stone-400">Index</p>
              <p className="mt-1.5 font-sans text-[0.82rem] leading-relaxed text-stone-800">
                Scroll the catalogue, or jump to a chapter.
              </p>
            </div>

            <div
              className="flex-1 overflow-hidden rounded-2xl border border-stone-200/80"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,244,236,0.85) 50%, rgba(240,235,225,0.8) 100%)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9) inset",
              }}
            >
              {SERVICES.map((s, i) => (
                <IndexRow key={s.slug} service={s} index={i} last={i === SERVICES.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CHAPTERS ── */}
      <div>
        {SERVICES.map((service, i) => (
          <div key={service.slug} className="border-t border-stone-200/70">
            <Chapter service={service} index={i} />
          </div>
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="bg-[#1a1714] px-6 py-20 md:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-sans text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#c8b99a]">
            Not sure where to start?
          </p>
          <h2
            className="mb-5 font-serif font-normal text-white"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.08 }}
          >
            Tell us your space.{" "}
            <em className="italic text-[#d6b58a]">We'll handle the rest.</em>
          </h2>
          <p className="mb-8 font-sans leading-relaxed text-white/60" style={{ fontSize: "0.88rem" }}>
            Book a free consultation — we'll visit, measure, and give you a detailed quote with no pressure and no obligation.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={open}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-sans text-[0.88rem] font-semibold text-white transition-all duration-200 hover:scale-[1.04]"
              style={{
                background: "linear-gradient(135deg,#c8a96e 0%,#a07840 100%)",
                boxShadow: "0 8px 28px rgba(200,169,110,0.3)",
              }}
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