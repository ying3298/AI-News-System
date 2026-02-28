import styles from "./SimpleSummary.module.css";

interface Props {
  text: string;
}

export default function SimpleSummary({ text }: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.icon}>💡</span>
        <span className={styles.label}>Today in simple words</span>
      </div>
      <p className={styles.text}>{text}</p>
    </section>
  );
}
