import { getLatestContent } from "@/lib/content";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import HeroHeadline from "@/components/HeroHeadline";
import SimpleSummary from "@/components/SimpleSummary";
import SectionHeader from "@/components/SectionHeader";
import NewsGrid from "@/components/NewsGrid";
import QuoteBlock from "@/components/QuoteBlock";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const content = getLatestContent();
  const allItems = Object.values(content.sections).flat();

  return (
    <>
      <HeroHeadline headline={content.headline} date={content.dateFormatted} />

      <div className="page-container">
        <section className={styles.intro}>
          <p className={styles.tagline}>
            An ever-growing collection of carefully curated AI developments from
            around the world.
          </p>
          <Link href="/archive/" className="link-arrow">
            Explore &rarr;
          </Link>
        </section>

        <SimpleSummary text={content.simpleSummary} />

        <SectionHeader title="Feed" />
        <NewsGrid items={allItems} />

        {/* Section quick links */}
        <div className={styles.sections}>
          {(Object.keys(content.sections) as SectionSlug[]).map((slug) => (
            <Link
              key={slug}
              href={`/section/${slug}/`}
              className={styles.sectionLink}
            >
              <span className={styles.sectionName}>
                {SECTION_META[slug].label}
              </span>
              <span className={styles.sectionCount}>
                {content.sections[slug].length} stories
              </span>
              <span className={styles.arrow}>&rarr;</span>
            </Link>
          ))}
        </div>

        <QuoteBlock quote={content.quote} />
      </div>
    </>
  );
}
