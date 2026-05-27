import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

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

function Lightbox({ media, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const n = media.length;
  const item = media[idx];

  const prev = useCallback(() => setIdx((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIdx((i) => (i + 1) % n), [n]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.22, ease: "power2.out" }
    );

    gsap.fromTo(
      panelRef.current,
      { scale: 0.94, opacity: 0, y: 18 },
      { scale: 1, opacity: 1, y: 0, duration: 0.34, ease: "expo.out" }
    );
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  useEffect(() => {
    return () => {
      if (videoRef.current) videoRef.current.pause();
    };
  }, [idx]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18 });
    gsap.to(panelRef.current, {
      scale: 0.95,
      opacity: 0,
      y: 10,
      duration: 0.16,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black/65 px-3 py-5 backdrop-blur-md sm:px-6"
    >
      <div
        ref={panelRef}
        className="relative flex h-[min(86dvh,760px)] w-[min(94vw,1080px)] flex-col overflow-hidden rounded-2xl border border-[#c8b99a]/25 bg-[#100d0a] shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close lightbox"
          className="absolute right-3 top-3 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-black/85 text-white shadow-[0_10px_30px_rgba(0,0,0,0.55)] backdrop-blur transition hover:scale-110 hover:border-white hover:bg-[#2c2724] sm:right-4 sm:top-4 sm:h-14 sm:w-14"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 pb-3 pt-16 sm:px-5 sm:pb-4 sm:pt-20">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-black/35">
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
                className="block max-h-full max-w-full rounded-xl object-contain"
              />
            ) : (
              <img
                key={item.src}
                src={item.src}
                alt=""
                className="block max-h-full max-w-full rounded-xl object-contain"
              />
            )}
          </div>
        </div>

        {n > 1 && (
          <div className="flex shrink-0 flex-col items-center gap-2 border-t border-white/10 bg-[#0b0806]/95 px-3 py-3 sm:py-4">
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur transition hover:scale-105 hover:border-white/60 hover:bg-white/20 sm:h-[52px] sm:w-[52px]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <span className="min-w-16 text-center font-sans text-[0.72rem] tracking-[0.14em] text-white/60 tabular-nums">
                {String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur transition hover:scale-105 hover:border-white/60 hover:bg-white/20 sm:h-[52px] sm:w-[52px]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="flex max-w-full items-center gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {media.map((m, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`View item ${i + 1}`}
                  className={`h-10 w-[52px] shrink-0 overflow-hidden rounded-[9px] border-2 bg-[#111] p-0 transition ${
                    i === idx
                      ? "scale-105 border-white/90 opacity-100"
                      : "border-white/20 opacity-45 hover:opacity-80"
                  }`}
                >
                  {m.type === "video" ? (
                    <div
                      className="flex h-full w-full items-center justify-center bg-cover bg-center"
                      style={{
                        backgroundImage: m.poster ? `url(${m.poster})` : undefined,
                        backgroundColor: m.poster ? undefined : "#2a2a2a",
                      }}
                    >
                      {!m.poster && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      )}
                    </div>
                  ) : (
                    <img src={m.src} alt="" className="block h-full w-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryTile({ item, onClick }) {
  const [loaded, setLoaded] = useState(item.type === "video");

  return (
    <div
      onClick={onClick}
      className="gallery-tile group relative w-full shrink-0 cursor-pointer overflow-hidden rounded-[14px] bg-[#1e1c18] pt-[66.666%]"
    >
      {!loaded && (
        <div className="absolute inset-0 z-[1] animate-pulse bg-gradient-to-r from-[#2a2620] via-[#343028] to-[#2a2620] bg-[length:200%_100%]" />
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
            className="absolute inset-0 z-[2] block h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute left-2.5 top-2.5 z-[4] flex items-center gap-[5px] rounded-full border border-white/15 bg-black/70 px-2.5 py-1 backdrop-blur">
            <svg width="7" height="7" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            <span className="font-sans text-[0.44rem] font-bold uppercase tracking-[0.16em] text-white">
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
          className="gallery-tile-img absolute inset-0 z-[2] block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />
      )}

      <div className="gallery-tile-overlay absolute inset-0 z-[3] flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
        <div className="gallery-tile-icon flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white/95 opacity-0 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition group-hover:scale-100 group-hover:opacity-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c1917" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function GalleryGrid({ media }) {
  const [lightbox, setLightbox] = useState(null);
  const n = media.length;

  const open = (i) => setLightbox(i);
  const close = () => setLightbox(null);

  const gridClass =
    n === 1
      ? "grid-cols-1"
      : n === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : n === 4
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const tileClass = (i) => (n === 5 && i === 0 ? "sm:col-span-2" : "");

  return (
    <>
      <div className={`grid w-full gap-2.5 ${gridClass}`}>
        {media.map((item, i) => (
          <div key={i} className={`min-w-0 ${tileClass(i)}`}>
            <GalleryTile item={item} onClick={() => open(i)} />
          </div>
        ))}
      </div>

      {lightbox !== null && <Lightbox media={media} startIdx={lightbox} onClose={close} />}
    </>
  );
}

function ProjectSection({ project, index }) {
  const sectionRef = useRef(null);
  const { open } = useQuoteModal();

  const imageCount = project.media.filter((m) => m.type === "image").length;
  const videoCount = project.media.filter((m) => m.type === "video").length;
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
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
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
      className={`w-full scroll-mt-[88px] ${isLast ? "pb-0" : "pb-[clamp(56px,7vw,96px)]"}`}
    >
      {index > 0 && (
        <div className="mb-[clamp(56px,7vw,96px)] h-px w-full bg-gradient-to-r from-transparent via-[#c8b99a]/25 to-transparent" />
      )}

      <div className="proj-reveal mb-[clamp(28px,4vw,44px)] text-center">
        <div className="mb-3.5 inline-flex items-center gap-2.5">
          <span className="font-sans text-[0.52rem] uppercase tracking-[0.22em] text-[#a09684]/70 tabular-nums">
            N° {project.id}
          </span>
          <span className="h-px w-5 bg-[#b4a894]/40" />
          <span className="font-sans text-[0.50rem] uppercase tracking-[0.16em] text-[#a09684]/65">
            {mediaLabel}
          </span>
        </div>

        <h2 className="m-0 font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-normal leading-none tracking-[-0.035em] text-[#1c1710]">
          {project.name}
        </h2>
      </div>

      <div className="proj-reveal mx-auto mb-[clamp(32px,5vw,56px)] flex max-w-full flex-col items-center gap-5 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c8beaa]/50 bg-white/70 px-4 py-1.5 backdrop-blur">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9a9188" strokeWidth="2.2">
            <path d="M12 21s-8-6.686-8-12a8 8 0 1 1 16 0c0 5.314-8 12-8 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="font-sans text-[0.72rem] tracking-[0.02em] text-[#6b6258]">
            {project.location}
          </span>
        </div>

        <p className="m-0 font-sans text-[clamp(0.88rem,1.2vw,1rem)] leading-[1.78] text-[#6b6258]">
          {project.description}
        </p>

        <div className="flex w-full flex-col items-center gap-2.5">
          <p className="m-0 font-sans text-[0.52rem] font-bold uppercase tracking-[0.2em] text-[#a8a098]">
            Materials used
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {project.materials.map((mat) => (
              <span
                key={mat}
                className="rounded-full border border-[#c8beaa]/55 bg-white/70 px-3.5 py-1.5 font-sans text-[0.72rem] tracking-[0.01em] text-[#5a5248] backdrop-blur"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={open}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#1c1917] px-7 py-3 font-sans text-[0.8rem] font-semibold tracking-[0.01em] text-white shadow-[0_8px_24px_rgba(28,25,23,0.22)] transition hover:scale-105 hover:bg-[#2c2724] hover:shadow-[0_12px_32px_rgba(28,25,23,0.32)]"
        >
          Enquire about this project
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </button>
      </div>

      <div className="proj-reveal">
        <GalleryGrid media={project.media} />
      </div>
    </section>
  );
}

function PageHeader() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-hero-el",
        { opacity: 0, y: 26, filter: "blur(7px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.09,
          ease: "expo.out",
          delay: 0.05,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#f9f7f2] via-[#f4f0e7] to-[#ede8dd] pb-16 pt-[clamp(100px,13vw,136px)]"
    >
      <div className="pointer-events-none absolute -top-20 right-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(200,169,110,0.22)_0%,transparent_70%)] blur-[80px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1c1917_1px,transparent_1px)] bg-[length:30px_30px] opacity-[0.035]" />

      <div className="relative z-[1] mx-auto max-w-[1200px] px-[clamp(20px,5vw,56px)]">
        <div className="proj-hero-el mb-9 flex items-center gap-2 opacity-0">
          <Link
            to="/"
            className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#a8a098] no-underline transition hover:text-[#5a5248]"
          >
            Home
          </Link>
          <span className="text-[#d0c8bc]">›</span>
          <span className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#a07840]">
            Projects
          </span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="proj-hero-el mb-4 flex items-center gap-3 opacity-0">
              <span className="h-px w-8 bg-gradient-to-r from-[#c8b99a] to-transparent" />
              <span className="font-sans text-[0.58rem] font-extrabold uppercase tracking-[0.24em] text-[#9a9188]">
                Project Gallery
              </span>
            </div>

            <h1 className="proj-hero-el m-0 font-serif text-[clamp(2.8rem,7vw,6rem)] font-normal leading-[0.96] tracking-[-0.04em] text-[#1c1710] opacity-0">
              Built &amp; delivered
              <br />
              <em className="italic text-[#a07840]">— in Lucknow.</em>
            </h1>

            <p className="proj-hero-el mt-5 max-w-[480px] font-sans text-[clamp(0.85rem,1.1vw,1rem)] leading-[1.7] text-[#78716c] opacity-0">
              A curated selection of completed installations — photos and videos from each site, direct from our team.
            </p>
          </div>

          <div className="proj-hero-el flex flex-wrap gap-2.5 opacity-0">
            {[{ v: PROJECTS.length, l: "Projects" }, { v: "2+", l: "Years" }, { v: "200+", l: "Installs" }].map(({ v, l }) => (
              <div
                key={l}
                className="min-w-20 rounded-[18px] border border-[#c8b99a]/40 bg-white/55 px-5 py-4 text-center backdrop-blur"
              >
                <p className="m-0 font-serif text-[1.7rem] font-semibold leading-none tracking-[-0.04em] text-[#1c1710]">
                  {v}
                </p>
                <p className="mt-1.5 font-sans text-[0.52rem] font-bold uppercase tracking-[0.16em] text-[#a8a098]">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function BottomCTA() {
  const { open } = useQuoteModal();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bottom-cta-el",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#1c1714] to-[#241e18] px-[clamp(20px,5vw,56px)] py-[clamp(60px,8vw,112px)]"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,169,110,0.14)_0%,transparent_70%)] blur-[110px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(200,169,110,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,110,0.04)_1px,transparent_1px)] bg-[length:56px_56px]" />

      <div className="relative z-[1] mx-auto max-w-[840px] text-center">
        <div className="bottom-cta-el mb-5 flex items-center justify-center gap-3 opacity-0">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c8b99a]/50" />
          <span className="font-sans text-[0.58rem] font-extrabold uppercase tracking-[0.28em] text-[#c8b99a]">
            Start a project
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c8b99a]/50" />
        </div>

        <h2 className="bottom-cta-el m-0 font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] font-normal leading-[0.97] tracking-[-0.04em] text-white opacity-0">
          Your space could be
          <br />
          <em className="bg-gradient-to-r from-[#c8a96e] via-[#e0c890] to-[#9ecfbf] bg-clip-text italic text-transparent">
            our next project.
          </em>
        </h2>

        <p className="bottom-cta-el mx-auto mb-10 mt-5 max-w-[440px] font-sans text-[0.9rem] leading-[1.7] text-white/40 opacity-0">
          Tell us your brief. We visit, measure, and produce a detailed quote — no obligations, no pressure.
        </p>

        <div className="bottom-cta-el flex flex-wrap justify-center gap-3 opacity-0">
          <button
            onClick={open}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-gradient-to-br from-[#c8a96e] to-[#a07840] px-8 py-3.5 font-sans text-[0.85rem] font-semibold text-[#1c1710] shadow-[0_12px_40px_rgba(200,169,110,0.3)] transition hover:scale-105"
          >
            Brief Us
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c8b99a]/25 px-8 py-3.5 font-sans text-[0.85rem] font-semibold text-white/65 no-underline backdrop-blur transition hover:bg-white/10 hover:text-white"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      <PageHeader />

      <div className="mx-auto max-w-[1200px] px-[clamp(20px,5vw,56px)] py-[clamp(48px,7vw,96px)]">
        {PROJECTS.map((project, i) => (
          <ProjectSection key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className="h-[clamp(40px,5vw,72px)] bg-[#f5f2eb]" />
      <BottomCTA />
    </div>
  );
}