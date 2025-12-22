import { motion } from "framer-motion";
import type { PortfolioData } from "../../types/portfolio-data.type";
import ContactForm from "../ContactForm";
import { iconComponents } from "@/app/utils/iconComponents";

interface ContactSectionProps {
  contact: PortfolioData["contact"];
  contactForm: PortfolioData["contactForm"];
}

export default function ContactSection({ contact, contactForm }: ContactSectionProps) {
  if (!contact.enabled) return null;

  return (
    <section id="contact" className="py-12">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 md:mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {contact.title.split(contact.highlight)[0]}
        <span className="text-purple-400"> {contact.highlight}</span>
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-10">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ContactForm {...contactForm}/>
        </motion.div>
        <motion.div
          className="flex-1 space-y-5"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <h3 className="text-sm md:text-base font-semibold mb-2 text-purple-400">Email</h3>
            <p className="text-sm text-gray-300">{contact.email}</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <h3 className="text-sm md:text-base font-semibold mb-2 text-purple-400">Location</h3>
            <p className="text-sm text-gray-300">{contact.location}</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <h3 className="text-sm md:text-base font-semibold mb-2 text-purple-400">Social</h3>
            <div className="flex gap-4 mt-4">
              {contact.socialLinks.map((link: { name: string; url: string; icon: string }, index: number) => {
                const IconComponent = iconComponents[link.icon];
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 