import { motion } from "framer-motion";
import type { PortfolioData } from "../../types/portfolio-data.type";

interface FooterSectionProps {
  footer: PortfolioData["footer"];
}

export default function FooterSection({ footer }: FooterSectionProps) {
  if (!footer.enabled) return null;

  return (
    <footer className="relative z-10 py-6 border-t border-gray-800 text-center text-gray-400 text-sm">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {footer.text.replace('{year}', new Date().getFullYear().toString())}
      </motion.p>
    </footer>
  );
} 