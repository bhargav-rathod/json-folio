"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { parseText } from "../utils/textParser";

interface ExperienceItem {
  id: number;
  title: string;
  period: string;
  company: string;
  location: string;
  description: string[];
  tags: string[];
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // More pronounced parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0.5]);

  return (
    <div ref={ref} className="relative py-12">
      {/* Subtle animated background */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="absolute top-20 left-1/3 w-72 h-72 rounded-full bg-purple-600 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-pink-600 blur-[120px]" />
      </motion.div>

      {/* Timeline line */}
      <div className="absolute left-6 sm:left-10 md:left-16 top-0 bottom-0">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="w-px bg-gradient-to-b from-purple-500 via-pink-500 to-transparent"
        />
      </div>

      <div className="space-y-10 relative">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="pl-14 sm:pl-20 md:pl-28 pr-0"
          >
            {/* Timeline node */}
            <div className="absolute left-4 sm:left-8 md:left-14 translate-y-3">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                viewport={{ once: true }}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/40 flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </motion.div>
            </div>

            {/* Card */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-6 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8 backdrop-blur-sm transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">{exp.title}</h3>
                  <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium mt-1">
                    {exp.company}
                  </p>
                </div>
                <div className="text-sm text-gray-300 lg:text-right">
                  <p className="font-medium">{exp.period}</p>
                  <p className="text-xs text-gray-400 mt-1">{exp.location}</p>
                </div>
              </div>

              {Array.isArray(exp.tags) && exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-5">
                  {exp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs uppercase tracking-wide bg-gray-900/70 border border-gray-700 text-gray-200 px-2.5 py-1.5 sm:px-3 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <ul className="mt-4 space-y-3 list-disc list-outside ml-5 pl-2">
                {exp.description.map((item, i) => (
                  <motion.li
                    key={i}
                    className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    viewport={{ once: true }}
                  >
                    {parseText(item)}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;