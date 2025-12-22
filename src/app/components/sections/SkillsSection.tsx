import { motion } from "framer-motion";
import type { PortfolioData } from "../../types/portfolio-data.type";

interface SkillsSectionProps {
  skills: PortfolioData["skills"];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  if (!skills.enabled) return null;

  return (
    <section id="skills" className="py-12">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 md:mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {skills.title.split(skills.highlight)[0]}
        <span className="text-purple-400"> {skills.highlight}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.categories.map((category: PortfolioData["skills"]["categories"][number], catIndex: number) => (
            <div key={catIndex} className="space-y-3">
              <h3 className="text-sm md:text-base font-semibold text-purple-400">
                {category.name.split(category.highlight)[0]}
                <span className="text-purple-400"> {category.highlight}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    viewport={{ once: true }}
                    className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full border border-gray-600"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 