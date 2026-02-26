import styles from "./SimpleSummary.module.css";

interface Props {
  text: string;
}

export default function SimpleSummary({ text }: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.label}>Today in simple words</div>
      <p className={styles.text}>{text}</p>
    </section>
  );
}
