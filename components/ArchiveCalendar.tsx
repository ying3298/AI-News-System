"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ArchiveCalendar.module.css";

interface Props {
  contentDates: string[]; // YYYY-MM-DD format
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ArchiveCalendar({ contentDates }: Props) {
  const dateSet = new Set(contentDates);

  // Start with the month of the most recent content date
  const latestDate = contentDates[0]
    ? new Date(contentDates[0] + "T12:00:00Z")
    : new Date();

  const [year, setYear] = useState(latestDate.getUTCFullYear());
  const [month, setMonth] = useState(latestDate.getUTCMonth());

  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const firstDayOfWeek = new Date(Date.UTC(year, month, 1)).getUTCDay();

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const toDateStr = (day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.navBtn} onClick={prevMonth}>
          &larr;
        </button>
        <span className={styles.monthYear}>
          {MONTH_NAMES[month]} {year}
        </span>
        <button className={styles.navBtn} onClick={nextMonth}>
          &rarr;
        </button>
      </div>

      <div className={styles.grid}>
        {DAY_LABELS.map((d) => (
          <div key={d} className={styles.dayLabel}>
            {d}
          </div>
        ))}

        {days.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className={styles.empty} />;
          }

          const dateStr = toDateStr(day);
          const hasContent = dateSet.has(dateStr);
          const isToday =
            dateStr ===
            new Date().toISOString().split("T")[0];

          if (hasContent) {
            return (
              <Link
                key={dateStr}
                href={`/archive/${dateStr}/`}
                className={`${styles.day} ${styles.hasContent} ${isToday ? styles.today : ""}`}
              >
                {day}
              </Link>
            );
          }

          return (
            <div
              key={dateStr}
              className={`${styles.day} ${isToday ? styles.today : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <p className={styles.hint}>
        {contentDates.length} edition{contentDates.length !== 1 ? "s" : ""} published.
        Days with content are highlighted.
      </p>
    </div>
  );
}
