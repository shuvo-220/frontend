
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Find Your Perfect Creative Space",
    subtitle:
      "Discover inspiring studios and turn your creative ideas into reality.",
    button: "Explore Studios",
    href: "/studios",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    tag: "YOUR CREATIVE JOURNEY STARTS HERE",
  },
  {
    title: "Create Something Extraordinary",
    subtitle:
      "From photography studios to professional film stages, find the perfect space for your next project.",
    button: "Discover Studios",
    href: "/studios",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
    tag: "BUILT FOR CREATORS",
  },
  {
    title: "Have a Space? Start Earning Today",
    subtitle:
      "List your creative studio and connect with talented creators looking for their perfect space.",
    button: "Host Your Space",
    href: "/add-studio",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb",
    tag: "TURN YOUR SPACE INTO OPPORTUNITY",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current];

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[#090914] md:min-h-[650px]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#090914] via-[#090914]/85 to-[#090914]/30" />

      <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-center px-5 py-20 md:min-h-[650px] md:px-8">
        <div className="max-w-3xl">
          <span className="mb-6 inline-block rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-2 text-xs font-semibold tracking-[2px] text-purple-300">
            {slide.tag}
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
            {slide.title}
          </h1>

          <p className="mb-9 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={slide.href}
              className="rounded-xl bg-purple-600 px-7 py-4 font-semibold text-white transition hover:bg-purple-700"
            >
              {slide.button} →
            </Link>

            <Link
              href="/#how-it-works"
              className="rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 z-20 flex items-center gap-4 md:right-12">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:bg-purple-600"
        >
          ←
        </button>

        <div className="flex gap-2">
          {slides.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? "w-9 bg-purple-500"
                  : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:bg-purple-600"
        >
          →
        </button>
      </div>
    </section>
  );
}
