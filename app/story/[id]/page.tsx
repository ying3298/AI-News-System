import { getAllStoryIds, getStoryById } from "@/lib/content";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import TagPill from "@/components/TagPill";
import Link from "next/link";
import styles from "./story.module.css";

export function generateStaticParams() {
  return getAllStoryIds().map(({ id }) => ({ id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: Props) {
  const { id } = await params;
  const result = getStoryById(id);

  if (!result) {
    return (
      <div className="page-container" style={{ paddingTop: "var(--space-xl)" }}>
        <p>Story not found.</p>
        <Link href="/" className="link-arrow" style={{ marginTop: "var(--space-md)", display: "inline-flex" }}>
          Back to feed &rarr;
        </Link>
      </div>
    );
  }

  const { item, dateFormatted } = result;
  const sectionLabel = SECTION_META[item.section as SectionSlug]?.label ?? item.section;

  return (
    <div className="page-container" style={{ paddingTop: "var(--space-xl)" }}>
      <article className={styles.article}>
        {item.imageUrl && (
          <div className={styles.heroBanner}>
            <img src={item.imageUrl} alt="" className={styles.heroBannerImage} />
          </div>
        )}

        <div className={styles.meta}>
          <span className="story-id">{item.id}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.metaText}>{sectionLabel}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.metaText}>{dateFormatted}</span>
          {item.readTime && (
            <>
              <span className={styles.separator}>/</span>
              <span className={styles.metaText}>{item.readTime} read</span>
            </>
          )}
        </div>

        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.summary}>{item.summary}</p>

        {item.keyTakeaways && item.keyTakeaways.length > 0 && (
          <div className={styles.takeaways}>
            <h2 className={styles.subheading}>Key Takeaways</h2>
            <ul className={styles.takeawayList}>
              {item.keyTakeaways.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {item.whyItMatters && (
          <div className={styles.matters}>
            <h2 className={styles.subheading}>Why It Matters</h2>
            <p>{item.whyItMatters}</p>
          </div>
        )}

        <div className={styles.tags}>
          {item.tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>

        <div className={styles.source}>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow"
          >
            Read original at {item.sourceName} &rarr;
          </a>
        </div>

        <Link href="/" className={styles.back}>
          &larr; Back to feed
        </Link>
      </article>
    </div>
  );
}
