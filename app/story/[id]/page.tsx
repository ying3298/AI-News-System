import { getAllStoryIds, getStoryById } from "@/lib/content";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import StoryContent from "@/components/StoryContent";
import Link from "next/link";

export function generateStaticParams() {
  return getAllStoryIds().map(({ id }) => ({ id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: Props) {
  const { id } = await params;
  const result = getStoryById(id);

  if (!result) {
    return (
      <div className="page-container" style={{ paddingTop: "var(--space-xl)" }}>
        <p>Story not found.</p>
        <Link href="/" className="link-arrow" style={{ marginTop: "var(--space-md)", display: "inline-flex" }}>
          Back to feed &rarr;
        </Link>
      </div>
    );
  }

  const { item, dateFormatted } = result;
  const sectionLabel = SECTION_META[item.section as SectionSlug]?.label ?? item.section;

  return (
    <div className="page-container" style={{ paddingTop: "var(--space-xl)" }}>
      <StoryContent
        item={item}
        dateFormatted={dateFormatted}
        sectionLabel={sectionLabel}
      />
    </div>
  );
}
