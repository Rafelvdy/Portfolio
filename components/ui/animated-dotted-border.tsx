'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedDottedBorderProps {
  children: React.ReactNode;
  className?: string;
  dotSize?: number;
  dotGap?: number;
  animationDuration?: number;
  strokeWidth?: number;
  hoverExpand?: boolean;
}

interface DotPosition {
  x: number;
  y: number;
  index: number;
  edge: 'top' | 'right' | 'bottom' | 'left'; 
}

export function AnimatedDottedBorder({
  children,
  className,
  dotSize = 3,
  dotGap = 12,
  animationDuration = 20,
  strokeWidth = 2,
  hoverExpand = false, 
}: AnimatedDottedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dotPositions, setDotPositions] = useState<DotPosition[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateDotPositions = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      if (width === 0 || height === 0) return;

      const radius = dotSize * 2;
      const padding = strokeWidth / 2;
      const innerWidth = width - padding * 2;
      const innerHeight = height - padding * 2;

      const positions: DotPosition[] = [];
      let index = 0;
      const dotSpacing = dotSize + dotGap;

      const topStartX = padding + radius;
      const topEndX = padding + innerWidth - radius;
      const topY = padding;
      for (let x = topStartX; x < topEndX; x += dotSpacing) {
        positions.push({ x, y: topY, index: index++, edge: 'top' });
      }
      const rightX = padding + innerWidth;
      const rightStartY = padding + radius;
      const rightEndY = padding + innerHeight - radius;
      for (let y = rightStartY; y < rightEndY; y += dotSpacing) {
        positions.push({ x: rightX, y, index: index++, edge: 'right' });
      }
      const bottomStartX = padding + innerWidth - radius;
      const bottomEndX = padding + radius;
      const bottomY = padding + innerHeight;
      for (let x = bottomStartX; x > bottomEndX; x -= dotSpacing) {
        positions.push({ x, y: bottomY, index: index++, edge: 'bottom' });
      }
      const leftX = padding;
      const leftStartY = padding + innerHeight - radius;
      const leftEndY = padding + radius;
      for (let y = leftStartY; y > leftEndY; y -= dotSpacing) {
        positions.push({ x: leftX, y, index: index++, edge: 'left' });
      }

      setDotPositions(positions);
    };

    updateDotPositions();
    
    const resizeObserver = new ResizeObserver(updateDotPositions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [dotSize, dotGap, strokeWidth]);

  const totalDots = dotPositions.length;
  const delayStep = totalDots > 0 ? animationDuration / totalDots : 0;
  const offWindowPercent = 2;

  useEffect(() => {
    const styleId = 'animated-dotted-border-keyframes';
    if (!document.getElementById(styleId)) {
      const offStart = 100 - offWindowPercent;
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes dot-fade {
          0%, ${offStart}%, 100% {
            opacity: 1;
          }
          ${offStart + offWindowPercent / 2}% {
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, [offWindowPercent]);

  const getExpandedRadii = (edge: string, isHovered: boolean) => {
    if (!isHovered) {
      return { rx: dotSize / 2, ry: dotSize / 2 };
    }
    
    const stretchAmount = dotGap + dotSize;
    if (edge === 'top' || edge === 'bottom') {
      return { rx: stretchAmount / 2, ry: dotSize / 2 };
    } else {
      return { rx: dotSize / 2, ry: stretchAmount / 2 };
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={cn('relative', className)}
      onMouseEnter={() => hoverExpand && setIsHovered(true)}
      onMouseLeave={() => hoverExpand && setIsHovered(false)}
    >
      {dotPositions.length > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{
            borderRadius: '0.5rem',
          }}
        >
          {dotPositions.map((dot) => {
            const delay = totalDots > 0 ? (dot.index * delayStep) % animationDuration : 0;
            const radii = getExpandedRadii(dot.edge, isHovered);
            
            return (
              <ellipse
                key={dot.index}
                cx={dot.x}
                cy={dot.y}
                rx={radii.rx}
                ry={radii.ry}
                fill="currentColor"
                style={{
                  animation: `dot-fade ${animationDuration}s linear infinite`,
                  animationDelay: `${-delay}s`,
                  transition: 'rx 0.3s ease-in-out, ry 0.3s ease-in-out',
                }}
              />
            );
          })}
        </svg>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}