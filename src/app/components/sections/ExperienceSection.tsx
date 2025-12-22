import { motion } from "framer-motion";
import type { PortfolioData } from "../../types/portfolio-data.type";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const ExperienceTimeline = dynamic(() => import("../ExperienceTimeline"), { ssr: false, loading: () => <div>Loading...</div> });

interface ExperienceSectionProps {
  experience: PortfolioData["experience"];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  if (!experience.enabled) return null;

  return (
    <section id="experience" className="py-12">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 md:mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {experience.title.split(experience.highlight)[0]}
        <span className="text-purple-400"> {experience.highlight}</span>
      </motion.h2>
      <Suspense fallback={<div>Loading...</div>}>
        <ExperienceTimeline experiences={experience.items} />
      </Suspense>
    </section>
  );
} 