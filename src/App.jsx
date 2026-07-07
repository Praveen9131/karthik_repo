import { useLayoutEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import LogoMarquee from "./components/LogoMarquee.jsx";
import StatStrip from "./components/StatStrip.jsx";
import Curriculum from "./components/Curriculum.jsx";
import LearningPath from "./components/LearningPath.jsx";
import Projects from "./components/Projects.jsx";
import Careers from "./components/Careers.jsx";
import Comparison from "./components/Comparison.jsx";
import Leaders from "./components/Leaders.jsx";
import Personas from "./components/Personas.jsx";
import Cornerstone from "./components/Cornerstone.jsx";
import Admissions from "./components/Admissions.jsx";
import Faq from "./components/Faq.jsx";
import PdfOffer from "./components/PdfOffer.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Footer from "./components/Footer.jsx";

/* Elements that fade + rise into view as they enter the viewport. */
const REVEAL_SELECTOR = [
  ".fp-badge",
  ".fp-hero-title",
  ".fp-hero-subhead",
  ".fp-hero-sub",
  ".fp-hero-meta",
  ".fp-hero-ctas",
  ".fp-hero-links",
  ".hero-stat-card",
  ".section-head",
  ".track-card",
  ".article-card",
  ".path-step",
  ".path-note",
  ".stat",
  ".project-card",
  ".role-card",
  ".leader-card",
  ".persona-card",
  ".compare-col",
  ".personas-intro",
  ".step-card",
  ".faq-item",
  ".final-cta-inner > *",
  ".pdf-copy",
  ".pdf-actions",
].join(",");

function useScrollReveal() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    els.forEach((el) => {
      el.classList.add("reveal");
      // Stagger each element by its position among revealing siblings.
      const sibs = Array.from(el.parentElement?.children || []).filter((c) =>
        c.classList.contains("reveal")
      );
      const i = Math.max(0, sibs.indexOf(el));
      el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // Reveal when it enters view, or if a fast scroll blew past it
          // (top above the viewport) so nothing can stay stuck hidden.
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <StatStrip />
        <Curriculum />
        <LearningPath />
        <Projects />
        <Careers />
        <Comparison />
        <Leaders />
        <Personas />
        <Cornerstone />
        <Admissions />
        <Faq />
        <PdfOffer />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
