import { motion } from "framer-motion";
import React from "react";
import type { PortfolioData } from "../../types/portfolio-data.type";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { parseText } from "../../utils/textParser";

type CustomSection = NonNullable<PortfolioData["customSections"]>[number];

interface CustomSectionProps {
  section: CustomSection;
}

const InfoSection = ({ section }: { section: CustomSection }) => {
  const items =
    Array.isArray(section.content?.list)
      ? section.content.list
      : Array.isArray(section.content)
      ? section.content
      : [];

  return (
    <div className="grid gap-3">
      {items.map((item: string, idx: number) => (
        <div
          key={`${section.id}-info-${idx}`}
          className="flex items-start gap-3 rounded-lg border border-gray-700 bg-gray-800/60 p-4 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
        >
          <FiCheckCircle className="mt-1 h-5 w-5 text-purple-400" />
          <div className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">{parseText(item)}</div>
        </div>
      ))}
    </div>
  );
};

const LinksSection = ({ section }: { section: CustomSection }) => {
  const links = Array.isArray(section.content?.links)
    ? section.content.links
    : (Array.isArray(section.content)
        ? section.content
        : []);

  return (
    <div className="grid gap-3">
      {links.map((link: any, idx: number) => (
        <a
          key={`${section.id}-link-${idx}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-gray-700 bg-gradient-to-r from-gray-800/80 to-gray-800/40 px-5 py-4 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-white">
                {link.label}
              </p>
              {link.description && (
                <p className="text-sm text-gray-400 mt-1">
                  {link.description}
                </p>
              )}
            </div>
            <FiArrowUpRight className="h-6 w-6 text-purple-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </a>
      ))}
    </div>
  );
};

const ButtonSection = ({ section }: { section: CustomSection }) => {
  const button = section.content?.button ?? section.content;

  return (
    <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/30 via-gray-900/50 to-gray-900/30 p-8 text-center">
      <p className="text-gray-200 text-base mb-6">
        {button?.description ?? "Stay in touch for collaborations, consulting, or speaking gigs."}
      </p>
      <a
        href={button?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-purple-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:shadow-purple-500/50"
      >
        {button?.label ?? "Learn more"}
      </a>
    </div>
  );
};

const NewsletterSection = ({ section }: { section: CustomSection }) => {
  const config = section.content?.newsletter;
  const heading = config?.heading ?? section.title;
  const supportingCopy = config?.subcopy ?? section.description;
  const placeholder = config?.placeholder ?? "Your email";
  const ctaLabel = config?.ctaLabel ?? "Subscribe";
  const ctaUrl = config?.ctaUrl ?? "#";
  const note = config?.note;
  const pitch = config?.pitch;
  const stats = config?.stats ?? [];

  return (
    <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900/80 via-gray-900/40 to-gray-900/70 p-8 shadow-2xl shadow-black/40 transition-all duration-300 hover:border-purple-500 hover:shadow-purple-500/40">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-300">
            {section.eyebrow ?? "Newsletter"}
          </p>
          <h3 className="text-2xl font-semibold text-white mt-2">
            {heading}
          </h3>
          {supportingCopy && (
            <p className="text-sm text-gray-300 mt-3">
              {supportingCopy}
            </p>
          )}
          {pitch && (
            <p className="text-sm text-gray-400 mt-4">
              {pitch}
            </p>
          )}
        </div>
        <div className="flex-1 space-y-4">
          <div className="rounded-xl bg-gray-800/70 p-4 border border-gray-700 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20">
            <p className="text-sm text-gray-400 mb-2">
              {placeholder}
            </p>
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-purple-500 px-4 py-2 font-semibold text-white shadow-md shadow-purple-500/30 w-full"
            >
              {ctaLabel}
            </a>
          </div>
          {note && (
            <p className="text-xs text-gray-500">{note}</p>
          )}
        </div>
      </div>
      {stats.length > 0 && (
        <div className="grid gap-4 mt-8 sm:grid-cols-3">
          {stats.map((stat, idx) => (
            <div
              key={`${section.id}-stat-${idx}`}
              className="rounded-xl border border-gray-700 bg-gray-900/60 p-4 text-center transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const renderContent = (section: CustomSection) => {
  switch (section.type) {
    case "info":
      return <InfoSection section={section} />;
    case "links":
      return <LinksSection section={section} />;
    case "button":
      return <ButtonSection section={section} />;
    case "newsletter":
      return <NewsletterSection section={section} />;
    default:
      return (
        <pre className="bg-gray-900/30 rounded p-4 text-gray-300 overflow-x-auto text-sm">
          {JSON.stringify(section.content, null, 2)}
        </pre>
      );
  }
};

export default function CustomSections({ section }: CustomSectionProps) {
  if (!section.enabled) return null;

  return (
    <section id={section.id} className="py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          {section.eyebrow && (
            <p className="text-xs uppercase tracking-[0.4em] text-purple-300 mb-3">
              {section.eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-bold text-white">{section.title}</h2>
          {section.description && (
            <div className="mt-4 text-sm text-gray-300 max-w-2xl mx-auto">
              {parseText(section.description)}
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {renderContent(section)}
        </motion.div>
      </div>
    </section>
  );
}