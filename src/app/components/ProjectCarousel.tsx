import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiGithub } from "react-icons/fi";

// Project Carousel Component
export const ProjectCarousel = ({ projects }: { projects: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex"
        animate={{
          x: `-${currentIndex * 100}%`,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
      >
        {projects.map((project: any, index: any) => (
          <div
            key={index}
            className="w-full flex-shrink-0 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: currentIndex === index ? 1 : 0.7,
                scale: currentIndex === index ? 1 : 0.9
              }}
              transition={{ duration: 0.5 }}
              className={`bg-gray-800/50 rounded-xl border ${currentIndex === index ? 'border-purple-500' : 'border-gray-700'} p-6 shadow-lg transition-all duration-300`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-purple-400 mb-1">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: any, i: any) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm font-semibold text-purple-400">Concepts:</span>
                <span className="text-sm text-gray-300 ml-2">{project.type}</span>
              </div>

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <FiGithub className="mr-2" />
                  View on GitHub
                </a>
              )}
            </motion.div>
          </div>
        ))}
      </motion.div>

      <button
        onClick={prevProject}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-purple-600/20 p-2 rounded-full border border-gray-700 hover:border-purple-500 transition-all z-10"
        aria-label="Previous project"
      >
        <FiChevronLeft className="w-4 h-18" />
      </button>

      <button
        onClick={nextProject}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-purple-600/20 p-2 rounded-full border border-gray-700 hover:border-purple-500 transition-all z-10"
        aria-label="Next project"
      >
        <FiChevronRight className="w-18 h-18" />
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_: any, index: any) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-purple-500 w-6' : 'bg-gray-700'}`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};