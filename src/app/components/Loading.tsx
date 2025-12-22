"use client";

import { motion } from "framer-motion";

interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "Crafting Portfolio" }: LoadingProps) {
  const circles = [0, 1, 2];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Dot wave animation */}
        <div className="flex gap-2 h-12 items-end">
          {circles.map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-purple-500 rounded-full"
              animate={{
                height: [8, 24, 8],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Subtle text reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-300 text-sm tracking-widest uppercase"
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            {text}
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}