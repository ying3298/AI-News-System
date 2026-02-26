import { getLatestContent } from "@/lib/content";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import HeroHeadline from "@/components/HeroHeadline";
import SimpleSummary from "@/components/SimpleSummary";
import NewsGrid from "@/components/NewsGrid";
import QuoteBlock from "@/components/QuoteBlock";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const content = getLatestContent();
  const sectionSlugs = Object.keys(content.sections) as SectionSlug[];
  const totalStories = Object.values(content.sections).flat().length;

  return (
    <>
      <HeroHeadline headline={content.headline} date={content.dateFormatted} />

      <div className="page-container">
        {/* Elevated simple summary — immediately after hero for quick scanners */}
        <SimpleSummary text={content.simpleSummary} />

        <section className={styles.intro}>
          <p className={styles.tagline}>
            An ever-growing collection of carefully curated AI developments from
            around the world.
          </p>
          <Link href="/archive/" className="link-arrow">
            Explore &rarr;
          </Link>
        </section>

        {/* Category nav above the feed — lets users jump to what they care about */}
        <nav className={styles.categoryNav}>
          <span className={styles.categoryLabel}>
            {totalStories} stories across {sectionSlugs.length} categories
          </span>
          <div className={styles.categoryPills}>
            {sectionSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/section/${slug}/`}
                className={styles.categoryPill}
              >
                {SECTION_META[slug].label}
                <span className={styles.pillCount}>
                  {content.sections[slug].length}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Sectioned feed — grouped by category instead of flat wall */}
        {sectionSlugs.map((slug) => {
          const items = content.sections[slug];
          if (items.length === 0) return null;
          return (
            <section key={slug} className={styles.feedSection} id={slug}>
              <div className={styles.feedSectionHeader}>
                <h2 className={styles.feedSectionTitle}>
                  {SECTION_META[slug].label}
                </h2>
                <Link
                  href={`/section/${slug}/`}
                  className={styles.feedSectionLink}
                >
                  View all &rarr;
                </Link>
              </div>
              <NewsGrid items={items} />
            </section>
          );
        })}

        <QuoteBlock quote={content.quote} />
      </div>
    </>
  );
}
