import type { NewsItem } from "@/lib/types";
import NewsCard from "./NewsCard";
import styles from "./NewsGrid.module.css";

interface Props {
  items: NewsItem[];
}

export default function NewsGrid({ items }: Props) {
  return (
    <div className={styles.grid}>
      {items.map((item, i) => (
        <NewsCard key={item.id} item={item} featured={i === 0} />
      ))}
    </div>
  );
}
