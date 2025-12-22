import { motion } from "framer-motion";
import type { PortfolioData } from "../../types/portfolio-data.type";
import { parseText } from "../../utils/textParser";

interface QuoteSectionProps {
  quote: PortfolioData["quote"];
}

export default function QuoteSection({ quote }: QuoteSectionProps) {
  if (!quote.enabled) return null;

  return (
    <section id="quote" className="py-12 text-center">
      <div className="flex flex-col md:flex-row gap-10">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-xl text-purple-400">{parseText(quote.text)}</h1>
        </motion.div>
      </div>
    </section>
  );
} 