import type { NewsItem } from "@/lib/types";
import TagPill from "./TagPill";
import styles from "./NewsCard.module.css";

interface Props {
  item: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ item, featured }: Props) {
  return (
    <a
      href={item.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      <div className={styles.top}>
        <span className="story-id">{item.id}</span>
        <span className={styles.source}>{item.sourceName}</span>
      </div>

      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.summary}>{item.summary}</p>

      <div className={styles.tags}>
        {item.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </a>
  );
}
