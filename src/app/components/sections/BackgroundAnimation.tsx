import { motion, MotionValue } from "framer-motion";
import type { PortfolioData } from "../../types/portfolio-data.type";

interface BackgroundAnimationProps {
  backgroundX: MotionValue<number>;
  backgroundY: MotionValue<number>;
  codeElements: PortfolioData["codeElements"];
}

export default function BackgroundAnimation({ backgroundX, backgroundY, codeElements }: BackgroundAnimationProps) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
          x: backgroundX,
          y: backgroundY
        }}
      />

      {codeElements.map((element: { text: string; x: string; y: string; delay: string }, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: Number(element.y) + 10 }}
          animate={{ opacity: 0.4, y: element.y }}
          transition={{ delay: Number(element.delay), duration: 1 }}
          className="absolute text-gray-500 font-mono text-xs md:text-sm"
          style={{ left: `${element.x}%`, top: `${element.y}%` }}
        >
          {element.text}
        </motion.div>
      ))}
    </div>
  );
} 