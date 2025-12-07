"use client";
import { AnimatedDottedBorder } from "@/components/ui/animated-dotted-border";
import { ServiceCard } from "@/components/ui/service-card";
import { useState, useEffect } from "react";
// import WebDevelopmentAnimation from "@/public/images/WebDevelopment.json";
// import NetworkAnimation from "@/public/images/Network.json";

export default function Services() {
    const [webDevAnimation, setWebDevAnimation] = useState<object | null>(null);
    const [networkAnimation, setNetworkAnimation] = useState<object | null>(null);

    
    useEffect(() => {
        // Dynamically load Lottie animations using fetch
        Promise.all([
            fetch("/images/WebDevelopment.json").then(res => res.json()),
            fetch("/images/Network.json").then(res => res.json())
        ]).then(([webDev, network]) => {
            setWebDevAnimation(webDev);
            setNetworkAnimation(network);
        }).catch((error) => {
            console.error("Error loading Lottie animations:", error);
        });
    }, []);
    return (
        <section className="w-full bg-background py-16 md:py-24 lg:py-32 flex flex-col items-center justify-start">
            <div className="lg:w-7xl w-full flex flex-col items-center justify-start gap-6">
                <AnimatedDottedBorder className="w-full p-10">
                    <h2 className="text-center">What can we offer for you?</h2>
                </AnimatedDottedBorder>
                <div className="w-full flex flex-row gap-4 items-stretch">
                    {webDevAnimation && (
                        <ServiceCard
                            title="Web Development" 
                            description="We create custom websites tailored to your needs, whether that's a fast Next.js site for maxmimum performance, or a Wordpress setup that gives you full control to update content whenver you want. No templates, no compromises, just a profressional site that actually works for your business. Let's build something you'll be proud to show off."
                            animationData={webDevAnimation}
                        />
                    )}
                    {networkAnimation && (
                        <ServiceCard
                            title="Coming Soon"
                            description="More services will be added here soon."
                            animationData={networkAnimation}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}