import Link from "next/link";
import { getLatestContent } from "@/lib/content";
import SearchOverlay from "./SearchOverlay";
import SavedNavLink from "./SavedNavLink";
import styles from "./Header.module.css";

export default function Header() {
  const content = getLatestContent();
  const allItems = Object.values(content.sections).flat();

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
            ARCHIVE
          </Link>
          <SavedNavLink />
        </div>

        <Link href="/" className={styles.logo}>
          THE AI FEED
        </Link>

        <div className={styles.right}>
          <SearchOverlay items={allItems} />
        </div>
      </nav>
    </header>
  );
}
