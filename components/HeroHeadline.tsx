"use client";

import { useEffect, useRef, useState } from "react";
import type { DailyContent } from "@/lib/types";
import styles from "./HeroHeadline.module.css";

interface Props {
  headline: DailyContent["headline"];
  date: string;
}

export default function HeroHeadline({ headline, date }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax scroll effect — image moves slower than scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const opacityFade = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${isLoaded ? styles.loaded : ""}`}
    >
      {/* Full-bleed background image with parallax */}
      {headline.imageUrl ? (
        <div
          ref={imageRef}
          className={styles.imageLayer}
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <img
            src={headline.imageUrl}
            alt=""
            className={styles.heroImage}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      ) : (
        <div className={styles.imageFallback} />
      )}

      {/* Gradient scrim for text readability */}
      <div className={styles.scrim} />

      {/* Ambient glow from the image */}
      <div className={styles.ambientGlow} />

      {/* Content overlay */}
      <div
        className={styles.content}
        style={{ opacity: opacityFade }}
      >
        <div className={styles.meta}>
          <span className={styles.badge}>Lead Story</span>
          <span className={styles.date}>{date}</span>
        </div>
        <h1 className={styles.title}>{headline.title}</h1>
        <p className={styles.summary}>{headline.summary}</p>
        <a
          href={headline.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.readMore}
        >
          <span>Read full story</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} style={{ opacity: opacityFade }}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
