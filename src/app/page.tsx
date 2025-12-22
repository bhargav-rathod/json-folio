"use client";

import { useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Script from 'next/script';
import type { PortfolioData } from "./types/portfolio-data.type";
import { useActiveSection } from "./hooks/useActiveSection";
import { trackVisit } from "./functions/TrackVisit";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { AboutSection } from "./components/sections";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const SkillsSection = dynamic(() => import("./components/sections/SkillsSection"), { ssr: false, loading: () => <div /> });
const PublicationsSection = dynamic(() => import("./components/sections/PublicationsSection"), { ssr: false, loading: () => <div /> });
const ExperienceSection = dynamic(() => import("./components/sections/ExperienceSection"), { ssr: false, loading: () => <div /> });
const EducationSection = dynamic(() => import("./components/sections/EducationSection"), { ssr: false, loading: () => <div /> });
const ProjectsSection = dynamic(() => import("./components/sections/ProjectsSection"), { ssr: false, loading: () => <div /> });
const AchievementsSection = dynamic(() => import("./components/sections/AchievementsSection"), { ssr: false, loading: () => <div /> });
const ContactSection = dynamic(() => import("./components/sections/ContactSection"), { ssr: false, loading: () => <div /> });
const QuoteSection = dynamic(() => import("./components/sections/QuoteSection"), { ssr: false, loading: () => <div /> });
const FooterSection = dynamic(() => import("./components/sections/FooterSection"), { ssr: false, loading: () => <div /> });
const CustomSections = dynamic(() => import("./components/sections/CustomSections"), { ssr: false, loading: () => <div /> });
const BackgroundAnimation = dynamic(() => import("./components/sections/BackgroundAnimation"), { ssr: false, loading: () => <div /> });
const TestimonialsSection = dynamic(() => import("./components/sections/TestimonialsSection"), { ssr: false, loading: () => <div /> });

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const activeSection = useActiveSection(data);

  // Background gradient animation
  const backgroundX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use local data.json in development, otherwise use the configured URL
        const isDevelopment = process.env.NODE_ENV === 'development';
        const url = isDevelopment 
          ? '/archived/data.json' 
          : process.env.NEXT_PUBLIC_PORTFOLIO_DATA_URL;
        
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

  const sectionsToRender: Array<{ id: string; index: number; element: React.ReactNode }> = [];
  const resolveIndex = (value?: number) =>
    typeof value === "number" ? value : Number.MAX_SAFE_INTEGER;

  const addSection = ({
    enabled,
    id,
    index,
    element,
  }: {
    enabled: boolean;
    id: string;
    index?: number;
    element: React.ReactNode;
  }) => {
    if (!enabled) return;
    sectionsToRender.push({
      id,
      index: resolveIndex(index),
      element,
    });
  };

  addSection({
    enabled: data.intro.enabled,
    id: "about",
    index: data.intro.index,
    element: (
      <AboutSection
        intro={data.intro}
        stats={data.stats}
        socialLinks={data.contact.socialLinks}
        tracking={data.tracking}
      />
    ),
  });

  addSection({
    enabled: data.skills.enabled,
    id: "skills",
    index: data.skills.index,
    element: (
      <Suspense fallback={<div />}>
        <SkillsSection skills={data.skills} />
      </Suspense>
    ),
  });

  addSection({
    enabled: data.publications.enabled,
    id: "publications",
    index: data.publications.index,
    element: (
      <Suspense fallback={<div />}>
        <PublicationsSection publications={data.publications} />
      </Suspense>
    ),
  });

  addSection({
    enabled: data.experience.enabled,
    id: "experience",
    index: data.experience.index,
    element: (
      <Suspense fallback={<div />}>
        <ExperienceSection experience={data.experience} />
      </Suspense>
    ),
  });

  addSection({
    enabled: data.education.enabled,
    id: "education",
    index: data.education.index,
    element: (
      <Suspense fallback={<div />}>
        <EducationSection education={data.education} />
      </Suspense>
    ),
  });

  addSection({
    enabled: data.projects.enabled,
    id: "portfolio",
    index: data.projects.index,
    element: (
      <Suspense fallback={<div />}>
        <ProjectsSection projects={data.projects} />
      </Suspense>
    ),
  });

  addSection({
    enabled: data.achievements.enabled,
    id: "achievements",
    index: data.achievements.index,
    element: (
      <Suspense fallback={<div />}>
        <AchievementsSection achievements={data.achievements} />
      </Suspense>
    ),
  });

  addSection({
    enabled: data.testimonials.enabled,
    id: "testimonials",
    index: data.testimonials.index,
    element: (
      <Suspense fallback={<div />}>
        <TestimonialsSection testimonials={data.testimonials} />
      </Suspense>
    ),
  });

  addSection({
    enabled: data.contact.enabled,
    id: "contact",
    index: data.contact.index,
    element: (
      <Suspense fallback={<div />}>
        <ContactSection contact={data.contact} contactForm={data.contactForm} />
      </Suspense>
    ),
  });

  addSection({
    enabled: data.quote.enabled,
    id: "quote",
    index: data.quote.index,
    element: (
      <Suspense fallback={<div />}>
        <QuoteSection quote={data.quote} />
      </Suspense>
    ),
  });

  data.customSections
    ?.filter((section) => section.enabled)
    .forEach((section) => {
      addSection({
        enabled: section.enabled,
        id: section.id,
        index: section.index,
        element: (
          <Suspense fallback={<div />}>
            <CustomSections section={section} />
          </Suspense>
        ),
      });
    });

  const orderedSections = sectionsToRender.sort((a, b) => a.index - b.index);

  return (
    <>
      {/* Google Analytics */}
      {data.tracking?.googleAnalytics?.enabled && data.tracking.googleAnalytics.googleTag && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${data.tracking.googleAnalytics.googleTag}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${data.tracking.googleAnalytics.googleTag}');
            `}
          </Script>
        </>
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden relative">
        <Suspense fallback={<div />}> 
          <BackgroundAnimation
            backgroundX={backgroundX}
            backgroundY={backgroundY}
            codeElements={data.codeElements}
          />
        </Suspense>

        {data.header.enabled && (
          <Navbar
            logo={data.header.logo}
            navLinks={data.header.navLinks}
            socialLinks={data.contact.socialLinks}
            activeSection={activeSection}
          />
        )}

        <main className="relative z-10 pt-20 md:pt-24 pb-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[95%] 2xl:max-w-[1600px] mx-auto w-full">
          <div className="space-y-10 md:space-y-8"> { /* Added margin between sections - Reduced the margin between sections from here */}
            {orderedSections.map((section) => (
              <React.Fragment key={section.id}>{section.element}</React.Fragment>
            ))}
          </div>
        </main>

        <Suspense fallback={<div />}> 
          <FooterSection footer={data.footer} />
        </Suspense>
      </div>
    </>
  );
}