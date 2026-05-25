// src/App.jsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLayoutEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import About from "./components/About";
import WhatWeMake from "./components/Whatwemake";
import OurProducts from "./components/Ourproducts";
import FAQ from "./components/Faq";
import { QuoteModalProvider } from "./components/QuoteModal";
import Reviews from "./components/Reviews";
import Showroom from "./components/Showroom";
import FindUs from "./components/FindUs";
import WhyChooseUs from "./components/Whychooseus";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Doors from "./components/Doors";
import Windows from "./components/Windows";
import AboutPage from "./components/Aboutpage";
import Projects from "./components/Projects";
import GoToTop from "./components/Gototop";

gsap.registerPlugin(ScrollTrigger);

const HOME_SCROLL_KEY = "samar_home_scrollY";

function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <About />
      <WhatWeMake />
      <WhyChooseUs />
      <OurProducts />
      <FAQ />
      <Reviews />
      <Showroom />
      <FindUs />
    </>
  );
}

function HomeScrollRestorer() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let restoreTimer = null;
    let saveTimer = null;
    let active = true;

    const saveScroll = () => {
      sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
    };

    const saveScrollThrottled = () => {
      if (saveTimer) return;

      saveTimer = window.setTimeout(() => {
        saveTimer = null;
        saveScroll();
      }, 100);
    };

    window.addEventListener("scroll", saveScrollThrottled, { passive: true });
    window.addEventListener("pagehide", saveScroll);
    window.addEventListener("beforeunload", saveScroll);

    const saved = sessionStorage.getItem(HOME_SCROLL_KEY);

    
    if (saved !== null) {
      const targetY = Number(saved);

      if (!Number.isNaN(targetY)) {
        
        const restoreExactly = () => {
          if (!active) return;

          const maxY = Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight
          );

          window.scrollTo(0, Math.min(targetY, maxY));
        };

        restoreExactly();

        const startedAt = performance.now();

        const keepRestoring = () => {
          if (!active) return;

          restoreExactly();

          if (performance.now() - startedAt < 500) {
            restoreTimer = requestAnimationFrame(keepRestoring);
          }
        };

        restoreTimer = requestAnimationFrame(keepRestoring);

        const onRefresh = () => {
          requestAnimationFrame(restoreExactly);
          setTimeout(restoreExactly, 0);
          setTimeout(restoreExactly, 80);
        };

        ScrollTrigger.addEventListener("refresh", onRefresh);
        window.addEventListener("load", restoreExactly);

        return () => {
          active = false;

          if (restoreTimer) cancelAnimationFrame(restoreTimer);
          if (saveTimer) clearTimeout(saveTimer);

          ScrollTrigger.removeEventListener("refresh", onRefresh);
          window.removeEventListener("load", restoreExactly);
          window.removeEventListener("scroll", saveScrollThrottled);
          window.removeEventListener("pagehide", saveScroll);
          window.removeEventListener("beforeunload", saveScroll);

          if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "auto";
          }
        };
      }
    }

    return () => {
      active = false;

      if (saveTimer) clearTimeout(saveTimer);

      window.removeEventListener("scroll", saveScrollThrottled);
      window.removeEventListener("pagehide", saveScroll);
      window.removeEventListener("beforeunload", saveScroll);

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <QuoteModalProvider>
        <Navbar />
        <GoToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeScrollRestorer />
                <HomePage />
              </>
            }
          />
          <Route path="/services" element={<Services />} />
          <Route path="/doors" element={<Doors />} />
          <Route path="/windows" element={<Windows />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </QuoteModalProvider>
    </BrowserRouter>
  );
}