import styles from "./SectionHeader.module.css";

interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  return <h2 className={styles.header}>{title}</h2>;
}
