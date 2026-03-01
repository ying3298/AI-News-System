"use client";

import { useState } from "react";
import type { NewsItem } from "@/lib/types";
import DepthToggle, { type DepthLevel } from "./DepthToggle";
import TagPill from "./TagPill";
import StorySaveButton from "./StorySaveButton";
import StoryThread from "./StoryThread";
import styles from "@/app/story/[id]/story.module.css";

interface Props {
  item: NewsItem;
  dateFormatted: string;
  sectionLabel: string;
}

export default function StoryContent({ item, dateFormatted, sectionLabel }: Props) {
  const [depth, setDepth] = useState<DepthLevel>("standard");

  const hasSimple = !!item.contentSimple;

  return (
    <article className={styles.article}>
      {item.imageUrl && (
        <div className={styles.heroBanner}>
          <img src={item.imageUrl} alt="" className={styles.heroBannerImage} />
        </div>
      )}

      <div className={styles.meta}>
        <span className="story-id">{item.id}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.metaText}>{sectionLabel}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.metaText}>{dateFormatted}</span>
        {item.readTime && (
          <>
            <span className={styles.separator}>/</span>
            <span className={styles.metaText}>{item.readTime} read</span>
          </>
        )}
        <span className={styles.separator}>/</span>
        <StorySaveButton
          story={{
            id: item.id,
            title: item.title,
            summary: item.summary,
            section: item.section,
            sourceName: item.sourceName,
            sourceUrl: item.sourceUrl,
            imageUrl: item.imageUrl,
            savedAt: "",
          }}
        />
      </div>

      <h1 className={styles.title}>{item.title}</h1>

      <DepthToggle onChange={setDepth} hasSimple={hasSimple} />

      {/* Simple depth: plain-language version */}
      {depth === "simple" && item.contentSimple && (
        <p className={styles.summary}>{item.contentSimple}</p>
      )}

      {/* Standard depth: summary + content */}
      {depth === "standard" && (
        <>
          <p className={styles.summary}>{item.summary}</p>
          {item.content && (
            <div className={styles.contentBody}>
              <p>{item.content}</p>
            </div>
          )}
        </>
      )}

      {/* Deep depth: everything */}
      {depth === "deep" && (
        <>
          <p className={styles.summary}>{item.summary}</p>
          {item.content && (
            <div className={styles.contentBody}>
              <p>{item.content}</p>
            </div>
          )}

          {item.keyTakeaways && item.keyTakeaways.length > 0 && (
            <div className={styles.takeaways}>
              <h2 className={styles.subheading}>Key Takeaways</h2>
              <ul className={styles.takeawayList}>
                {item.keyTakeaways.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {item.whyItMatters && (
            <div className={styles.matters}>
              <h2 className={styles.subheading}>Why It Matters</h2>
              <p>{item.whyItMatters}</p>
            </div>
          )}
        </>
      )}

      {/* Story Threads — shown at all depths */}
      {item.relatedStories && item.relatedStories.length > 0 && (
        <StoryThread relatedStories={item.relatedStories} />
      )}

      <div className={styles.tags}>
        {item.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>

      <div className={styles.source}>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-arrow"
        >
          Read original at {item.sourceName} &rarr;
        </a>
      </div>

      <a href="/" className={styles.back}>
        &larr; Back to feed
      </a>
    </article>
  );
}
