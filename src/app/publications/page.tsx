"use client";

import { useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Head from 'next/head';
import type { PortfolioData } from "../types/portfolio-data.type";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiFileText, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { parseText } from "../utils/textParser";

const BackgroundAnimation = dynamic(() => import("../components/sections/BackgroundAnimation"), { ssr: false, loading: () => <div /> });
const FooterSection = dynamic(() => import("../components/sections/FooterSection"), { ssr: false, loading: () => <div /> });

interface PublicationImageProps {
  image?: string;
  title: string;
}

function PublicationImage({ image, title }: PublicationImageProps) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !image || imageError;

  return (
    <div className="relative w-full md:w-40 h-24 bg-gray-700 rounded-lg overflow-hidden hidden md:block">
      {image && !imageError && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 192px"
          onError={() => setImageError(true)}
        />
      )}
      {/* Default Article SVG Fallback */}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <FiFileText className="w-12 h-12 mx-auto mb-2" />
            <span className="text-xs font-medium"></span> {/*Here: Can be added 'Article as a Text'*/}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PublicationsPage() {
  const { scrollYProgress } = useScroll();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!data || !data.publications.enabled) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Failed to load publications. Please try again later.</div>
      </div>
    );
  }

  const publications = data.publications;

  return (
    <>
      <Head>
        <title>{publications.title} | {data.meta.title}</title>
        <meta name="description" content={`All ${publications.title.toLowerCase()}`} />
        <link rel="icon" href={data.meta.favicon} />
      </Head>

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
            activeSection=""
          />
        )}

        <main className="relative z-10 pt-20 md:pt-24 pb-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[95%] 2xl:max-w-[1600px] mx-auto w-full">
          {/* Back Button */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {(() => {
              const highlightIndex = publications.title.indexOf(publications.highlight);
              const titleBefore = highlightIndex >= 0 ? publications.title.substring(0, highlightIndex) : publications.title;
              const titleAfter = highlightIndex >= 0 ? publications.title.substring(highlightIndex + publications.highlight.length) : '';
              return (
                <>
                  {titleBefore}
                  {highlightIndex >= 0 && <span className="text-purple-400">{publications.highlight}</span>}
                  {titleAfter}
                </>
              );
            })()}
          </motion.h1>

          {/* All Publications */}
          <div className="space-y-5 md:space-y-6">
            {publications.items.map((publication, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-xl p-4 md:p-5 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                >
                <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-start">
                  {/* Image Section - Hidden on mobile */}
                  <div className="flex-shrink-0">
                    <PublicationImage image={publication.image} title={publication.title} />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="text-base md:text-lg font-semibold text-white hover:text-purple-400 transition-colors">
                        <a
                          href={publication.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 group"
                        >
                          {publication.title}
                          <FiExternalLink className="w-4 h-4 text-purple-300" aria-hidden="true" />
                        </a>
                      </h3>
                      <span className="text-xs tracking-wide uppercase text-gray-400 bg-gray-800/80 px-3 py-1 rounded-full hidden md:inline-block border border-gray-700">
                        {publication.type}
                      </span>
                    </div>

                    {/* Description - Hidden on mobile */}
                    <div className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-h-24 overflow-hidden mb-2 hidden md:block">
                      {parseText(publication.description)}
                    </div>

                    <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                        {publication.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end gap-3 text-xs md:text-sm text-gray-400 flex-shrink-0 whitespace-nowrap">
                        <span>{publication.platform}</span>
                        <span>•</span>
                        <span>{publication.date}</span>
                        {publication.authors && (
                          <>
                            <span>•</span>
                            <span>{publication.authors}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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

