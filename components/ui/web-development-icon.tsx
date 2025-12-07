"use client";

import { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/public/images/WebDevelopment.json";

interface WebDevelopmentIconProps {
    height?: number;
    width?: number;
    loop?: boolean;
    className?: string;
    autoplay?: boolean;
}

export default function WebDevelopmentIcon({ 
    height, 
    width, 
    loop = true, 
    className,
    autoplay = true 
}: WebDevelopmentIconProps) {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef.current) {
            if (autoplay) {
                lottieRef.current.play();
            } else {
                lottieRef.current.pause();
            }
        }
    }, [autoplay]);

    const containerStyle = {
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
    };

    return (
        <div style={containerStyle} className={className}>
            <Lottie 
                lottieRef={lottieRef}
                animationData={animationData} 
                loop={loop}
                autoplay={autoplay}
            />
        </div>
    )
}