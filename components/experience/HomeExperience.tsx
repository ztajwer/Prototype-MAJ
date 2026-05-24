"use client";

import { ExperienceOrchestrator } from "@/components/experience/ExperienceOrchestrator";
import { ShowroomExperience } from "@/components/showroom/ShowroomExperience";

export default function HomeExperience() {
  return (
    <ExperienceOrchestrator>
      <ShowroomExperience />
    </ExperienceOrchestrator>
  );
}
