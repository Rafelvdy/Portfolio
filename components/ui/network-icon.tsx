"use client";

import { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/public/images/Network.json";

interface NetworkIconProps {
    height?: number;
    width?: number;
    loop?: boolean;
    className?: string;
    autoplay?: boolean;
}

export default function NetworkIcon({ 
    height, 
    width, 
    loop = true, 
    className,
    autoplay = true 
}: NetworkIconProps) {
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