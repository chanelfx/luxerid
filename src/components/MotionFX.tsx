import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/** Global animation layer: scroll progress, cursor glow, floating particles,
 * page-transition curtain, scroll reveals, and 3D tilt on cards. */
const MotionFX = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const glowRef = useRef<HTMLDivElement>(null);
  const [curtain, setCurtain] = useState(true);

  // Page transition curtain
  useEffect(() => {
    setCurtain(true);
    const t = setTimeout(() => setCurtain(false), 650);
    return () => clearTimeout(t);
  }, [pathname]);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cursor glow + card tilt
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (glowRef.current) glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      const card = (e.target as HTMLElement)?.closest?.(".fx-tilt, .glass-card, [class*='rounded-2xl']") as HTMLElement | null;
      document.querySelectorAll<HTMLElement>(".fx-tilting").forEach((el) => {
        if (el !== card) { el.style.transform = ""; el.classList.remove("fx-tilting"); }
      });
      if (card && e.pointerType === "mouse" && card.offsetHeight < 700) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.classList.add("fx-tilting");
        card.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Scroll reveal for sections, headings, cards, images
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("fx-in"); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    const scan = () => {
      document.querySelectorAll<HTMLElement>("main section h1, main section h2, main section p, section h1, section h2, section .grid > *, main img, .grid > a, .grid > div")
        .forEach((el, i) => {
          if (el.dataset.fx) return;
          el.dataset.fx = "1";
          el.classList.add("fx-reveal");
          el.style.transitionDelay = `${(i % 6) * 80}ms`;
          io.observe(el);
        });
    };
    const t = setTimeout(scan, 50);
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { clearTimeout(t); mo.disconnect(); io.disconnect(); };
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 h-[3px] z-[100] fx-progress" style={{ width: `${progress}%` }} />
      <div ref={glowRef} className="fx-glow pointer-events-none fixed top-0 left-0 z-0 hidden md:block" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="fx-particle" style={{
            left: `${(i * 53) % 100}%`, animationDelay: `${(i * 0.9) % 12}s`,
            animationDuration: `${10 + (i % 7) * 2}s`, width: 3 + (i % 4), height: 3 + (i % 4),
          }} />
        ))}
      </div>
      <div className={`fx-curtain ${curtain ? "fx-curtain-on" : ""}`} aria-hidden>
        <span className="font-heading text-3xl md:text-5xl font-bold text-gradient-gold">LuxeRide</span>
      </div>
    </>
  );
};

export default MotionFX;
