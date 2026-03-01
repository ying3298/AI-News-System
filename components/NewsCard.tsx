import Link from "next/link";
import type { NewsItem } from "@/lib/types";
import { TOOL_SUB_LABELS } from "@/lib/types";
import TagPill from "./TagPill";
import SaveButton from "./SaveButton";
import styles from "./NewsCard.module.css";

interface Props {
  item: NewsItem;
  featured?: boolean;
  isFollowing?: boolean;
  isFollowed?: (tag: string) => boolean;
  toggleFollow?: (tag: string) => void;
}

export default function NewsCard({ item, featured, isFollowing, isFollowed, toggleFollow }: Props) {
  return (
    <Link
      href={`/story/${item.id}/`}
      className={`${styles.card} ${featured ? styles.featured : ""} ${isFollowing ? styles.following : ""}`}
    >
      {item.imageUrl ? (
        <div className={styles.imageWrapper}>
          <img src={item.imageUrl} alt="" className={styles.image} loading="lazy" />
        </div>
      ) : (
        <div className={styles.imageFallback} data-section={item.section} />
      )}

      <div className={styles.top}>
        <div className={styles.topLeft}>
          <span className="story-id">{item.id}</span>
          {item.section === "tools" && item.toolSubcategory && TOOL_SUB_LABELS[item.toolSubcategory] && (
            <span className={styles.subLabel}>{TOOL_SUB_LABELS[item.toolSubcategory]}</span>
          )}
        </div>
        <div className={styles.topRight}>
          <span className={styles.source}>
            {item.sourceName}
            <svg className={styles.externalIcon} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 1.5H10.5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <SaveButton
            story={{
              id: item.id,
              title: item.title,
              summary: item.summary,
              section: item.section,
              sourceName: item.sourceName,
              sourceUrl: item.sourceUrl,
              imageUrl: item.imageUrl,
              savedAt: "",
            }}
          />
        </div>
      </div>

      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.summary}>{item.summary}</p>

      <div className={styles.bottom}>
        <div className={styles.tags}>
          {item.tags.map((tag) => (
            <TagPill
              key={tag}
              label={tag}
              followed={isFollowed ? isFollowed(tag) : undefined}
              onToggle={toggleFollow}
            />
          ))}
        </div>
        <span className={styles.readCta}>Full story &rarr;</span>
      </div>
    </Link>
  );
}
