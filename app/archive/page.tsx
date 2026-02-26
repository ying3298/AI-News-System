import { getAllDates } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import styles from "./archive.module.css";

export default function ArchivePage() {
  const dates = getAllDates();

  return (
    <div className="page-container" style={{ paddingTop: "var(--space-xl)" }}>
      <SectionHeader title="Index" />
      <p className={styles.subtitle}>Browse previous editions of The AI Feed.</p>

      <div className={styles.list}>
        {dates.map((date, i) => (
          <Link key={date} href={`/archive/${date}/`} className={styles.item}>
            <span className="story-id">ED-{String(dates.length - i).padStart(3, "0")}</span>
            <span className={styles.date}>{formatDate(date)}</span>
            <span className={styles.arrow}>&rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
