import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>THE AI FEED</div>
        <p className={styles.tagline}>
          A daily curated collection of the most important developments in
          artificial intelligence.
        </p>
        <div className={styles.meta}>
          <span>Auto-updated daily at 6 AM EST</span>
          <span>Powered by RSS + Claude</span>
        </div>
      </div>
    </footer>
  );
}
