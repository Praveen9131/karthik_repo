import { useEffect, useRef, useState } from "react";

/* Animates the numeric part of a stat (e.g. "2,000+", "7M+", "18 yrs")
   from zero up to its target the first time it scrolls into view,
   preserving any prefix/suffix and thousands separators. */
export default function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const parts = String(value).match(/^(\D*)([\d,]+)(.*)$/);
  const [display, setDisplay] = useState(parts ? value : value);

  useEffect(() => {
    if (!parts) return;
    const [, prefix, rawNum, suffix] = parts;
    const target = parseInt(rawNum.replace(/,/g, ""), 10);
    const hasComma = rawNum.includes(",");
    const fmt = (n) => (hasComma ? n.toLocaleString("en-US") : String(n));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    setDisplay(prefix + fmt(0) + suffix);
    let raf;
    let started = false;
    const run = () => {
      let t0;
      const tick = (t) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setDisplay(prefix + fmt(Math.round(eased * target)) + suffix);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
