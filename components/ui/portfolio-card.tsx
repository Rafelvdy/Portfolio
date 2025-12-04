'use client';

import { AnimatedDottedBorder } from "@/components/ui/animated-dotted-border";
import Image from "next/image";
import { useState } from "react";
import { PortfolioModal } from "./portfolio-modal";

interface PortfolioCardProps {
  projectTitle: string;
  projectDescription: string;
  projectQuote?: string;
  projectQuoteAuthor?: string;
  projectLink: string;
  projectImage: string;
  techStack: string[];
  category?: string;
}

export default function PortfolioCard({ 
  projectTitle, 
  projectDescription, 
  projectQuote, 
  projectQuoteAuthor, 
  projectLink,
  projectImage,
  techStack,
  category = "Web Development"
}: PortfolioCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AnimatedDottedBorder 
        className="group w-full max-w-md text-neutral-600 hover:text-fuchsia-500 rounded-lg p-4 hover:scale-[1.02] transition-all duration-300" 
        animationDuration={25}
        hoverExpand={true}
      >
        <div className="flex flex-col h-full gap-4">
          <div className="relative w-full h-48 bg-muted overflow-hidden rounded-lg">
            <Image
              src={projectImage}
              alt={projectTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            {category && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xxs font-medium text-foreground">
                {category}
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-2">
              <h3 className="font-inter text-xl md:text-2xl font-bold text-foreground">
                {projectTitle}
              </h3>
              <p className="font-roboto text-sm text-foreground opacity-75 leading-relaxed">
                {projectDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="font-roboto text-xxs px-3 py-1 rounded-full bg-primary/10 text-foreground border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Quote (if provided) */}
            {projectQuote && (
              <div className="mt-2 pl-4 border-l-2 border-primary/50">
                <p className="font-roboto text-sm italic text-foreground opacity-70">
                  "{projectQuote}"
                </p>
                {projectQuoteAuthor && (
                  <p className="font-roboto text-xs text-foreground opacity-60 mt-1">
                    — {projectQuoteAuthor}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto pt-4">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Preview Site
              </button>
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-accent transition-colors"
              >
                Visit Live →
              </a>
            </div>
          </div>
        </div>
      </AnimatedDottedBorder>

      {/* Modal for full-screen preview */}
      <PortfolioModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        projectUrl={projectLink}
        projectTitle={projectTitle}
      />
    </>
  );
}