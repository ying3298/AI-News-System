interface Props {
  label: string;
}

export default function TagPill({ label }: Props) {
  return <span className="tag-pill">{label}</span>;
}
