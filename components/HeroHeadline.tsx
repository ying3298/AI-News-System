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

  const parallaxOffset = scrollY * 0.25;

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${isLoaded ? styles.loaded : ""}`}
    >
      {/* Full-bleed image showcase */}
      <div className={styles.imageSection}>
        {headline.imageUrl ? (
          <div
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
        {/* Bottom fade into content area */}
        <div className={styles.bottomFade} />
      </div>

      {/* Content on solid ground — fully readable */}
      <div className={styles.content}>
        <div className={styles.inner}>
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
      </div>
    </section>
  );
}
