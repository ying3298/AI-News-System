import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
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
            <Link href="/section/tools/" className={styles.footerLink}>Categories</Link>
          </div>
          <div className={styles.footerNav}>
            <span className={styles.footerNavLabel}>Categories</span>
            <Link href="/section/tools/" className={styles.footerLink}>Tools &amp; Products</Link>
            <Link href="/section/research/" className={styles.footerLink}>Research</Link>
            <Link href="/section/business/" className={styles.footerLink}>Industry &amp; Business</Link>
            <Link href="/section/policy/" className={styles.footerLink}>Government &amp; Policy</Link>
            <Link href="/section/concerns/" className={styles.footerLink}>Concerns &amp; Ethics</Link>
          </div>
        </div>
        <div className={styles.meta}>
          <span>Auto-updated daily at 6 AM EST</span>
          <span>Powered by RSS + Claude</span>
        </div>
      </div>
    </footer>
  );
}
