"use client";

import { motion } from "framer-motion";
import type { PortfolioData } from "../../types/portfolio-data.type";
import Image from "next/image";
import { FiExternalLink, FiFileText } from "react-icons/fi";
import { useState } from "react";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import { parseText } from "../../utils/textParser";

interface PublicationsSectionProps {
  publications: PortfolioData["publications"];
}

interface PublicationImageProps {
  image?: string;
  title: string;
}

function PublicationImage({ image, title }: PublicationImageProps) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !image || imageError;

  return (
    <div className="relative w-full md:w-40 h-24 bg-gray-700 rounded-lg overflow-hidden hidden md:block">
      {image && !imageError && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 192px"
          onError={() => setImageError(true)}
        />
      )}
      {/* Default Article SVG Fallback */}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <FiFileText className="w-12 h-12 mx-auto mb-2" />
            <span className="text-xs font-medium"></span> {/*Here: Can be added 'Article as a Text'*/}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
  if (!publications.enabled) return null;

  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const displayLimit = publications.displayLimit ?? 3;
  const displayedItems = publications.items.slice(0, displayLimit);
  const hasMore = publications.items.length > displayLimit;
  const showMoreText = publications.showMoreText ?? "Show More";
  const loadingText = publications.loadingText ?? "Fetching publications";

  // Split title to highlight the highlight part
  const highlightIndex = publications.title.indexOf(publications.highlight);
  const titleBefore = highlightIndex >= 0 ? publications.title.substring(0, highlightIndex) : publications.title;
  const titleAfter = highlightIndex >= 0 ? publications.title.substring(highlightIndex + publications.highlight.length) : '';

  const handleShowMoreClick = () => {
    setIsNavigating(true);
    router.push("/publications");
  };

  return (
    <>
      <section id="publications" className="py-10">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-6 md:mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {titleBefore}
          {highlightIndex >= 0 && <span className="text-purple-400">{publications.highlight}</span>}
          {titleAfter}
        </motion.h2>

        <div className="space-y-3 md:space-y-4">
          {displayedItems.map((publication, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 rounded-xl p-3 md:p-4 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start">
                {/* Image Section - Hidden on mobile */}
                <div className="flex-shrink-0">
                  <PublicationImage image={publication.image} title={publication.title} />
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-base font-semibold text-white hover:text-purple-300 transition-colors">
                      <a
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 group"
                      >
                        {publication.title}
                        <FiExternalLink className="w-4 h-4 text-purple-300" aria-hidden="true" />
                      </a>
                    </h3>
                    <span className="text-xs tracking-wide uppercase text-gray-400 bg-gray-800/80 px-3 py-1 rounded-full hidden md:inline-block">
                      {publication.type}
                    </span>
                  </div>

                  {/* Description - Hidden on mobile */}
                  <div className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-h-20 overflow-hidden">
                    {parseText(publication.description)}
                  </div>

                  <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                      {publication.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-[11px] bg-purple-900/20 text-purple-200 px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-end gap-2 text-[11px] md:text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">
                      <span>{publication.platform}</span>
                      <span className="text-gray-600">•</span>
                      <span>{publication.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Link */}
        {hasMore && (
          <motion.div
            className="flex justify-end mt-4 md:mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: displayedItems.length * 0.1 }}
            viewport={{ once: true }}
          >
            <button
              type="button"
              onClick={handleShowMoreClick}
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              disabled={isNavigating}
            >
              {showMoreText}
              <FiExternalLink className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </section>

      {isNavigating && (
        <div className="fixed inset-0 z-50">
          <Loading text={loadingText} />
        </div>
      )}
    </>
  );
}
