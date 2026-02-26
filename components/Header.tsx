import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href="/" className={styles.navLink}>
            <span className={styles.dot} />
            FEED
          </Link>
          <Link href="/archive/" className={styles.navLink}>
            <span className={styles.dot} />
            INDEX
          </Link>
          <Link href="/section/tools/" className={styles.navLink}>
            <span className={styles.dot} />
            CATEGORIES
          </Link>
        </div>

        <Link href="/" className={styles.logo}>
          THE AI FEED
        </Link>

        <div className={styles.right}>
          <span className={styles.navLink} style={{ opacity: 0.4 }}>
            Search
          </span>
        </div>
      </nav>
    </header>
  );
}
