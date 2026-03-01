import styles from "./SimpleSummary.module.css";

interface QuickItem {
  name: string;
  note: string;
}

interface Props {
  text: string | string[];
  imageUrl?: string;
}

/**
 * Prototype: personalized quick-scan summary.
 * Hardcoded persona = designer who cares about creative & tools.
 * TODO: replace with real personalization from onboarding prefs.
 */
const PROTO_ITEMS: QuickItem[] = [
  { name: "Claude App", note: "Now #2 free app on the App Store — jumped charts after Pentagon news" },
  { name: "Google Intrinsic", note: "Building an 'Android for robots' — open platform for robotics AI" },
  { name: "OpenAI + Pentagon", note: "Signed a military deal with safety guardrails, hours after Anthropic was banned" },
  { name: "Block AI", note: "Jack Dorsey cut 40% of jobs, replacing them with AI automation" },
  { name: "Google Quantum", note: "Made web encryption quantum-proof using a new certificate system" },
];

export default function SimpleSummary({ text, imageUrl }: Props) {
  // Use prototype data for now (will be dynamic with personalization)
  const items = PROTO_ITEMS;

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Your quick scan</span>
          <span className={styles.count}>{items.length} stories</span>
        </div>
        <div className={styles.items}>
          {items.map((item, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.note}>{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
