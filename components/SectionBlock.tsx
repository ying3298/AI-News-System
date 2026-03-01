import type { NewsItem, SectionSlug } from "@/lib/types";
import { SECTION_META } from "@/lib/types";
import NewsCard from "./NewsCard";
import styles from "./SectionBlock.module.css";

interface Props {
  slug: SectionSlug;
  items: NewsItem[];
  isFollowed?: (tag: string) => boolean;
  toggleFollow?: (tag: string) => void;
  followedTopics?: string[];
}

export default function SectionBlock({ slug, items, isFollowed, toggleFollow, followedTopics = [] }: Props) {
  if (items.length === 0) return null;

  const meta = SECTION_META[slug];

  return (
    <section className={styles.block}>
      <div className={styles.header}>
        <span className={styles.dot} data-section={slug} />
        <h3 className={styles.label}>{meta.label}</h3>
        <span className={styles.count}>
          {items.length} {items.length === 1 ? "story" : "stories"}
        </span>
      </div>
      <div className={styles.grid}>
        {items.map((item) => {
          const tags = item.normalizedTags || item.tags.map((t) => t.toLowerCase());
          const hasFollowedTag = followedTopics.length > 0 && tags.some((t) => followedTopics.includes(t));

          return (
            <NewsCard
              key={item.id}
              item={item}
              isFollowing={hasFollowedTag}
              isFollowed={isFollowed}
              toggleFollow={toggleFollow}
            />
          );
        })}
      </div>
    </section>
  );
}
