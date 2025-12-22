import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { PortfolioData } from "../../types/portfolio-data.type";
import { parseText } from "../../utils/textParser";

interface AchievementsSectionProps {
  achievements: PortfolioData["achievements"];
}

// Helper function to validate URL
const isValidUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

// Default Certificate SVG Icon
const DefaultCertificateIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-purple-400"
  >
    <path
      d="M8 6C6.89543 6 6 6.89543 6 8V32C6 33.1046 6.89543 34 8 34H32C33.1046 34 34 33.1046 34 32V8C34 6.89543 33.1046 6 32 6H8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14H28M12 20H28M12 26H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="30" cy="10" r="3" fill="currentColor" />
  </svg>
);

// Certification Card Component
interface CertificationCardProps {
  cert: PortfolioData["achievements"]["certifications"][number];
  isFullWidth?: boolean;
}

function CertificationCard({ cert, isFullWidth = false }: CertificationCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasValidIcon = cert.icon && cert.icon.trim() !== '';
  const showDefaultIcon = !hasValidIcon || imageError;
  const hasValidUrl = cert.url && cert.url.trim() !== '' && isValidUrl(cert.url);

  const CertContent = (
    <div className="flex items-center gap-4 p-4 bg-gray-900/40 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/30 flex items-center justify-center min-w-[64px] min-h-[64px]">
        {showDefaultIcon ? (
          <DefaultCertificateIcon />
        ) : (
          <Image
            src={cert.icon || ''}
            alt={cert.name}
            width={40}
            height={40}
            className="object-contain"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div>
        <h4 className="text-sm font-medium">{cert.name}</h4>
        <p className="text-xs text-gray-400">{cert.issuer}</p>
      </div>
    </div>
  );

  const wrapperClassName = isFullWidth ? "md:col-span-2" : "";

  if (hasValidUrl) {
    return (
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block cursor-pointer ${wrapperClassName}`}
      >
        {CertContent}
      </a>
    );
  }

  return <div className={wrapperClassName}>{CertContent}</div>;
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  if (!achievements.enabled) return null;

  return (
    <section id="achievements" className="py-12">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 md:mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {achievements.highlight} & <span className="text-purple-400">Achievements</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm md:text-base font-semibold text-purple-400">Achievements</h3>
            <ul className="space-y-3 list-disc list-outside ml-5 pl-2 text-sm sm:text-base md:text-lg text-gray-300">
              {achievements.description.map((item: string, index: number) => (
                <li key={index}>{parseText(item)}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm md:text-base font-semibold text-purple-400">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.certifications.map((cert: PortfolioData["achievements"]["certifications"][number], index: number) => {
                const isLastItem = index === achievements.certifications.length - 1;
                const isOddCount = achievements.certifications.length % 2 !== 0;
                const isFullWidth = isLastItem && isOddCount;
                
                return (
                  <CertificationCard key={index} cert={cert} isFullWidth={isFullWidth} />
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 