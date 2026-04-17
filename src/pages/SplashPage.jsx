import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fadeIn = setTimeout(() => setVisible(true), 20);
    const fadeOut = setTimeout(() => setVisible(false), 780);
    const goNext = setTimeout(() => navigate("/landing", { replace: true }), 1200);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
      clearTimeout(goNext);
    };
  }, [navigate]);

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#121212] px-6">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(#3a352c 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />
      <div className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
        <span className="material-symbols-outlined text-4xl text-[#e9c176] sm:text-5xl">hub</span>
        <h1 className="font-headline text-3xl italic tracking-[-0.02em] text-[#e9c176] sm:text-4xl">Philosift</h1>
      </div>
    </div>
  );
}
