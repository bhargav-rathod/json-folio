import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import TypewriterEffect from "../../functions/TypewriterEffect";
import { trackDownload } from "../../functions/TrackDownload";
import { PortfolioData } from "../../types/portfolio-data.type";
import { parseText } from "../../utils/textParser";
import { iconComponents } from "@/app/utils/iconComponents";

interface AboutSectionProps {
  intro: PortfolioData["intro"];
  stats: PortfolioData["stats"];
  socialLinks: PortfolioData["contact"]["socialLinks"];
  tracking: PortfolioData["tracking"];
}

export default function AboutSection({ intro, stats, socialLinks, tracking }: AboutSectionProps) {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

  if (!intro.enabled) return null;

  return (
    <section id="about" className="py-8 md:py-16 lg:py-20">
      <div className={`flex ${intro.avatar?.enabled ? 'flex-col md:flex-row items-center md:items-start' : 'flex-col items-start'} gap-4 md:gap-8 lg:gap-12`}>
        {/* Avatar Container - Only render if enabled */}
        {intro.avatar?.enabled && (
          <motion.div
            className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0 mx-auto md:mx-0 mb-6 md:mb-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHoveringAvatar(true)}
            onHoverEnd={() => setIsHoveringAvatar(false)}
          >
            <div className="w-full h-full rounded-full overflow-visible relative z-10 shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[100%] h-[100%] ">
                <Image
                  src={intro.avatar.image}
                  alt={intro.avatar.alt}
                  fill
                  className="object-cover object-top rounded-full ring-2 shadow-xl hover:ring-purple-500 transition-all duration-300"
                  style={{
                    transform: isHoveringAvatar ? "translateY(-10%) scale(1.05)" : "",
                    
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
            <AnimatePresence>
              {isHoveringAvatar && (
                <motion.div
                  className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-pink-400/30 z-0"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0.4 }}
                  exit={{ scale: 1, opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-pink-400/30 z-0"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-purple-400/20 z-0"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
        )}
        {/* Content Section */}
        <div className="flex-1 w-full text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 lg:mb-4">
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                {intro.tagline}
              </motion.span>
            </h1>
            <div className="flex justify-start items-baseline">
              <motion.span
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 mr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <TypewriterEffect text={intro.professional} />
              </motion.span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 mt-3 md:mt-4 mb-4 md:mb-6 lg:mb-8"
          >
            {parseText(intro.description)}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-start gap-4"
          >
            <a
              href={intro.cta.resumeUrl}
              download={intro.cta.resumeFileName}
              onClick={() => trackDownload(tracking)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-all text-sm shadow-lg hover:shadow-purple-500/50"
            >
              <FiDownload className="w-4 h-4" />
              {intro.cta.buttonText}
            </a>
            <div className="flex gap-3">
              {socialLinks.map((link: { icon: string; url: string }, index: number) => {
                const IconComponent = iconComponents[link.icon];
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800 hover:bg-purple-600/20 hover:text-purple-400 transition-all border border-gray-700 hover:border-purple-500"
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      {stats.enabled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4"
        >
          {stats.items.map((stat: { value: string; label: string }, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}