import Link from "next/link";
import type { NewsItem } from "@/lib/types";
import TagPill from "./TagPill";
import styles from "./NewsCard.module.css";

interface Props {
  item: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ item, featured }: Props) {
  return (
    <Link
      href={`/story/${item.id}/`}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      <div className={styles.top}>
        <span className="story-id">{item.id}</span>
        <span className={styles.source}>
          {item.sourceName}
          <svg className={styles.externalIcon} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 1.5H10.5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.summary}>{item.summary}</p>

      <div className={styles.bottom}>
        <div className={styles.tags}>
          {item.tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
        <span className={styles.readCta}>Read at source &rarr;</span>
      </div>
    </Link>
  );
}
