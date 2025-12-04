import Image from "next/image";
import { AnimatedDottedBorder } from "@/components/ui/animated-dotted-border";

export default function About() {
  return (
    <section className="w-full bg-background py-16 md:py-24 lg:py-32">
      <AnimatedDottedBorder className="container mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-6xl max-w-[90vw] text-neutral-600 rounded-lg p-10 hover:scale-105 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-0">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-48 h-48 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
              <Image
                src="/images/pfp.jpg"
                alt="Rafe Loveday - Full Stack Software Engineer"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex flex-col gap-1 items-center md:items-start">
              <div className="flex flex-row items-center flex-wrap justify-center md:justify-start gap-4">
                  <h2 className="font-inter text-sm sm:text-md md:text-lg font-medium text-foreground">Rafe Loveday</h2>
                  <div className="font-roboto text-xs sm:text-xs md:text-xs inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-blue-500 from- via-blue-900 via-100% w-fit select-none text-foreground">
                      <p>Next.js (React) • TypeScript • WordPress (CMS)</p>
                  </div>
              </div>
              <div className="flex flex-row items-center justify-center md:justify-start gap-2 opacity-85">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h10v2H7zM5 6V4h2v2zm0 8H3V6h2zm2 2H5v-2h2zm2 2H7v-2h2zm2 2H9v-2h2zm2 0v2h-2v-2zm2-2v2h-2v-2zm2-2v2h-2v-2zm2-2v2h-2v-2zm0-8h2v8h-2zm0 0V4h-2v2zm-5 2h-4v4h4z"/></svg>
                <p className="font-roboto text-xs sm:text-xs md:text-md text-foreground">United Kingdom</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 font-roboto text-sm sm:text-md md:text-md text-foreground opacity-75 font-semibold text-center md:text-left">
                <p>Actively attending <b className="opacity-100 font-bolder">Hackathons</b>, winning competitions like ETH Oxford.</p>
                <p><b className="opacity-100 font-bolder">1 year experience</b> creating solutions using React and Next.js.</p>
                <p>Wordpress is a chosen CMS for many businesses, <b className="opacity-100 font-bolder">allowing my clients to choose to self manage.</b></p>
            </div>
          </div>
        </div>
      </AnimatedDottedBorder>
    </section>
  );
}

