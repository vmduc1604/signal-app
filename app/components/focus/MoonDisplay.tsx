"use client";

export default function MoonDisplay() {
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
  return (
    <div className="flex justify-center items-center my-12">
      <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-(--primary)/5 blur-[80px] scale-90"></div>
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl shadow-(--primary)/10 transition-transform duration-[2000ms]">
          <img
            alt="High detail 3D full moon with craters"
            className="w-full h-full object-cover filter brightness-110 contrast-125 saturate-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBonHJKbIdirdJObI_pjFzOnInYv2Hnc31m7X85RpFISPfoa5DQB7sT-MNcs42JCGk3cFGCaZEUgcHRN_fn-CBR1I-f5P1req9uzal7LpeWw56ABgd0KWDH22Byvm0ShEKHC0hGZA9qPtGmlCZHcQK1F22nvuqNPB7GaN-HDxwELiNnZMnaJi30Q1IK69gowHnDo2Or959lVy4QACAe4k0INVBAe8x2ZS7krziTPlzB8sCVL1oNG870M8_-fmyyXGMVS9kK37j3-Hw"
          />
        </div>
        {isDesktop && (
          <div className="absolute w-[120%] h-[120%] border border-slate-200/20 dark:border-white/5 rounded-full animate-spin [animation-duration:60s]">
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-(--primary) rounded-full shadow-[0_0_10px_rgba(60,131,246,0.8)]"></div>
          </div>
        )}
      </div>
    </div>
  );
}
