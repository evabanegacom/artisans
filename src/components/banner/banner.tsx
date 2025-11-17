/*  components/Carousel.tsx  */
import React, { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Banner {
  id: number;
  image: string;
  title: string;
  description: string;
  cta?: string;
  ctaLink?: string;
  /** optional dominant colour for the gradient overlay */
  overlayColor?: string;
}

const banners: Banner[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "Artisanal Home Decor",
    description: "Elevate your space with handcrafted luxury pieces made with passion.",
    cta: "Shop Decor",
    ctaLink: "/products/Printables",
    overlayColor: "from-black/70",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "Handcrafted Artworks",
    description: "Unique pieces from global artisans — art that tells a story.",
    cta: "Explore Art",
    ctaLink: "/products/DigitalArt",
    overlayColor: "from-slate-900/70",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "Handmade Jewelry",
    description: "Timeless elegance. Each piece crafted with love and precision.",
    cta: "View Collection",
    ctaLink: "/products/HandCrafted",
    overlayColor: "from-indigo-900/70",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1558655146-9f0fe8e7952e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "Digital Masterpieces",
    description: "Modern art meets technology. Own a piece of the future.",
    cta: "Browse Digital",
    ctaLink: "/products/TechStartups",
    overlayColor: "from-purple-900/70",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "Sell Your Startup",
    description: "Get the best value. Connect with serious buyers today.",
    cta: "List Now",
    ctaLink: "/sell-startup",
    overlayColor: "from-emerald-900/70",
  },
];

/* ------------------------------------------------------------------ */
/*                         ARROW COMPONENTS (typed)                   */
/* ------------------------------------------------------------------ */
const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Next slide"
    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-lg transition-all hover:bg-white/40 focus-visible:ring-4 focus-visible:ring-white/50"
  >
    <FiChevronRight className="text-2xl text-white" />
  </button>
);

const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Previous slide"
    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-lg transition-all hover:bg-white/40 focus-visible:ring-4 focus-visible:ring-white/50"
  >
    <FiChevronLeft className="text-2xl text-white" />
  </button>
);

/* ------------------------------------------------------------------ */
/*                           MAIN CAROUSEL                              */
/* ------------------------------------------------------------------ */
const Carousel: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const shouldReduceMotion = useReducedMotion();

  const baseSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <motion.div
        whileHover={{ scale: 1.4 }}
        className="h-3 w-3 rounded-full bg-white/70 backdrop-blur-sm transition-all hover:bg-white"
      />
    ),
    responsive: [
      { breakpoint: 640, settings: { arrows: false } },
    ],
  };

  /* ------------------------------------------------------------------ */
  /*                     Keyboard navigation (optional)                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") sliderRef.current?.slickNext();
      if (e.key === "ArrowLeft") sliderRef.current?.slickPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section className="relative overflow-hidden" aria-roledescription="carousel">
      {/* Wave divider (bottom) */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-full text-white dark:text-gray-900"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C360,80 1080,40 1440,0 V120 H0 Z"
            className="fill-current"
          />
        </svg>
      </div>

      <Slider ref={sliderRef} {...baseSettings}>
        {banners.map((banner) => (
          <SlideItem key={banner.id} banner={banner} reduceMotion={shouldReduceMotion as any} />
        ))}
      </Slider>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*                           SINGLE SLIDE ITEM                         */
/* ------------------------------------------------------------------ */
interface SlideItemProps {
  banner: Banner;
  reduceMotion: boolean;
}
const SlideItem: React.FC<SlideItemProps> = ({ banner, reduceMotion }) => {
  const overlay = banner.overlayColor ?? "from-black/70";

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[720px]" role="group" aria-roledescription="slide">
      {/* ---------- BACKGROUND (Ken‑Burns) ---------- */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner.image})` }}
        initial={reduceMotion ? {} : { scale: 1 }}
        animate={reduceMotion ? {} : { scale: 1.12 }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        {/* Gradient overlay (dynamic) */}
        <div className={`absolute inset-0 bg-gradient-to-r ${overlay} via-black/30 to-transparent`} />
      </motion.div>

      {/* ---------- LAZY IMAGE (fallback for SEO) ---------- */}
      <LazyLoadImage
        src={banner.image}
        alt={banner.title}
        effect="blur"
        placeholderSrc={banner.image.replace(/w=\d+/, "w=10")}
        className="absolute inset-0 h-full w-full object-cover"
        wrapperClassName="absolute inset-0"
      />

      {/* ---------- CONTENT ---------- */}
      <div className="relative flex h-full items-center justify-start px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={reduceMotion ? {} : { opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-5"
            >
              <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
                {banner.title}
              </h1>

              <p className="text-lg font-medium text-white/90 drop-shadow-md md:text-xl lg:text-2xl">
                {banner.description}
              </p>

              {banner.cta && (
                <motion.a
                  href={banner.ctaLink}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-950 to-red-800 px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
                  aria-label={`Go to ${banner.cta}`}
                >
                  {banner.cta}
                  <FiArrowRight className="text-xl" />
                </motion.a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Carousel;