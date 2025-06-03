"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiDownload, FiGithub, FiLinkedin, FiTwitter, FiMail, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Head from 'next/head';
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import ExperienceTimeline from "./components/ExperienceTimeline";
import TypewriterEffect from "./functions/TypewriterEffect";
import { trackDownload } from "./functions/TrackDownload";
import { trackVisit } from "./functions/TrackVisit";
import { ProjectCarousel } from "./components/ProjectCarousel";
import Loading from "./components/Loading";

// Icon mapping
const iconComponents: { [key: string]: any } = {
  FiGithub: FiGithub,
  FiLinkedin: FiLinkedin,
  FiTwitter: FiTwitter,
  SiLeetcode: SiLeetcode,
  FiMail: FiMail
};

export default function Home() {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const { scrollYProgress } = useScroll();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  // Background gradient animation
  const backgroundX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_PORTFOLIO_DATA_URL;
        const response = await fetch(url!);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Track active section for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (!data) return;

      const sections = data.header.navLinks.map(link => link.section);
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

  useEffect(() => {
    const hasTrackedVisit = sessionStorage.getItem('hasTrackedVisit');
    if (!hasTrackedVisit && data?.tracking?.enabled) {
      trackVisit(data.tracking);
      sessionStorage.setItem('hasTrackedVisit', 'true');
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Failed to load data. Please try again later.</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
        <link rel="icon" href={data.meta.favicon} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden relative">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
              x: backgroundX,
              y: backgroundY
            }}
          />

          {data.codeElements.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: element.y + 10 }}
              animate={{ opacity: 0.4, y: element.y }}
              transition={{ delay: Number(element.delay), duration: 1 }}
              className="absolute text-gray-500 font-mono text-xs md:text-sm"
              style={{ left: `${element.x}%`, top: `${element.y}%` }}
            >
              {element.text}
            </motion.div>
          ))}
        </div>

        {data.header.enabled && (
          <Navbar
            logo={data.header.logo}
            navLinks={data.header.navLinks}
            socialLinks={data.contact.socialLinks}
            activeSection={activeSection}
          />
        )}

        <main className="relative z-10 pt-20 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          {/* About Section */}
          {data.intro.enabled && (
            <section id="about" className="py-8 md:py-16 lg:py-20" ref={ref}>
              <div className={`flex ${data.intro.avatar?.enabled ? 'flex-col md:flex-row items-start' : 'flex-col items-start'} gap-4 md:gap-8 lg:gap-12`}>
                {/* Avatar Container - Only render if enabled */}
                {data.intro.avatar?.enabled && (
                  <motion.div
                    className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto md:mx-0 mb-6 md:mb-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onHoverStart={() => setIsHoveringAvatar(true)}
                    onHoverEnd={() => setIsHoveringAvatar(false)}
                  >
                    <div className="w-full h-full rounded-full overflow-visible relative z-10 shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                      <div className="absolute -top-6 sm:-top-7 md:-top-8 left-1/2 transform -translate-x-1/2 w-[100%] h-[95%] z-20">
                        <Image
                          src={data.intro.avatar.image}
                          alt={data.intro.avatar.alt}
                          fill
                          className="object-cover object-top rounded-full ring-2 shadow-xl hover:ring-purple-500 transition-all duration-300"
                          style={{
                            transform: isHoveringAvatar ? "translateY(-10%) scale(1.05)" : "translateY(-10%)",
                            zIndex: 20,
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isHoveringAvatar && (
                        <motion.div
                          className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-pink-400/30 z-0"
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 0.4 }}
                          exit={{ scale: 1, opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>

                    <motion.div
                      className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-pink-400/30 z-0"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-purple-400/20 z-0"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </motion.div>
                )}

                {/* Content Section */}
                <div className={`flex-1 w-full ${data.intro.avatar?.enabled ? 'text-center md:text-left' : 'text-left'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 lg:mb-4">
                      <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%"],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "linear",
                        }}
                        style={{
                          backgroundSize: "200% 200%",
                        }}
                      >
                        {data.intro.tagline}
                      </motion.span>
                    </h1>
                    <div className="flex justify-center md:justify-start items-baseline">
                      <motion.span
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 mr-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <TypewriterEffect text={data.intro.professional} />
                      </motion.span>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-sm sm:text-base md:text-lg text-gray-300 mt-3 md:mt-4 mb-4 md:mb-6 lg:mb-8"
                  >
                    {data.intro.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap justify-center md:justify-start gap-4"
                  >
                    <a
                      href={data.intro.cta.resumeUrl}
                      download={data.intro.cta.resumeFileName}
                      onClick={() => trackDownload(data.tracking)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-all text-sm shadow-lg hover:shadow-purple-500/50"
                    >
                      <FiDownload className="w-4 h-4" />
                      {data.intro.cta.buttonText}
                    </a>

                    <div className="flex gap-3">
                      {data.contact.socialLinks.map((link, index) => {
                        const IconComponent = iconComponents[link.icon];
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-800 hover:bg-purple-600/20 hover:text-purple-400 transition-all border border-gray-700 hover:border-purple-500"
                          >
                            {IconComponent && <IconComponent className="w-5 h-5" />}
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </div>

              {data.stats.enabled && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4"
                >
                  {data.stats.items.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </section>
          )}

          {/* Skills Section */}
          {data.skills.enabled && (
            <section id="skills" className="py-12">
              <motion.h2
                className="text-3xl font-bold mb-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {data.skills.title.split(data.skills.highlight)[0]}
                <span className="text-purple-400"> {data.skills.highlight}</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.skills.categories.map((category, catIndex) => (
                    <div key={catIndex} className="space-y-3">
                      <h3 className="text-lg font-semibold text-purple-400">
                        {category.name.split(category.highlight)[0]}
                        <span className="text-purple-400"> {category.highlight}</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                            viewport={{ once: true }}
                            className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full border border-gray-600"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {/* Experience Section */}
          {data.experience.enabled && (
            <section id="experience" className="py-12">
              <motion.h2
                className="text-3xl font-bold mb-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {data.experience.title.split(data.experience.highlight)[0]}
                <span className="text-purple-400"> {data.experience.highlight}</span>
              </motion.h2>
              <ExperienceTimeline experiences={data.experience.items} />
            </section>
          )}

          {/* Projects Section */}
          {data.projects.enabled && (
            <section id="portfolio" className="py-12">
              <motion.h2
                className="text-3xl font-bold mb-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {data.projects.title.split(data.projects.highlight)[0]}
                <span className="text-purple-400"> {data.projects.highlight}</span>
              </motion.h2>

              <div className="relative">
                <ProjectCarousel projects={data.projects.items} />
              </div>
            </section>
          )}

          {/* Achievements Section */}
          {data.achievements.enabled && (
            <section id="achievements" className="py-12">
              <motion.h2
                className="text-3xl font-bold mb-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-purple-400">{data.achievements.highlight}</span> & Achievements
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
                    <h3 className="text-xl font-semibold text-purple-400">Achievements</h3>
                    <ul className="space-y-3 list-disc list-inside text-gray-300">
                      {data.achievements.description.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-purple-400">Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.achievements.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700 hover:border-purple-400 transition-all">
                          <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/30">
                            <Image
                              src={cert.icon}
                              alt={cert.name}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{cert.name}</h4>
                            <p className="text-sm text-gray-400">{cert.issuer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* Contact Section */}
          {data.contact.enabled && (
            <section id="contact" className="py-12">
              <motion.h2
                className="text-3xl font-bold mb-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {data.contact.title.split(data.contact.highlight)[0]}
                <span className="text-purple-400"> {data.contact.highlight}</span>
              </motion.h2>
              <div className="flex flex-col md:flex-row gap-10">
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ContactForm {...data.contactForm}/>
                </motion.div>
                <motion.div
                  className="flex-1 space-y-5"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all">
                    <h3 className="text-xl font-semibold mb-2 text-purple-400">Email</h3>
                    <p className="text-gray-300">{data.contact.email}</p>
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all">
                    <h3 className="text-xl font-semibold mb-2 text-purple-400">Location</h3>
                    <p className="text-gray-300">{data.contact.location}</p>
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all">
                    <h3 className="text-xl font-semibold mb-2 text-purple-400">Social</h3>
                    <div className="flex gap-4 mt-4">
                      {data.contact.socialLinks.map((link, index) => {
                        const IconComponent = iconComponents[link.icon];
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
                          >
                            {IconComponent && <IconComponent className="w-5 h-5" />} {link.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Quote Section */}
          {data.quote.enabled && (
            <section id="quote" className="py-12 text-center">
              <div className="flex flex-col md:flex-row gap-10">
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h1 className="text-xl text-purple-400">{data.quote.text}</h1>
                </motion.div>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        {data.footer.enabled && (
          <footer className="relative z-10 py-6 border-t border-gray-800 text-center text-gray-400 text-sm">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {data.footer.text.replace('{year}', new Date().getFullYear().toString())}
            </motion.p>
          </footer>
        )}
      </div>
    </>
  );
}