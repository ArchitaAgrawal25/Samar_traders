import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import QuoteButton from "./QuoteButton";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

// Must match the key used in App.jsx HomeScrollRestorer
const HOME_SCROLL_KEY = "samar_home_scrollY";

function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useLayoutEffect(() => {
    if (!menuRef.current || !overlayRef.current) return;

    const links = linksRef.current.filter(Boolean);
    gsap.killTweensOf([overlayRef.current, menuRef.current, ...links]);

    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.set(menuRef.current, { x: "100%" });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(links, { opacity: 0, x: 18 });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(menuRef.current, {
        x: "0%",
        duration: 0.42,
        ease: "power4.out",
      });

      gsap.to(links, {
        opacity: 1,
        x: 0,
        duration: 0.35,
        stagger: 0.045,
        ease: "power3.out",
        delay: 0.12,
      });
    } else {
      document.body.style.overflow = "";

      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.28,
        ease: "power3.in",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.out",
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm",
          isOpen ? "pointer-events-auto" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <div
        ref={menuRef}
        className="fixed right-0 top-0 z-50 flex h-full w-72 translate-x-full flex-col bg-[#f5f3ee]/[0.97] shadow-2xl backdrop-blur-[20px] will-change-transform"
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <img
            src="/images/samar-logo.png"
            alt="Samar Trading"
            className="h-9 w-auto object-contain"
          />

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-stone-200"
          >
            <X size={17} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              ref={(el) => {
                linksRef.current[i] = el;
              }}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-stone-700 transition-all hover:bg-stone-100 hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-stone-200 px-6 py-6" onClick={onClose}>
          <QuoteButton mobile className="w-full justify-center bg-black py-3 hover:bg-stone-900" />
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const isHidden = useRef(false);
  const isAnimating = useRef(false);
  const entranceDone = useRef(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    gsap.set(el, { y: -24, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        entranceDone.current = true;
        gsap.set(el, { y: 0, opacity: 1 });
      },
    });

    tl.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: "power4.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const HIDE_THRESHOLD = 80;
    const el = navRef.current;

    const showNav = () => {
      if (!isHidden.current || isAnimating.current) return;

      isAnimating.current = true;
      gsap.killTweensOf(el);

      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        onComplete: () => {
          isHidden.current = false;
          isAnimating.current = false;
        },
      });
    };

    const hideNav = () => {
      if (isHidden.current || isAnimating.current) return;

      isAnimating.current = true;
      gsap.killTweensOf(el);

      gsap.to(el, {
        y: "-100%",
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => {
          isHidden.current = true;
          isAnimating.current = false;
        },
      });
    };

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        if (!entranceDone.current) {
          ticking.current = false;
          return;
        }

        const currentY = window.scrollY;
        const diff = currentY - lastScrollY.current;

        setScrolled(currentY > 10);

        if (currentY > HIDE_THRESHOLD) {
          if (diff > 4) hideNav();
          else if (diff < -4) showNav();
        } else {
          showNav();
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // ── Logo click ────────────────────────────────────────────────────────────
  // Already on home  → smooth scroll to top (no navigation needed).
  // On another page  → clear the saved scroll position so HomeScrollRestorer
  //                    does NOT restore a non-zero Y, then navigate to "/",
  //                    then wait one macrotask (setTimeout 0) for React to
  //                    commit the new route before forcing scroll to 0.
  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already home — just scroll up smoothly.
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Clear any saved home scroll so the restorer starts fresh.
      sessionStorage.removeItem(HOME_SCROLL_KEY);

      navigate("/");

      // setTimeout 0 yields to the event loop after navigate() has queued
      // the route change, giving React time to commit the new tree before
      // we assert the scroll position.
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 0);
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-30 transition-[padding] duration-300 ease-in-out"
        style={{ padding: scrolled ? "8px 0" : "14px 0" }}
      >
        <div className="flex w-full items-center justify-between gap-4 px-8 xl:px-16">
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex shrink-0 items-center no-underline"
          >
            <div className="flex cursor-pointer items-center gap-2.5 rounded-2xl border-[1.5px] border-white/95 bg-white/[0.88] py-1.5 pl-2 pr-4 shadow-[0_8px_32px_rgba(0,0,0,0.10),0_1.5px_0_rgba(255,255,255,1)_inset] backdrop-blur-[20px] transition duration-200 hover:-translate-y-px hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0,0,0,0.13),0_1.5px_0_rgba(255,255,255,1)_inset]">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#c8a96e] to-[#a07840] shadow-[0_0_0_2.5px_rgba(200,169,110,0.2)]" />

              <img
                src="/images/samar-logo.png"
                alt="Samar Trading"
                className="block h-10 max-w-40 object-contain"
              />

              <div className="flex flex-col gap-px border-l border-[rgba(200,190,170,0.35)] pl-2.5">
                <span className="whitespace-nowrap font-serif text-[0.62rem] italic leading-[1.2] tracking-[0.02em] text-stone-500">
                  Since 2017
                </span>
                <span className="whitespace-nowrap font-sans text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  Lucknow
                </span>
              </div>
            </div>
          </a>

          <nav className="hidden shrink-0 items-center gap-0.5 rounded-full border border-white/75 bg-white/65 px-2 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-2xl md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={[
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  isActive(link.path)
                    ? "bg-stone-800 text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100/80 hover:text-stone-900",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <QuoteButton className="hidden shrink-0 gap-2 bg-black px-[22px] py-2.5 text-sm shadow-[0_4px_16px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.12)_inset] hover:bg-stone-900 hover:scale-105 hover:shadow-[0_6px_24px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] active:scale-95 md:inline-flex" />

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/55 text-stone-600 backdrop-blur-xl transition-all hover:bg-white/60 md:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}