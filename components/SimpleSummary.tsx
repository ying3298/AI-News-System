import styles from "./SimpleSummary.module.css";

interface Props {
  text: string;
  imageUrl?: string;
}

export default function SimpleSummary({ text, imageUrl }: Props) {
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
        <p className={styles.text}>{text}</p>
      </div>
    </section>
  );
}
