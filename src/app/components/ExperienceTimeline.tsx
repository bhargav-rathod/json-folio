"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

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
    <div ref={ref} className="relative px-4 sm:px-6 md:px-12 py-12 overflow-hidden">
      {/* Enhanced animated background elements */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600 blur-[100px]" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full bg-pink-600 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full bg-indigo-600 blur-[150px] opacity-70" />
      </motion.div>

      {/* Timeline vertical line with improved gradient */}
      <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 flex justify-center">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ 
            duration: 1.5, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3
          }}
          viewport={{ once: true }}
          className="w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent relative"
        >
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-purple-500/80 via-pink-500/50 to-transparent"
          />
          {/* Glowing pulse effect */}
          <motion.div
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 right-0 h-8 bg-purple-500/20 blur-sm"
          />
        </motion.div>
      </div>

      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          style={{ y: index % 2 === 0 ? y2 : y1 }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.15,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          className={`mb-20 flex flex-col-reverse sm:flex-col-reverse md:flex-row ${
            index % 2 === 0 ? "" : "md:flex-row-reverse"
          }`}
        >
          {/* Enhanced dot with connector line */}
          <div className="relative flex justify-start md:justify-center md:items-center md:w-1/2">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 12,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 z-10 ${
                index % 2 === 0 ? "md:mr-8" : "md:ml-8"
              }`}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1], 
                  opacity: [0.8, 1, 0.8],
                  rotate: [0, 15, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-3 h-3 bg-white rounded-full"
              />
            </motion.div>
            
            {/* Connector line animation */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: index * 0.25 }}
              viewport={{ once: true }}
              className={`hidden md:block absolute h-0.5 bg-gradient-to-r ${
                index % 2 === 0 
                  ? "from-purple-500/30 to-transparent left-12" 
                  : "from-transparent to-pink-500/30 right-12"
              }`}
            />
          </div>

          {/* Enhanced Experience Card */}
          <div className={`mt-6 md:mt-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
            <motion.div
              whileHover={{
                y: -10,
                borderColor: "#9333ea",
                boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="bg-gray-800/80 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
            >
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl" />
                <div className="absolute inset-0.5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-[11px]" />
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <motion.h3
                      whileHover={{ x: 3 }}
                      className="text-xl md:text-2xl font-bold text-white"
                    >
                      {exp.title}
                    </motion.h3>
                    <motion.p
                      whileHover={{ x: 3 }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium mt-1"
                    >
                      {exp.company}
                    </motion.p>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="text-sm text-gray-300 font-medium">{exp.period}</p>
                    <p className="text-xs text-gray-400 mt-1">{exp.location}</p>
                  </div>
                </div>

                {/* Enhanced Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: 0.1 * i,
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                      }}
                      viewport={{ once: true }}
                      className="text-xs bg-gray-700/70 text-gray-200 px-3 py-1.5 rounded-full border border-gray-600 hover:border-purple-400 hover:text-white transition-all"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <ul className="mt-5 space-y-3.5">
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.1 * i,
                        type: "spring",
                        stiffness: 400,
                        damping: 12
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.span
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 15, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 2 + i,
                        }}
                        className="text-purple-400 mr-2.5 mt-1 flex-shrink-0 group-hover:text-pink-400 transition-colors"
                      >
                        <FiArrowRight size={16} />
                      </motion.span>
                      <span className="text-gray-300 group-hover:text-gray-100 transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;