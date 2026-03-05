import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-24 md:bottom-8 right-4 z-40 w-11 h-11 rounded-full gold-gradient flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 transition-transform animate-scale-in">
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;
