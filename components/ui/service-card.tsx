"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatedDottedBorder } from "@/components/ui/animated-dotted-border";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    title: string;
    description: string;
    animationData: object | null;
    className?: string;
}

function isValidLottieData(data: any): boolean {
    return (
        data &&
        typeof data === 'object' &&
        'v' in data &&
        'fr' in data &&
        'layers' in data &&
        Array.isArray(data.layers)
    );
}

export function ServiceCard({ title, description, animationData, className }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (lottieRef.current && isMounted && animationData && isValidLottieData(animationData)) {
            if (isHovered) {
                lottieRef.current.play();
            } else {
                lottieRef.current.pause();
            }
        }
    }, [isHovered, isMounted, animationData]);

    if (!animationData || !isValidLottieData(animationData)) {
        return (
            <div className={cn("h-full flex-1", className)}>
                <AnimatedDottedBorder className="h-full relative overflow-hidden">
                    <div className="relative z-10 p-10 flex flex-col h-full">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-muted-foreground">{title}</h3>
                        <p className="text-sm md:text-base flex-1 text-muted-foreground mt-40">{description}</p>
                    </div>
                </AnimatedDottedBorder>
            </div>
        );
    }

    const glassCardStyle = `
        .glass-card::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%);
            animation: liquidMove 6s infinite linear;
          }
          @keyframes liquidMove {
            0% { transform: rotate(0deg) translate(0, 0); }
            50% { transform: rotate(180deg) translate(50px, 50px); }
            100% { transform: rotate(360deg) translate(0, 0); }
          }
    `;

    return (
        <div
            className={cn("h-full flex-1", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            tabIndex={0}
        >
            <AnimatedDottedBorder 
                className="h-full relative overflow-hidden"
                hoverExpand={true}
            >
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {isValidLottieData(animationData) && (
                        <Lottie
                            lottieRef={lottieRef}
                            animationData={animationData}
                            loop={true}
                            autoplay={false}
                            className={cn(
                                "w-full h-full transition-opacity duration-300",
                                isHovered ? "opacity-100" : "opacity-30"
                            )}
                            style={{
                                filter: isHovered ? "blur(0px)" : "blur(4px)",
                                transition: "filter 300ms ease-in-out",
                            }}
                        />
                    )}
                </div>
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        zIndex: 5,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '150px 150px',
                        opacity: 0.8,
                        mixBlendMode: 'overlay',
                    }}
                />
                <div 
                    className={cn(
                        "relative z-10 p-10 flex flex-col h-full transition-all duration-300 ease-in-out",
                        isHovered ? "scale-105" : "scale-100"
                    )}
                >
                    <h3 className={cn(
                        "text-xl md:text-2xl font-semibold mb-4 transition-colors duration-300 font-roboto text-foreground"
                    )}>
                        {title}
                    </h3>
                    <p className={cn(
                        "text-sm md:text-base flex-1 transition-colors duration-300 mt-40 relative z-10 py-3 px-4",
                        isHovered ? "text-foreground" : "text-muted-foreground"
                    )}>
                        <span 
                            className="absolute inset-0 -z-10 rounded-4xl backdrop-blur-xl bg-gradient-to-br from-background/10 via-background/5 to-background/10 border border-border/20"
                            style={{
                                borderRadius: '2rem',
                                clipPath: 'inset(0 round 2rem)',
                                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <span 
                            className="absolute inset-0 -z-10 rounded-4xl opacity-30 pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                                borderRadius: '2rem',
                                clipPath: 'inset(0 round 2rem)',
                            }}
                        />
                        <span className="relative z-10">{description}</span>
                    </p>
                </div>
            </AnimatedDottedBorder>
        </div>
    );
    
}
