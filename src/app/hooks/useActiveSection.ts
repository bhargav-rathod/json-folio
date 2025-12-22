import { useState, useEffect } from 'react';
import type { PortfolioData } from '../types/portfolio-data.type';

export function useActiveSection(data: PortfolioData | null) {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      if (!data) return;

      const sections = data.header.navLinks
        .filter((link: any) => link.navEligibleForDesktop || link.navEligibleForMobile)
        .map((link: { section: string }) => link.section);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  return activeSection;
} 