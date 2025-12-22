import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { PortfolioData } from "../../types/portfolio-data.type";
import { parseText } from "../../utils/textParser";

interface TestimonialsSectionProps {
  testimonials: PortfolioData["testimonials"];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(-2);
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  if (!testimonials.enabled) return null;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.items.length - 1 ? 0 : prev + 1
    );
  };

  const previousTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.items.length - 1 : prev - 1
    );
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
      nextTestimonial();
    }
    if (isRightSwipe) {
      previousTestimonial();
    }
  };

  return (
    <section id="testimonials" className="py-12">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 md:mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {testimonials.title.split(testimonials.highlight)[0]}
        <span className="text-purple-400"> {testimonials.highlight}</span>
      </motion.h2>

      <div 
        className="relative max-w-5xl mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="text-sm sm:text-base md:text-lg text-gray-300 italic mb-4">"{parseText(testimonials.items[currentIndex].message)}"</div>
              <div className="flex items-center gap-3">
                <div 
                  className="w-[40px] h-[40px] rounded-full border-2 border-purple-400 bg-purple-500/20 flex items-center justify-center text-sm font-semibold text-purple-400 flex-shrink-0"
                >
                  {getInitials(testimonials.items[currentIndex].receivedFrom)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-purple-400">{testimonials.items[currentIndex].receivedFrom}</h4>
                  <p className="text-xs text-gray-400">{testimonials.items[currentIndex].designation}</p>
                  <a
                    href={`https://www.linkedin.com/in/${testimonials.items[currentIndex].linkedinUserName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors mt-1 inline-block"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <button
          onClick={previousTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-800/90 hover:bg-gray-700 text-purple-400 p-2 rounded-full border border-purple-500/30 hover:border-purple-500 transition-all"
          aria-label="Previous testimonial"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-800/90 hover:bg-gray-700 text-purple-400 p-2 rounded-full border border-purple-500/30 hover:border-purple-500 transition-all"
          aria-label="Next testimonial"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-purple-400 w-4' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 