"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

// Define types for the Navbar props
interface NavItem {
  label: string;
  section: string;
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
  SiLeetcode: require("react-icons/si").SiLeetcode
};

const Navbar = ({ activeSection, logo, navLinks, socialLinks }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            {navLinks.map((item) => {
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-gray-900/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((item) => {
                const isActive = activeSection === item.section;
                return (
                  <motion.a
                    key={item.section}
                    href={`#${item.section}`}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="mobileNavIndicator"
                        className="h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 mt-1"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </motion.a>
                );
              })}
              
              <div className="flex justify-center gap-4 pt-4">
                {socialLinks.map((social) => {
                  const IconComponent = iconComponents[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-300 hover:text-purple-400 transition-colors"
                      aria-label={social.name}
                    >
                      {IconComponent && <IconComponent className="w-6 h-6" />}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;