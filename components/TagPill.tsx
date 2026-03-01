"use client";

interface Props {
  label: string;
  followed?: boolean;
  onToggle?: (tag: string) => void;
}

export default function TagPill({ label, followed, onToggle }: Props) {
  if (onToggle) {
    return (
      <button
        className={`tag-pill ${followed ? "tag-pill--followed" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle(label);
        }}
        aria-pressed={followed}
        type="button"
      >
        {label}
      </button>
    );
  }

  return <span className="tag-pill">{label}</span>;
}
