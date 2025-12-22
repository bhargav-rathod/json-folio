import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiGithub } from "react-icons/fi";
import { parseText } from "../utils/textParser";

// Project Carousel Component
export const ProjectCarousel = ({ projects }: { projects: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextProject();
    }
    if (isRightSwipe) {
      prevProject();
    }
  };

  return (
    <div 
      className="overflow-hidden relative"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
              className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 shadow-lg transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                {project.title}
              </h3>
              <div className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">{parseText(project.description)}</div>

              <div className="mb-4">
                <h4 className="text-xs font-semibold text-purple-400 mb-1">Technologies:</h4>
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
                <span className="text-xs font-semibold text-purple-400">Concepts:</span>
                <span className="text-xs text-gray-300 ml-2">{project.type}</span>
              </div>

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
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

export default ProjectCarousel;