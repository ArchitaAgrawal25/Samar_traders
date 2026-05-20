import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const STATS = [
  { value: "25+",  label: "Years Experience" },
  { value: "800+", label: "Projects Done" },
  { value: "100%", label: "Client Satisfaction" },
];

/* ── shimmer pane (image slot) ─────────────────────────────── */
function ImagePane({ imageSrc, style }) {
  return (
    <div style={{
      position: "relative", overflow: "hidden", borderRadius: "12px",
      background: imageSrc ? "transparent" : "rgba(0,0,0,0.12)",
      ...style,
    }}>
      {imageSrc && (
        <img src={imageSrc} alt=""
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }} />
      )}
      <div style={{
        position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
        background:"linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.05) 55%,rgba(255,255,255,0.15) 100%)",
      }} />
      <div style={{
        position:"absolute", top:0, left:0, width:"55%", height:"48%",
        zIndex:2, pointerEvents:"none",
        background:"radial-gradient(ellipse at 25% 25%,rgba(255,255,255,0.38) 0%,transparent 70%)",
      }} />
    </div>
  );
}

/* ── glass card shell ──────────────────────────────────────── */
function GlassCard({ cardRef, bg, border, shadow, style, children }) {
  return (
    <div ref={cardRef} style={{
      position:"absolute", borderRadius:"22px", overflow:"hidden",
      background: bg,
      backdropFilter:"blur(22px)", WebkitBackdropFilter:"blur(22px)",
      border: border || "1px solid rgba(255,255,255,0.82)",
      boxShadow: shadow || "0 8px 40px rgba(0,0,0,0.09),0 1.5px 0 rgba(255,255,255,0.95) inset",
      ...style,
    }}>
      {/* card specular */}
      <div style={{
        position:"absolute", top:0, left:0, width:"65%", height:"40%",
        zIndex:10, pointerEvents:"none", borderRadius:"22px 0 0 0",
        background:"radial-gradient(ellipse at 28% 22%,rgba(255,255,255,0.55) 0%,transparent 68%)",
      }} />
      <div style={{
        position:"relative", zIndex:5, padding:"12px",
        height:"100%", boxSizing:"border-box",
        display:"flex", flexDirection:"column",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── label strip ───────────────────────────────────────────── */
function CardLabel({ text, color = "#78716c" }) {
  return (
    <p style={{
      fontSize:"0.58rem", color, letterSpacing:"0.14em",
      textTransform:"uppercase", textAlign:"center",
      margin:"8px 0 0", fontWeight:600, flexShrink:0,
    }}>{text}</p>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const statsRef   = useRef(null);
  const card1Ref   = useRef(null);
  const card2Ref   = useRef(null);
  const card3Ref   = useRef(null);

  /* track whether we are in mobile layout */
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults:{ ease:"power3.out" } });
      tl.fromTo(eyebrowRef.current, { opacity:0, y:16 }, { opacity:1, y:0, duration:0.55 }, 0.3)
        .fromTo(headingRef.current, { opacity:0, y:32 }, { opacity:1, y:0, duration:0.7  }, 0.45)
        .fromTo(subRef.current,     { opacity:0, y:16 }, { opacity:1, y:0, duration:0.55 }, 0.7)
        .fromTo(ctaRef.current,     { opacity:0, y:12 }, { opacity:1, y:0, duration:0.5  }, 0.85)
        .fromTo(statsRef.current,   { opacity:0, y:12 }, { opacity:1, y:0, duration:0.5  }, 1.0)
        .fromTo(card1Ref.current, { opacity:0, x:-28, scale:0.94 }, { opacity:1, x:0, scale:1, duration:0.7, ease:"power2.out" }, 0.5)
        .fromTo(card2Ref.current, { opacity:0, y:-20, scale:0.94 }, { opacity:1, y:0, scale:1, duration:0.6, ease:"power2.out" }, 0.68)
        .fromTo(card3Ref.current, { opacity:0, x:20,  scale:0.94 }, { opacity:1, x:0, scale:1, duration:0.6, ease:"power2.out" }, 0.84);

      gsap.to(card1Ref.current, { y:-9,      duration:3.5, ease:"sine.inOut", repeat:-1, yoyo:true, delay:1.4 });
      gsap.to(card2Ref.current, { y:-6,      duration:2.8, ease:"sine.inOut", repeat:-1, yoyo:true, delay:2.0 });
      gsap.to(card3Ref.current, { y:-7, x:3, duration:3.2, ease:"sine.inOut", repeat:-1, yoyo:true, delay:1.7 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── IMAGE SLOTS ──────────────────────────────────────────────
     Replace null with a path/URL to show your photo in that pane.
     e.g.  "/images/door.jpg"  or  "https://example.com/pic.jpg"  */
  const gridImages  = ["/images/hero1.jpg","/images/hero3.jpeg","/images/hero2.jpg","/images/hero1.jpg","/images/hero3.jpeg","/images/hero2.jpg" ]; // Card 1 — 6 panes (2×3)
  const wideImage   = "/images/hero3.jpeg";           // Card 2 — single wide pane
  const stackImages = ["/images/hero2.jpg","/images/hero3.jpeg"];   // Card 3 — two stacked panes
  /* ──────────────────────────────────────────────────────────── */

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden"
      style={{ minHeight:"100vh", background:"#f5f3ee", display:"flex", alignItems:"flex-start" }}>

      {/* blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position:"absolute", top:"-5%", right:"-5%", width:"55vw", height:"55vw", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(252,195,148,0.5) 0%,transparent 68%)" }} />
        <div style={{ position:"absolute", bottom:"-10%", left:"20%", width:"45vw", height:"45vw", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(180,230,200,0.4) 0%,transparent 68%)" }} />
        <div style={{ position:"absolute", top:"30%", right:"30%", width:"30vw", height:"30vw", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(200,185,255,0.28) 0%,transparent 68%)" }} />
      </div>

      <div className="relative z-10 w-full" style={{ paddingTop:"88px", paddingBottom:"40px" }}>

        {/* ════════════════════════════════════════════════════
            DESKTOP — side-by-side (md+)
        ════════════════════════════════════════════════════ */}
        <div className="hidden md:grid w-full"
          style={{ gridTemplateColumns:"1fr 1fr", gap:"4vw", alignItems:"center",
            minHeight:"calc(100vh - 128px)", padding:"0 4vw" }}>

          {/* left copy */}
          <div style={{ display:"flex", flexDirection:"column", gap:"clamp(14px,2vh,26px)", justifyContent:"center" }}>
            <CopyBlock eyebrowRef={eyebrowRef} headingRef={headingRef} subRef={subRef} ctaRef={ctaRef} statsRef={statsRef} />
          </div>

          {/* right cards */}
          <div style={{ position:"relative", height:"clamp(380px,64vh,600px)" }}>
            <div style={{ position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(circle at 55% 45%,rgba(168,213,245,0.18) 0%,transparent 65%)",
              borderRadius:"50%", transform:"scale(1.1)" }} />

            {/* Card 1 — blue, 2×3 grid, left, full height */}
            <GlassCard cardRef={card1Ref}
              bg="rgba(205,232,245,0.55)"
              shadow="0 8px 40px rgba(0,0,0,0.09),0 1.5px 0 rgba(255,255,255,0.95) inset"
              style={{ top:"0%", left:"0%", width:"52%", bottom:"0%", zIndex:1 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px", flex:1, minHeight:0 }}>
                {gridImages.map((src,i) => <ImagePane key={i} imageSrc={src} style={{ minHeight:0 }} />)}
              </div>
              <div style={{ display:"flex", justifyContent:"center", margin:"8px 0 3px" }}>
                <div style={{ width:"34px", height:"3px", borderRadius:"99px", background:"rgba(180,170,155,0.4)" }} />
              </div>
              <CardLabel text="Aluminium · Series 90" />
            </GlassCard>

            {/* Card 2 — lavender, wide, top-right, overlaps card1 */}
            <GlassCard cardRef={card2Ref}
              bg="rgba(220,210,255,0.52)"
              shadow="0 8px 36px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.92) inset"
              style={{ top:"3%", left:"38%", right:"0%", height:"44%", zIndex:2 }}>
              <ImagePane imageSrc={wideImage} style={{ flex:1, minHeight:0, width:"100%" }} />
              <CardLabel text="Casement Glass" />
            </GlassCard>

            {/* Card 3 — peach, two stacked, bottom-right, overlaps both */}
            <GlassCard cardRef={card3Ref}
              bg="rgba(252,220,170,0.55)"
              shadow="0 8px 36px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.90) inset"
              style={{ top:"49%", left:"44%", right:"0%", bottom:"0%", zIndex:3 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:"7px", flex:1, minHeight:0 }}>
                {stackImages.map((src,i) => <ImagePane key={i} imageSrc={src} style={{ flex:1, minHeight:0 }} />)}
              </div>
              <CardLabel text="Wooden Frame" />
            </GlassCard>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            MOBILE — stacked (< md)
        ════════════════════════════════════════════════════ */}
        <div className="md:hidden flex flex-col" style={{ padding:"0 5vw", gap:"36px" }}>

          {/* copy */}
          <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            <CopyBlock eyebrowRef={eyebrowRef} headingRef={headingRef} subRef={subRef} ctaRef={ctaRef} statsRef={statsRef} mobile />
          </div>

          {/* cards — compact overlapping panel */}
          <div style={{ position:"relative", height:"340px", marginBottom:"8px" }}>
            <div style={{ position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(circle at 50% 50%,rgba(168,213,245,0.18) 0%,transparent 70%)" }} />

            {/* Card 1 — blue, 2×3 grid */}
            <GlassCard cardRef={card1Ref}
              bg="rgba(205,232,245,0.60)"
              shadow="0 6px 28px rgba(0,0,0,0.09),0 1.5px 0 rgba(255,255,255,0.95) inset"
              style={{ top:"0%", left:"0%", width:"54%", bottom:"0%", zIndex:1 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px", flex:1, minHeight:0 }}>
                {gridImages.map((src,i) => <ImagePane key={i} imageSrc={src} style={{ minHeight:0 }} />)}
              </div>
              <div style={{ display:"flex", justifyContent:"center", margin:"6px 0 2px" }}>
                <div style={{ width:"28px", height:"3px", borderRadius:"99px", background:"rgba(180,170,155,0.4)" }} />
              </div>
              <CardLabel text="Aluminium · Series 90" />
            </GlassCard>

            {/* Card 2 — lavender, wide */}
            <GlassCard cardRef={card2Ref}
              bg="rgba(220,210,255,0.58)"
              shadow="0 6px 24px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.92) inset"
              style={{ top:"4%", left:"40%", right:"0%", height:"43%", zIndex:2 }}>
              <ImagePane imageSrc={wideImage} style={{ flex:1, minHeight:0, width:"100%" }} />
              <CardLabel text="Casement Glass" />
            </GlassCard>

            {/* Card 3 — peach, two stacked */}
            <GlassCard cardRef={card3Ref}
              bg="rgba(252,220,170,0.60)"
              shadow="0 6px 24px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.90) inset"
              style={{ top:"50%", left:"46%", right:"0%", bottom:"0%", zIndex:3 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:"6px", flex:1, minHeight:0 }}>
                {stackImages.map((src,i) => <ImagePane key={i} imageSrc={src} style={{ flex:1, minHeight:0 }} />)}
              </div>
              <CardLabel text="Wooden Frame" />
            </GlassCard>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Copy block extracted so both layouts share it ─────────── */
function CopyBlock({ eyebrowRef, headingRef, subRef, ctaRef, statsRef, mobile }) {
  return (
    <>
      <div ref={eyebrowRef}>
        <span className="inline-flex items-center gap-2 font-medium text-stone-600 tracking-widest uppercase"
          style={{ fontSize: mobile ? "0.65rem" : "0.75rem", padding:"7px 14px", borderRadius:"99px",
            background:"rgba(255,255,255,0.6)", backdropFilter:"blur(12px)",
            border:"1px solid rgba(200,190,170,0.5)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color:"#4ade80" }}>
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
          Premium Interiors · Est. 1998
        </span>
      </div>

      <div ref={headingRef}>
        <h1 className="font-serif font-normal text-stone-900"
          style={{ fontSize: mobile ? "clamp(2rem,8vw,2.8rem)" : "clamp(2.4rem,4.5vw,5rem)",
            lineHeight:1.06, letterSpacing:"-0.02em", margin:0 }}>
          Premium doors &amp;{" "}
          <em style={{ fontStyle:"italic", color:"#44403c" }}>windows,</em>
          <br />designed for
          <em style={{ fontStyle:"italic", color:"#78716c" }}> you.</em>
        </h1>
      </div>

      <p ref={subRef} style={{ color:"#78716c", fontSize: mobile ? "0.9rem" : "clamp(0.95rem,1.2vw,1.1rem)",
        lineHeight:1.7, maxWidth:"440px", margin:0 }}>
        Samar Traders delivers high-quality aluminium, glass and wooden
        solutions — crafted with the calm precision and warmth of a family workshop.
      </p>

      <div ref={ctaRef} style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
        <Link to="/products" style={{ padding: mobile ? "10px 18px" : "12px 26px", borderRadius:"99px",
          background:"#1c1917", color:"#fff", fontSize: mobile ? "0.8rem" : "0.875rem",
          fontWeight:500, textDecoration:"none", transition:"all 0.2s", display:"inline-block", whiteSpace:"nowrap" }}
          onMouseEnter={e=>{e.currentTarget.style.background="#44403c";e.currentTarget.style.transform="scale(1.04)"}}
          onMouseLeave={e=>{e.currentTarget.style.background="#1c1917";e.currentTarget.style.transform="scale(1)"}}>
          Explore Products
        </Link>
        <Link to="/projects" style={{ padding: mobile ? "10px 18px" : "12px 26px", borderRadius:"99px",
          background:"rgba(255,255,255,0.6)", backdropFilter:"blur(12px)",
          border:"1px solid rgba(200,190,170,0.55)", color:"#44403c",
          fontSize: mobile ? "0.8rem" : "0.875rem", fontWeight:500,
          textDecoration:"none", transition:"all 0.2s", display:"inline-block", whiteSpace:"nowrap" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.85)";e.currentTarget.style.transform="scale(1.04)"}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.6)";e.currentTarget.style.transform="scale(1)"}}>
          View Projects
        </Link>
        <Link to="/contact" style={{ padding: mobile ? "10px 18px" : "12px 26px", borderRadius:"99px",
          background:"linear-gradient(135deg,#c8a96e 0%,#a07840 100%)", color:"#fff",
          fontSize: mobile ? "0.8rem" : "0.875rem", fontWeight:500, textDecoration:"none",
          transition:"all 0.2s", display:"inline-flex", alignItems:"center", gap:"5px", whiteSpace:"nowrap",
          boxShadow:"0 4px 16px rgba(160,120,64,0.28)" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 6px 22px rgba(160,120,64,0.42)"}}
          onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 16px rgba(160,120,64,0.28)"}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Get a Quote
        </Link>
      </div>

      <div ref={statsRef} style={{ display:"flex", gap: mobile ? "24px" : "clamp(20px,3vw,48px)", paddingTop:"2px", flexWrap: mobile ? "wrap" : "nowrap" }}>
        {STATS.map(s => (
          <div key={s.label}>
            <p className="font-serif" style={{ fontSize: mobile ? "1.4rem" : "clamp(1.4rem,2.2vw,2rem)",
              fontWeight:600, color:"#1c1917", margin:0, lineHeight:1 }}>{s.value}</p>
            <p style={{ fontSize:"0.68rem", color:"#a8a29e", marginTop:"3px",
              letterSpacing:"0.06em", textTransform:"uppercase" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}