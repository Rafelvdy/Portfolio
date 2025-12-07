"use client";

import Lottie from "lottie-react";
import animationData from "@/public/images/WebDevelopment.json";

interface WebDevelopmentIconProps {
    height?: number;
    width?: number;
    loop?: boolean;
}

export default function WebDevelopmentIcon({ height, width, loop }: WebDevelopmentIconProps) {
    return (
        <div className={`w-${width} h-${height}`}>
            <Lottie animationData={animationData} loop={loop} />
      </div>
    )
}