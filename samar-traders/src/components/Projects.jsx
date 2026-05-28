import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
   {
  id: "01",
  name: "Group Centre - CRPF Camp",
  location: "Lucknow, Uttar Pradesh",
  description:
    "An ongoing large-scale modular kitchen project for the CRPF Group Centre campus in Lucknow. The contract includes the design, fabrication, and installation of 600 modern modular kitchens built for durability, efficient space utilization, and long-term daily use across residential units.",
  materials: [
    "Modular plywood cabinetry",
    "Premium laminate finishes",
    "Soft-close hardware systems",
    "Quartz & granite countertops",
  ],
  accent: "#7a5c3a",
  media: [
    { type: "image", src: "/images/pr5-1.webp" },
    { type: "image", src: "/images/pr5-21.jpeg" },
 
  ],
},
  {
    id: "02",
    name: "The Magnolia – Marriage Lawn",
    location: "Faizabad Road, Lucknow",
    description:
      "A venue-wide upgrade with 50+ precision-engineered uPVC windows. Toughened glass units paired with airtight weather seals enhanced ventilation, durability, and overall guest comfort during large gatherings.",
    materials: ["uPVC structural frames", "Toughened safety glass", "Multi-chamber insulation", "Precision hardware"],
    accent: "#2a7a6a",
    media: [
      { type: "image", src: "/images/pr1-5.webp" },
      { type: "image", src: "/images/pr1-1.jpg" },
      { type: "image", src: "/images/pr1-2.jpg" },
      { type: "image", src: "/images/pr1-3.jpg" },
      { type: "image", src: "/images/pr1-4.jpg" },
    ],
  },
  {
    id: "03",
    name: "St. Stephans Academy",
    location: "Lucknow",
    description:
      "A campus-scale installation of 30 uPVC doors and windows designed for high-traffic educational environments. The system improves insulation, reduces noise, and ensures smooth daily operation across classrooms.",
    materials: ["uPVC door & window profiles", "Toughened glazing panels", "Institution-grade hardware", "EPDM weather seals"],
    accent: "#a07840",
    media: [
      { type: "image", src: "/images/pr2-7.jpg" },
      { type: "image", src: "/images/pr2-5.png" },
      { type: "image", src: "/images/pr2-2.jpg" },
      { type: "image", src: "/images/pr2-6.png" },
      { type: "image", src: "/images/pr2-4.jpg" },
    ],
  },
  {
    id: "04",
    name: "NABARD Training Centre",
    location: "Lucknow",
    description:
      "Energy-efficient uPVC windows installed across the training facility, improving thermal performance, reducing ambient noise, and ensuring long-term weather-proof operation suited for institutional use.",
    materials: ["uPVC insulated profiles", "Toughened energy glass", "Premium hardware fittings"],
    accent: "#7a5c3a",
    media: [
      { type: "image", src: "/images/pr3-2.avif" },
      { type: "image", src: "/images/pr3-1.jpg" },
    ],
  },
  {
    id: "05",
    name: "Deva Memorial Orthopaedics & Eye Hospital",
    location: "Faizabad",
    description:
      "High-performance uPVC doors customized for a medical environment, featuring toughened glass panels, precision-aligned hardware, and sealed frames that ensure hygiene, durability, and smooth clinical operation.",
    materials: ["uPVC door profiles", "Toughened safety glass", "Medical-grade premium hardware"],
    accent: "#4a6b8a",
    media: [
      { type: "image", src: "/images/pr4-4.webp" },
      { type: "image", src: "/images/pr4-1.png" },
      { type: "image", src: "/images/pr4-2.png" },
      { type: "image", src: "/images/pr4-3.png" },
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

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + n) % n);
  }, [n]);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % n);
  }, [n]);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.22, ease: "power2.out" }
    );

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.96, y: 16 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [prev, next]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [idx]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.16,
    });

    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.97,
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
        if (e.target === overlayRef.current) {
          handleClose();
        }
      }}
      className="
        fixed inset-0 z-[999999]
        flex items-center justify-center
        bg-black/75
        p-2 sm:p-4
        backdrop-blur-sm
      "
    >
      {/* Modal */}
      <div
        ref={panelRef}
        className="
          relative
          overflow-hidden
          rounded-[20px]
          shadow-[0_24px_70px_rgba(0,0,0,0.4)]
        "
        style={{
          width: "fit-content",
          height: "fit-content",
          maxWidth: "94vw",
          maxHeight: "90vh",
        }}
      >
        {/* Media */}
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
            className="
              block
              max-h-[90vh]
              max-w-[94vw]
              rounded-[20px]
              object-contain
            "
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt=""
            className="
              block
              max-h-[90vh]
              max-w-[94vw]
              rounded-[20px]
              object-contain
            "
          />
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close lightbox"
          className="
            absolute right-4 top-4 z-50
            flex h-11 w-11
            items-center justify-center
            rounded-full
            bg-black/80
            text-white
            shadow-lg
            backdrop-blur-md
            transition
            hover:scale-110
          "
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation */}
        {n > 1 && (
          <div
            className="
              absolute bottom-4 left-1/2 z-50
              flex -translate-x-1/2 items-center gap-3
              rounded-full
              bg-black/75
              px-3 py-2
              backdrop-blur-md
            "
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-white
                text-black
                transition
                hover:scale-105
              "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-white
                text-black
                transition
                hover:scale-105
              "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
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
      className="relative overflow-hidden bg-gradient-to-br from-[#f9f7f2] via-[#f4f0e7] to-[#ede8dd] pb-10 pt-[clamp(100px,13vw,136px)]"
    >
      <div className="pointer-events-none absolute -top-20 right-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(200,169,110,0.22)_0%,transparent_70%)] blur-[80px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1c1917_1px,transparent_1px)] bg-[length:30px_30px] opacity-[0.035]" />

      <div className="relative z-[1] mx-auto max-w-full px-[clamp(20px,5vw,56px)]">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="proj-hero-el mb-2 flex items-center gap-3 opacity-0">
              <span className="font-sans text-[0.78rem] font-extrabold uppercase tracking-[0.24em] text-[#9a9188]">
                Project Gallery
              </span>
            </div>

            <h1 className="proj-hero-el m-0 font-serif text-[clamp(1.8rem,5vw,4rem)] font-normal leading-[0.96] tracking-[-0.04em] text-[#1c1710] opacity-0">
              Built &amp; delivered
              <em className="italic text-[#a07840]">— in Lucknow.</em>
            </h1>

            <p className="proj-hero-el mt-5 max-w-[720px] font-sans text-[clamp(0.85rem,1.1vw,1rem)] leading-[1.7] text-[#78716c] opacity-0">
              A curated selection of completed installations — photos and videos from each site, direct from our team.
            </p>
          </div>

          <div className="proj-hero-el flex flex-wrap justify-center gap-2.5 opacity-0">
            {[
              { v: "20+", l: "Projects" },
              { v: "2+", l: "Years" },
              { v: "200+", l: "Installs" },
            ].map(({ v, l }) => (
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
      className="relative overflow-hidden bg-gradient-to-b from-[#1c1714] to-[#241e18] px-[clamp(20px,5vw,56px)] py-[clamp(50px,6vw,96px)]"
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

      <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)] py-[clamp(48px,7vw,96px)]">
        {PROJECTS.map((project, i) => (
          <ProjectSection key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className="h-[clamp(40px,5vw,72px)] bg-[#f5f2eb]" />
      <BottomCTA />
    </div>
  );
}