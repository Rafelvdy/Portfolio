"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatedDottedBorder } from "@/components/ui/animated-dotted-border";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    title: string;
    description: string;
    animationData: object;
    className?: string;
}

export function ServiceCard({ title, description, animationData, className }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef.current) {
            if (isHovered) {
                lottieRef.current.play();
            } else {
                lottieRef.current.pause();
            }
        }
    }, [isHovered]);

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
                        "text-sm md:text-base flex-1 transition-colors duration-300 mt-40",
                        isHovered ? "text-foreground" : "text-muted-foreground"
                    )}>
                        {description}
                    </p>
                </div>
            </AnimatedDottedBorder>
        </div>
    );
}
