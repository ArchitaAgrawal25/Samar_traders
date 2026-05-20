import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

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
        style={{
          opacity: isOpen ? undefined : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
      />

      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-72 z-50 shadow-2xl flex flex-col"
        style={{
          background: "rgba(245,243,238,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transform: "translateX(100%)",
          willChange: "transform",
        }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
          <img
            src="/images/samar-logo.png"
            alt="Samar Trading"
            style={{
              height: "36px",
              width: "auto",
              objectFit: "contain",
            }}
          />

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              ref={(el) => {
                linksRef.current[i] = el;
              }}
              className="block px-4 py-3 rounded-xl text-stone-700 font-medium text-sm hover:bg-stone-100 hover:text-stone-900 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-6 border-t border-stone-200">
          <Link
            to="/contact"
            onClick={onClose}
            className="block text-center w-full py-3 rounded-full bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      navRef.current,
      {
        y: -24,
        opacity: 0,
        willChange: "transform, opacity",
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(navRef.current, {
            willChange: "auto",
          });
        },
      }
    );
  }, navRef);

  return () => ctx.revert();
}, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-30 transition-[padding] duration-300"
        style={{
  padding: scrolled ? "8px 0" : "14px 0",
  opacity: 0,
  transform: "translate3d(0,-24px,0)",
}}
      >
        <div className="w-full px-8 xl:px-16 flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center flex-shrink-0 group"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                padding: "6px 12px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255,255,255,0.95)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.10), 0 1.5px 0 rgba(255,255,255,1) inset",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 10px 38px rgba(0,0,0,0.14), 0 1.5px 0 rgba(255,255,255,1) inset";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0,0,0,0.10), 0 1.5px 0 rgba(255,255,255,1) inset";
              }}
            >
              <img
                src="/images/samar-logo.png"
                alt="Samar Trading"
                style={{
                  height: "44px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  maxWidth: "180px",
                }}
              />
            </div>
          </a>

          <nav
            className="hidden md:flex items-center gap-0.5 rounded-full px-2 py-1.5 flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.75)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 " +
                  (isActive(link.path)
                    ? "bg-stone-800 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/80")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 flex-shrink-0 text-sm font-medium text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              padding: "10px 22px",
              borderRadius: "99px",
              background: "linear-gradient(135deg, #1c1917 0%, #44403c 100%)",
              boxShadow:
                "0 4px 16px rgba(28,25,23,0.25), 0 1px 0 rgba(255,255,255,0.12) inset",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 6px 24px rgba(28,25,23,0.35), 0 1px 0 rgba(255,255,255,0.12) inset";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(28,25,23,0.25), 0 1px 0 rgba(255,255,255,0.12) inset";
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Get a Quote
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-stone-600 hover:bg-white/60 transition-all"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.7)",
            }}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}