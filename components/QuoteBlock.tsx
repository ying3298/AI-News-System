import type { DailyContent } from "@/lib/types";
import styles from "./QuoteBlock.module.css";

interface Props {
  quote: DailyContent["quote"];
}

export default function QuoteBlock({ quote }: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.mark}>&ldquo;</div>
      <blockquote className={styles.text}>{quote.text}</blockquote>
      <div className={styles.author}>
        {quote.author}
        <span className={styles.title}>{quote.authorTitle}</span>
      </div>
    </section>
  );
}
