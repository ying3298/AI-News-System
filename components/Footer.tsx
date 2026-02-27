import Link from "next/link";
import { getLatestContent } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  let statusLabel = "Auto-updated daily at 6 AM EST";
  let statusClass = styles.statusFresh;

  try {
    const content = getLatestContent();
    if (content.generatedAt) {
      const genDate = new Date(content.generatedAt);
      const now = new Date();
      const hoursAgo = (now.getTime() - genDate.getTime()) / (1000 * 60 * 60);

      const formatted = genDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      if (hoursAgo > 36) {
        statusLabel = `Last updated ${formatted} — content may be stale`;
        statusClass = styles.statusStale;
      } else {
        statusLabel = `Last updated ${formatted}`;
      }
    }
  } catch {
    // Content not available yet
  }

  return (
    <footer className={styles.footer}>
      {/* Engagement CTA — give users a reason to come back */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaText}>
            <h3 className={styles.ctaTitle}>Never miss a day</h3>
            <p className={styles.ctaDesc}>
              Bookmark this page or add it to your daily routine. New stories
              every morning at 6 AM EST.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/archive/" className="link-arrow">
              Browse archive &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.footerGrid}>
          <div className={styles.footerAbout}>
            <div className={styles.brand}>THE AI FEED</div>
            <p className={styles.tagline}>
              A daily curated collection of the most important developments in
              artificial intelligence.
            </p>
          </div>
          <div className={styles.footerNav}>
            <span className={styles.footerNavLabel}>Navigate</span>
            <Link href="/" className={styles.footerLink}>Today&apos;s Feed</Link>
            <Link href="/archive/" className={styles.footerLink}>Archive</Link>
          </div>
          <div className={styles.footerNav}>
            <span className={styles.footerNavLabel}>Categories</span>
            <span className={styles.footerLink}>Use filter buttons on the feed</span>
          </div>
        </div>
        <div className={styles.meta}>
          <span className={styles.status}>
            <span className={`${styles.dot} ${statusClass}`} />
            {statusLabel}
          </span>
          <span>Powered by RSS + Claude</span>
        </div>
      </div>
    </footer>
  );
}
