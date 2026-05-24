import { useEffect, useRef, useState } from "react";
import {
  Clock,
  Copy,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  Check,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   SHOWROOM TIMINGS
───────────────────────────────────────────── */
const SHOWROOM_HOURS = {
  open: 11, // 11 AM
  close: 20, // 8 PM
};

/* ─────────────────────────────────────────────
   SHOWROOM DATA
───────────────────────────────────────────── */
const SHOWROOM_ZONES = [
  {
    label: "Floor 01",
    title: "Door Gallery",
    meta: "Teak, oak, uPVC",
    type: "video",
video: import.meta.env.VITE_SHOWROOM_VIDEO_URL,
videoWebm: import.meta.env.VITE_SHOWROOM_VIDEO_URL  },
  {
    label: "Bay 02",
    title: "Window Studio",
    meta: "Glass, frames, sliders",
    type: "image",
    image: "/images/show5.JPG",
  },
  {
    label: "Studio 03",
    title: "Glass & Sliding Gallery",
    meta: "Premium finishes",
    type: "image",
    image: "/images/show7.JPG",
  },
];

console.log("Video URL:", import.meta.env.VITE_SHOWROOM_VIDEO_URL);
/* ─────────────────────────────────────────────
   DYNAMIC OPEN STATUS
───────────────────────────────────────────── */
function getOpenStatus() {
  const now = new Date();

  const currentHour =
    now.getHours() + now.getMinutes() / 60;

  const isOpen =
    currentHour >= SHOWROOM_HOURS.open &&
    currentHour <= SHOWROOM_HOURS.close;

  return {
    label: isOpen ? "Open now" : "Closed",
    styles: isOpen
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-rose-200 bg-rose-50 text-rose-700",
  };
}

/* ─────────────────────────────────────────────
   SCROLL TO NEXT SECTION
───────────────────────────────────────────── */
function scrollToNextSection() {
  const currentSection = document.getElementById("showroom-section");

  if (!currentSection) return;

  const nextSection = currentSection.nextElementSibling;

  if (nextSection) {
    nextSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/* ─────────────────────────────────────────────
   INFO ROW
───────────────────────────────────────────── */
function InfoRow({
  icon: Icon,
  bg,
  title,
  detail,
  copyable = false,
  scrollable = false,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyable) return;

    await navigator.clipboard.writeText(title);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  const handleScroll = () => {
    if (!scrollable) return;

    scrollToNextSection();
  };

  return (
    <div
      onClick={scrollable ? handleScroll : undefined}
      className={`group flex items-start gap-3 ${
        scrollable ? "cursor-pointer" : ""
      }`}
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-stone-800 ${bg}`}
      >
        <Icon size={14} strokeWidth={2.2} />
      </span>

      <div className="relative">
        <div className="flex items-center gap-2">
          

          {copyable && (
            <button
              onClick={handleCopy}
              className="opacity-0 transition duration-200 group-hover:opacity-100"
            >
              {copied ? (
                <Check
                  size={13}
                  className="text-emerald-600"
                />
              ) : (
                <Copy
                  size={13}
                  className="text-stone-500 hover:text-stone-800"
                />
              )}
            </button>
          )}
        </div>

        <p className="m-0 mt-0.5 font-sans text-[0.7rem] leading-snug text-stone-500">
          {detail}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHOWROOM CARD
───────────────────────────────────────────── */
function ZoneCard({ zone, large, className = "" }) {
  const status = getOpenStatus();

  return (
    <article
      className={`showroom-card group relative overflow-hidden rounded-[24px] bg-stone-200 shadow-[0_18px_50px_rgba(28,25,23,0.10)]
      ${
        large
          ? "min-h-[400px] md:min-h-[500px]"
          : "min-h-[220px]"
      } ${className}`}
    >
      {/* VIDEO */}
      {zone.type === "video" ? (
        <video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
>
  <source src={zone.video} type="video/webm" />
</video>
      ) : (
<img
  src={zone.image}
  alt={zone.title}
  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
  style={{ 
    objectPosition: ["show1", "show5", "show7"].some(name => zone.image?.includes(name)) 
      ? "center bottom" 
      : "center" 
  }}
/>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-white/10" />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/35 to-transparent" />

      {/* Dynamic Status */}
      <div
        className={`absolute left-4 top-4 rounded-full border px-3 py-1.5 font-sans text-[0.56rem] font-bold uppercase tracking-[0.2em] backdrop-blur-xl ${status.styles}`}
      >
        {status.label}
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5">
        <div>
          

         
        </div>

       
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Showroom() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showroom-fade",
        {
          opacity: 0,
          y: 22,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
once: true,
          },
        }
      );

      gsap.fromTo(
        ".showroom-card",
        {
          opacity: 0,
          y: 24,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showroom-section"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f5f3ee] px-5 py-14 md:px-4 md:py-10"
    >
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-white/55 to-transparent" />

      <div className="absolute -right-24 top-28 h-72 w-72 rounded-full bg-[#9ecfbf]/20 blur-3xl" />

      <div className="absolute -left-24 bottom-20 h-80 w-80 rounded-full bg-[#c8a96e]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1250px]">
        
        {/* ─── Heading Section ─── */}
        <div className="mb-8 grid gap-5 md:mb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="showroom-fade">
            <h2 className="m-0  font-serif text-[clamp(2rem,5vw,4rem)] font-normal leading-[0.95] tracking-[-0.04em] text-stone-950">
              Step into our{" "}
              <em className="bg-gradient-to-br from-[#2a7a6a] via-[#478d8a] to-[#c8822a] bg-clip-text italic text-transparent">
                showroom.
              </em>
            </h2>

            <p className="mt-4  font-sans text-[0.9rem] leading-relaxed text-stone-500">
              Touch the timber, slide the sashes,
              compare hardware finishes, and see how
              glass, aluminium, and wood behave in
              real daylight.
            </p>
          </div>

          <a
            href="https://www.google.com/maps/dir//Samar+Trading,+4%2F117,+Fims+College+Rd,+Vibhav+Khand+-4,+Vibhav+Khand,+Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226010/"
            target="_blank"
            rel="noreferrer"
            className="showroom-fade inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-5 py-3 font-sans text-[0.8rem] font-semibold text-stone-800 shadow-[0_10px_30px_rgba(28,25,23,0.07)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_38px_rgba(28,25,23,0.12)]"
          >
            <Navigation size={14} />
            Get directions
          </a>
        </div>

        {/* ─── Layout ─── */}
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.85fr]">
          
          {/* Main Video */}
          <ZoneCard
            zone={SHOWROOM_ZONES[0]}
            large
          />

          {/* Side Column */}
          <div className="grid gap-4">
            
            {/* Secondary Image */}
            <ZoneCard zone={SHOWROOM_ZONES[1]} />

            {/* Info Card */}
            <div className="showroom-fade relative overflow-hidden rounded-[24px] border border-white/75 bg-white/75 p-5 shadow-[0_18px_55px_rgba(28,25,23,0.08)] backdrop-blur-xl sm:p-6">
              
              <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#c8a96e]/20 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p className="m-0 font-sans text-[0.6rem] font-extrabold uppercase tracking-[0.24em] text-stone-700">
                    Samar Traders Flagship
                  </p>

                  <Sparkles
                    size={15}
                    className="text-[#c8a96e]"
                  />
                </div>

                <div className="text-stone-800 space-y-4">
                  <InfoRow
                    icon={MapPin}
                    bg="bg-emerald-100"
                    title="Showroom & Workshop"
                    detail="Gomti Nagar, Lucknow"
                    scrollable
                  />

                  <InfoRow
                    icon={Clock}
                    bg="bg-rose-100"
                    title="Mon - Sun · 11:00 am to 8:00 pm"
                    detail="Open all week"
                    scrollable
                  />

                  <InfoRow
                    icon={Phone}
                    bg="bg-sky-100"
                    title="+91 84291 53343"
                    detail="Hover to copy number"
                    copyable
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wide Image */}
          
{/* Bottom Two Images */}
<div className="grid gap-4 lg:col-span-2 md:grid-cols-2">
  
  <ZoneCard
    zone={{
      label: "Studio 03",
      title: "Glass & Sliding Gallery",
      meta: "Frameless · Premium glass",
      type: "image",
      image: "/images/show1.JPG",
    }}
    className="min-h-[260px] md:min-h-[340px]"
  />

  <ZoneCard
    zone={{
      label: "Collection 04",
      title: "Luxury Window Systems",
      meta: "Minimal · Modern frames",
      type: "image",
      image: "/images/show4.JPG",
    }}
    className="min-h-[260px] md:min-h-[340px]"
  />
</div>


        </div>
      </div>
    </section>
  );
}