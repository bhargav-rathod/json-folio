"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";

// Define types for the Navbar props
interface NavItem {
  label: string;
  section: string;
  navEligibleForDesktop?: boolean;
  navEligibleForMobile?: boolean;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface NavbarProps {
  activeSection: string;
  logo: {
    text: string;
  };
  navLinks: NavItem[];
  socialLinks: SocialLink[];
}

// Icon mapping
const iconComponents: { [key: string]: any } = {
  FiGithub: require("react-icons/fi").FiGithub,
  FiLinkedin: require("react-icons/fi").FiLinkedin,
  FiTwitter: require("react-icons/fi").FiTwitter,
  FiMail: require("react-icons/fi").FiMail,
  SiLeetcode: require("react-icons/si").SiLeetcode,
  FaGraduationCap: require("react-icons/fa").FaGraduationCap,
  FaKaggle: require("react-icons/fa").FaKaggle,
  SiStackoverflow: require("react-icons/si").SiStackoverflow,
  SiMedium: require("react-icons/si").SiMedium,
  FaDev: require("react-icons/fa").FaDev
};

const Navbar = ({ activeSection, logo, navLinks, socialLinks }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const desktopLinks = navLinks.filter((link) => link.navEligibleForDesktop);
  const mobileLinks = navLinks.filter((link) => link.navEligibleForMobile);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-900/90 backdrop-blur-md border-b border-gray-800" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.a 
            href="#about"
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent`}>
              {logo.text}
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {desktopLinks.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <motion.div
                  key={item.section}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <a
                    href={`#${item.section}`}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "text-white" : "text-gray-300 hover:text-white"}`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right-side Icons */}
          <div className="hidden md:flex items-center gap-3">
            {socialLinks.map((social) => {
              const IconComponent = iconComponents[social.icon];
              return (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-300 hover:text-purple-400 transition-colors"
                  aria-label={social.name}
                >
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiX className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiMenuAlt3 className="w-6 h-6" />
                </motion.div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden fixed top-16 left-0 right-0 z-40"
            >
              <div className="mx-4 rounded-2xl border border-gray-800 bg-gray-900/95 shadow-2xl shadow-black/30 overflow-hidden">
                <div className="p-4 space-y-3">
                  {mobileLinks.map((item, idx) => {
                    const isActive = activeSection === item.section;
                    return (
                      <motion.a
                        key={item.section}
                        href={`#${item.section}`}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "border-purple-500/70 bg-purple-500/10 text-white"
                            : "border-gray-800 bg-gray-900/70 text-gray-300 hover:border-purple-500/40 hover:text-white"
                        }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * idx }}
                      >
                        <span>{item.label}</span>
                        <FiArrowUpRight className="h-4 w-4 text-purple-400" />
                      </motion.a>
                    );
                  })}

                  <div className="flex justify-center gap-3 pt-2">
                    {socialLinks.map((social) => {
                      const IconComponent = iconComponents[social.icon];
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 text-gray-300 transition hover:border-purple-500/50 hover:text-white"
                          aria-label={social.name}
                        >
                          {IconComponent && <IconComponent className="h-5 w-5" />}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;