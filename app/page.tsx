import { getLatestContent } from "@/lib/content";
import HeroHeadline from "@/components/HeroHeadline";
import SimpleSummary from "@/components/SimpleSummary";
import SectionHeader from "@/components/SectionHeader";
import FilteredFeed from "@/components/FilteredFeed";
import QuoteBlock from "@/components/QuoteBlock";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const content = getLatestContent();

  return (
    <>
      <HeroHeadline headline={content.headline} date={content.dateFormatted} />

      <div className="page-container">
        {/* Elevated simple summary — immediately after hero for quick scanners */}
        <SimpleSummary text={content.simpleSummary} imageUrl={content.simpleSummaryImageUrl} />

        <section className={styles.intro}>
          <p className={styles.tagline}>
            An ever-growing collection of carefully curated AI developments from
            around the world.
          </p>
          <Link href="/archive/" className="link-arrow">
            Archive &rarr;
          </Link>
        </section>

        <SectionHeader title="Feed" />
        <FilteredFeed sections={content.sections} />

        <QuoteBlock quote={content.quote} />
      </div>
    </>
  );
}
