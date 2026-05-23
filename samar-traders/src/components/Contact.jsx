import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

const CONTACT = {
  owner: "Satendra Tiwari",
  phone: "+91 84291 53343",
  email: "contact@samartrading.in",
  address: "4/117, Fims College Rd, Vibhav Khand-4, Gomti Nagar, Lucknow, UP 226010",
  mapsQuery: "Samar Trading Gomti Nagar Lucknow",
  hours: {
    weekdays: "Mon – Sun · 11:00 am – 8:00 pm",
    saturday: "Open all days",
    sunday: "Text first",
  },
};

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT.mapsQuery)}`;
const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapsQuery)}&output=embed`;

export default function Contact() {
  const { open } = useQuoteModal();
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const mapRef = useRef(null);
  const hoursRef = useRef(null);
  const footerRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero stagger
      gsap.fromTo(".contact-hero-item",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "expo.out", delay: 0.1 }
      );

      // Cards
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 28, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "expo.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // Map + hours
      [mapRef, hoursRef].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: i * 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 85%" } }
        );
      });

      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 88%" } }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#f8f6f1",
        fontFamily: "'Inter', ui-sans-serif, system-ui",
      }}
    >
      {/* Google Fonts for handwriting */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif-contact { font-family: 'Playfair Display', Georgia, serif; }

        .contact-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.10) !important;
        }

        .pill-btn {
          transition: all 0.25s ease;
        }
        .pill-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
        }

        .arrow-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(0,0,0,0.06);
          font-size: 0.75rem;
          transition: background 0.2s;
        }
        .contact-card:hover .arrow-box {
          background: rgba(0,0,0,0.12);
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="px-6 pt-32 pb-10 md:px-12 md:pt-28 md:pb-14" style={{ maxWidth: "680px" }}>
        <div className="contact-hero-item opacity-0 flex items-center gap-2 mb-4">
          <span style={{ width: "28px", height: "1px", background: "#c8b99a", display: "inline-block" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9a9188" }}>
            Contact
          </span>
        </div>

        <h1
          className="contact-hero-item opacity-0"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#1c1917",
            margin: "0 0 8px",
          }}
        >
          Let's{" "}
          <em
            style={{
              fontFamily: "'Caveat', cursive",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "clamp(3.2rem, 7.5vw, 5.8rem)",
              color: "#2a7a6a",
              letterSpacing: "-0.01em",
            }}
          >
            talk.
          </em>
        </h1>

        <p
          className="contact-hero-item opacity-0"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#78716c", lineHeight: 1.7, maxWidth: "420px", margin: "12px 0 0" }}
        >
          Pick whichever feels right — a quick call, a slow email, or a wander into our showroom. We answer every message ourselves.
        </p>

        <div className="contact-hero-item opacity-0" style={{ marginTop: "20px" }}>
          <button
            onClick={open}
            className="pill-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "11px 22px",
              borderRadius: "99px",
              background: "#1c1917",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
            }}
          >
            Open quick quote
            <span style={{
              width: "24px", height: "24px", borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem",
            }}>↗</span>
          </button>
        </div>
      </div>

      {/* ── HANDWRITING QUOTE ── */}
      <div
        className="contact-hero-item opacity-0 px-6 md:px-12 mb-10"
        style={{ maxWidth: "520px", marginLeft: "auto", paddingRight: "48px" }}
      >
        <div
          style={{
            borderLeft: "2px solid #c8b99a",
            paddingLeft: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
              color: "#44403c",
              lineHeight: 1.55,
              margin: "0 0 10px",
              fontWeight: 400,
            }}
          >
            "we usually write back the same day,<br />
            often before chai gets cold."
          </p>
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "1rem",
              color: "#9a9188",
              margin: 0,
              fontWeight: 500,
            }}
          >
            — Satendra
          </p>
        </div>
      </div>

      {/* ── THREE CONTACT CARDS ── */}
      <div
        className="px-6 md:px-12 mb-8"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", maxWidth: "960px" }}
      >
        {/* Call */}
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          ref={el => cardsRef.current[0] = el}
          className="contact-card opacity-0"
          style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: "22px", borderRadius: "20px",
            background: "#fff",
            border: "1px solid rgba(200,190,170,0.4)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            textDecoration: "none", color: "inherit",
            minHeight: "160px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(168,213,200,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem",
            }}>📞</div>
            <span className="arrow-box">↗</span>
          </div>
          <div style={{ marginTop: "auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9a9188", margin: "0 0 4px" }}>Call</p>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: "0.85rem", color: "#78716c", margin: "0 0 6px", fontWeight: 400 }}>ring the studio</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#1c1917", margin: "0 0 4px", letterSpacing: "-0.01em" }}>{CONTACT.phone}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#9a9188", margin: 0 }}>Mon–Sun · 11:00 – 20:00</p>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${CONTACT.email}`}
          ref={el => cardsRef.current[1] = el}
          className="contact-card opacity-0"
          style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: "22px", borderRadius: "20px",
            background: "#fff",
            border: "1px solid rgba(200,190,170,0.4)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            textDecoration: "none", color: "inherit",
            minHeight: "160px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(252,220,170,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem",
            }}>✉️</div>
            <span className="arrow-box">↗</span>
          </div>
          <div style={{ marginTop: "auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9a9188", margin: "0 0 4px" }}>Email</p>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: "0.85rem", color: "#78716c", margin: "0 0 6px", fontWeight: 400 }}>say hello</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#1c1917", margin: "0 0 4px", letterSpacing: "-0.01em" }}>{CONTACT.email}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#9a9188", margin: 0 }}>we reply within a working day</p>
          </div>
        </a>

        {/* Visit */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          ref={el => cardsRef.current[2] = el}
          className="contact-card opacity-0"
          style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: "22px", borderRadius: "20px",
            background: "#fff",
            border: "1px solid rgba(200,190,170,0.4)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            textDecoration: "none", color: "inherit",
            minHeight: "160px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(220,210,255,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem",
            }}>📍</div>
            <span className="arrow-box">↗</span>
          </div>
          <div style={{ marginTop: "auto" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9a9188", margin: "0 0 4px" }}>Visit</p>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: "0.85rem", color: "#78716c", margin: "0 0 6px", fontWeight: 400 }}>drop by</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#1c1917", margin: "0 0 4px", letterSpacing: "-0.01em" }}>4/117, Vibhav Khand-4</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#9a9188", margin: 0 }}>Gomti Nagar, Lucknow 226010</p>
          </div>
        </a>
      </div>

      {/* ── MAP + HOURS ── */}
      <div
        className="px-6 md:px-12 mb-10"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", maxWidth: "960px" }}
      >
        {/* Map */}
        <div
          ref={mapRef}
          className="opacity-0"
          style={{
            borderRadius: "22px", overflow: "hidden",
            border: "1px solid rgba(200,190,170,0.35)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            position: "relative", minHeight: "300px",
          }}
        >
          {/* Open Now badge */}
          <div style={{
            position: "absolute", top: "14px", left: "14px", zIndex: 10,
            display: "flex", alignItems: "center", gap: "6px",
            padding: "6px 12px", borderRadius: "99px",
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(200,190,170,0.4)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#374151" }}>Open Now</span>
          </div>

          <iframe
            title="Samar Traders map"
            src={embedUrl}
            loading="lazy"
            style={{ width: "100%", height: "100%", minHeight: "300px", border: "none", display: "block" }}
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Find us label */}
          <div style={{
            position: "absolute", bottom: "14px", left: "14px", zIndex: 10,
            padding: "6px 14px", borderRadius: "99px",
            background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(200,190,170,0.4)",
          }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "0.9rem", color: "#44403c", fontWeight: 500 }}>
              Find us by the jacaranda tree 🌸
            </span>
          </div>
        </div>

        {/* Hours card */}
        <div
          ref={hoursRef}
          className="opacity-0"
          style={{
            padding: "28px 26px", borderRadius: "22px",
            background: "#fff",
            border: "1px solid rgba(200,190,170,0.4)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a9188", margin: "0 0 14px" }}>
              Studio Hours
            </p>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 400, lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#1c1917", margin: "0 0 20px",
            }}>
              Come in,{" "}
              <em style={{ fontStyle: "italic", color: "#2a7a6a" }}>we'll make tea.</em>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {[
                { day: "Mon – Fri", time: "11:00 — 19:30" },
                { day: "Saturday", time: "11:00 — 18:00" },
                { day: "Sunday", time: "by appointment" },
              ].map(({ day, time }) => (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#78716c" }}>{day}</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.82rem", fontWeight: 600, color: "#1c1917", fontStyle: "italic" }}>{time}</span>
                </div>
              ))}
            </div>

            <div style={{
              padding: "10px 14px", borderRadius: "12px",
              background: "rgba(168,213,200,0.15)",
              border: "1px solid rgba(168,213,200,0.3)",
              display: "flex", alignItems: "flex-start", gap: "8px",
              marginBottom: "20px",
            }}>
              <span style={{ fontSize: "0.75rem", marginTop: "1px", flexShrink: 0 }}>📅</span>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: "0.95rem", color: "#2a7a6a", margin: 0, lineHeight: 1.4 }}>
                text first on a Sunday — we'll open the gate for you
              </p>
            </div>
          </div>

          <button
            onClick={open}
            className="pill-btn"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              width: "100%", padding: "13px",
              borderRadius: "99px",
              background: "#1c1917", color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem", fontWeight: 600,
              border: "none", cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.16)",
            }}
          >
            ✦ Start a quick quote
          </button>
        </div>
      </div>

      {/* ── FOOTER BANNER ── */}
      <div
        ref={footerRef}
        className="opacity-0 mx-6 md:mx-12 mb-10 px-8 py-12 md:px-14 md:py-16"
        style={{
          borderRadius: "24px",
          background: "linear-gradient(135deg, #fdf6ec 0%, #f5f0e8 50%, #ede8df 100%)",
          border: "1px solid rgba(200,190,170,0.35)",
          textAlign: "center",
          maxWidth: "900px",
        }}
      >
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            color: "#44403c",
            lineHeight: 1.5,
            margin: "0 0 20px",
            fontWeight: 400,
          }}
        >
          whether it's a single hinge or a whole home —{" "}
          <em style={{ color: "#2a7a6a", fontStyle: "normal" }}>we'd love to hear</em>{" "}
          about it.
        </p>

        <button
          onClick={open}
          className="pill-btn"
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "13px 28px", borderRadius: "99px",
            background: "#1c1917", color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem", fontWeight: 600,
            border: "none", cursor: "pointer",
            boxShadow: "0 6px 22px rgba(0,0,0,0.18)",
          }}
        >
          Get a quote
          <span style={{
            width: "26px", height: "26px", borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.78rem",
          }}>→</span>
        </button>
      </div>
    </div>
  );
}