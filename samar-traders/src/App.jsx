import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <BrowserRouter>
    <QuoteModalProvider>
      <Navbar />
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/products" element={<div className="pt-32 text-center text-2xl font-serif text-stone-800">Products</div>} />
        <Route path="/projects" element={<div className="pt-32 text-center text-2xl font-serif text-stone-800">Projects</div>} />
        <Route path="/about"    element={<div className="pt-32 text-center text-2xl font-serif text-stone-800">About</div>} />
        <Route path="/contact"  element={<div className="pt-32 text-center text-2xl font-serif text-stone-800">Contact</div>} />
      </Routes>
      </QuoteModalProvider>
    </BrowserRouter>
  );
}