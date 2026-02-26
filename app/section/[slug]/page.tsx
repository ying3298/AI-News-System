import { getLatestContent, getSectionSlugs } from "@/lib/content";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import SectionHeader from "@/components/SectionHeader";
import NewsGrid from "@/components/NewsGrid";
import Link from "next/link";

export function generateStaticParams() {
  return getSectionSlugs().map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SectionPage({ params }: Props) {
  const { slug } = await params;
  const content = getLatestContent();
  const sectionSlug = slug as SectionSlug;
  const meta = SECTION_META[sectionSlug];
  const items = content.sections[sectionSlug] || [];

  return (
    <div className="page-container" style={{ paddingTop: "var(--space-xl)" }}>
      <SectionHeader title={meta.label} />

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "var(--space-xl)",
          flexWrap: "wrap",
        }}
      >
        {getSectionSlugs().map((s) => (
          <Link
            key={s}
            href={`/section/${s}/`}
            className="tag-pill"
            style={
              s === sectionSlug
                ? {
                    background: "var(--color-text)",
                    color: "var(--color-bg)",
                    borderColor: "var(--color-text)",
                  }
                : {}
            }
          >
            {SECTION_META[s].label}
          </Link>
        ))}
      </div>

      <NewsGrid items={items} />
    </div>
  );
}
