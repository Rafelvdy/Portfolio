'use client';

import { useEffect } from 'react';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectUrl: string;
  projectTitle: string;
}

export function PortfolioModal({ isOpen, onClose, projectUrl, projectTitle }: PortfolioModalProps) {
  useEffect(() => {
    // Handle ESC key to close modal
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-[95vw] h-[90vh] bg-card rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <h3 className="font-inter text-lg font-semibold text-foreground">
              {projectTitle}
            </h3>
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Open in new tab ↗
            </a>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close preview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* iFrame */}
        <iframe
          src={projectUrl}
          className="w-full h-[calc(100%-4rem)] border-0"
          title={`Preview of ${projectTitle}`}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}