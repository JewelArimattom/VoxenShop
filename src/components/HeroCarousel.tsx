"use client";

import { useEffect, useRef, useState } from "react";

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  c1?: string;
  c2?: string;
}

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [slides.length]);

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }
  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  return (
    <div className="relative w-full">
      <div className="h-64 sm:h-96 rounded-lg overflow-hidden relative">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={i !== index}
          >
            <div className="w-full h-full bg-gray-100 flex items-center">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover"/>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-3xl ml-8 text-white">
                <h2 className="text-2xl sm:text-4xl font-bold drop-shadow">{s.title}</h2>
                {s.subtitle && <p className="mt-2 drop-shadow">{s.subtitle}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-3 shadow-md hover:bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-3 shadow-md hover:bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
