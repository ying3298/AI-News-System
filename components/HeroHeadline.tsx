import type { DailyContent } from "@/lib/types";
import styles from "./HeroHeadline.module.css";

interface Props {
  headline: DailyContent["headline"];
  date: string;
}

export default function HeroHeadline({ headline, date }: Props) {
  return (
    <section className={`${styles.hero} ${headline.imageUrl ? styles.hasImage : ""}`}>
      <div className={styles.content}>
        <span className={styles.date}>{date}</span>
        <h1 className={styles.title}>{headline.title}</h1>
        <p className={styles.summary}>{headline.summary}</p>
        <a
          href={headline.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-arrow"
        >
          Learn more &rarr;
        </a>
      </div>
      {headline.imageUrl && (
        <div className={styles.imageWrapper}>
          <img src={headline.imageUrl} alt="" className={styles.heroImage} />
        </div>
      )}
    </section>
  );
}
