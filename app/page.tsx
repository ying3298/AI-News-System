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
        {/* Personalized quick scan — top stories matching user interests */}
        <SimpleSummary stories={Object.values(content.sections).flat()} />

        <section className={styles.intro}>
          <p className={styles.tagline}>
            {Object.values(content.sections).flat().length} AI stories curated today
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
