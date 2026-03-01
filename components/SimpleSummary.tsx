import styles from "./SimpleSummary.module.css";

interface Props {
  text: string | string[];
  imageUrl?: string;
}

export default function SimpleSummary({ text, imageUrl }: Props) {
  const bullets = Array.isArray(text) ? text : [text];

  return (
    <section
      className={styles.wrapper}
      style={
        imageUrl
          ? {
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {imageUrl && <div className={styles.imageOverlay} />}
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.icon}>💡</span>
          <span className={styles.label}>Today in simple words</span>
        </div>
        <ul className={styles.bullets}>
          {bullets.map((point, i) => (
            <li key={i} className={styles.bullet}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
