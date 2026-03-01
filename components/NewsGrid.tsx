import type { NewsItem } from "@/lib/types";
import NewsCard from "./NewsCard";
import styles from "./NewsGrid.module.css";

interface Props {
  items: NewsItem[];
  isFollowed?: (tag: string) => boolean;
  toggleFollow?: (tag: string) => void;
  followedTopics?: string[];
}

export default function NewsGrid({ items, isFollowed, toggleFollow, followedTopics = [] }: Props) {
  return (
    <div className={styles.grid}>
      {items.map((item, i) => {
        const tags = item.normalizedTags || item.tags.map((t) => t.toLowerCase());
        const hasFollowedTag = followedTopics.length > 0 && tags.some((t) => followedTopics.includes(t));

        return (
          <NewsCard
            key={item.id}
            item={item}
            featured={i === 0}
            isFollowing={hasFollowedTag}
            isFollowed={isFollowed}
            toggleFollow={toggleFollow}
          />
        );
      })}
    </div>
  );
}
