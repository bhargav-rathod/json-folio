import { motion } from "framer-motion";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import type { PortfolioData } from "../../types/portfolio-data.type";

interface EducationSectionProps {
  education: PortfolioData["education"];
}

export default function EducationSection({ education }: EducationSectionProps) {
  if (!education.enabled) return null;

  return (
    <section id="education" className="py-12">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 md:mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {education.title.split(education.highlight)[0]}
        <span className="text-purple-400"> {education.highlight}</span>
      </motion.h2>

      <div className="max-w-6xl mx-auto bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
        {education.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`p-6 ${
              index !== education.items.length - 1 ? 'border-b border-gray-700' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-purple-400">{item.degree}</h3>
                    <p className="text-sm text-gray-300">{item.stream}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-200">{item.institute}</h4>
                    <p className="text-sm text-purple-400 font-medium">{item.result}</p>
                  </div>
                </div>

              <div className="flex flex-col gap-2 text-sm text-gray-400 md:text-right">
                <div className="flex items-center gap-1 md:justify-end">
                  <FiCalendar className="text-purple-400" />
                  <span>{item.duration}</span>
                </div>
                <div className="flex items-center gap-1 md:justify-end">
                  <FiMapPin className="text-purple-400" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 