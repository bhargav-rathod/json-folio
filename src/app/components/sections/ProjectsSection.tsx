import { motion } from "framer-motion";
import type { PortfolioData } from "../../types/portfolio-data.type";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const ProjectCarousel = dynamic(() => import("../ProjectCarousel"), { ssr: false, loading: () => <div>Loading...</div> });

interface ProjectsSectionProps {
  projects: PortfolioData["projects"];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects.enabled) return null;

  return (
    <section id="portfolio" className="py-12">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 md:mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {projects.title.split(projects.highlight)[0]}
        <span className="text-purple-400"> {projects.highlight}</span>
      </motion.h2>

      <div className="relative">
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectCarousel projects={projects.items} />
        </Suspense>
      </div>
    </section>
  );
} 