import { getAllDates, getDailyContent } from "@/lib/content";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import HeroHeadline from "@/components/HeroHeadline";
import SimpleSummary from "@/components/SimpleSummary";
import SectionHeader from "@/components/SectionHeader";
import NewsGrid from "@/components/NewsGrid";
import QuoteBlock from "@/components/QuoteBlock";

export function generateStaticParams() {
  return getAllDates().map((date) => ({ date }));
}

interface Props {
  params: Promise<{ date: string }>;
}

export default async function ArchiveDayPage({ params }: Props) {
  const { date } = await params;
  const content = getDailyContent(date);
  const allItems = Object.values(content.sections).flat();

  return (
    <>
      <HeroHeadline headline={content.headline} date={content.dateFormatted} />

      <div className="page-container">
        <SimpleSummary stories={allItems} />
        <SectionHeader title="Feed" />
        <NewsGrid items={allItems} />
        <QuoteBlock quote={content.quote} />
      </div>
    </>
  );
}
