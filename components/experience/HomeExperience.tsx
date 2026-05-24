"use client";

import dynamic from "next/dynamic";
import { ExperienceOrchestrator } from "@/components/experience/ExperienceOrchestrator";

/** Load showroom only on client — keeps Next router context stable */
const ShowroomExperience = dynamic(
  () =>
    import("@/components/showroom/ShowroomExperience").then(
      (m) => m.ShowroomExperience
    ),
  { ssr: false }
);

export default function HomeExperience() {
  return (
    <ExperienceOrchestrator>
      <ShowroomExperience />
    </ExperienceOrchestrator>
  );
}
