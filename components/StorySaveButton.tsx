"use client";

import SaveButton from "./SaveButton";
import type { SavedStory } from "@/lib/useSavedStories";

interface Props {
  story: SavedStory;
}

export default function StorySaveButton({ story }: Props) {
  return <SaveButton story={story} size="md" />;
}
