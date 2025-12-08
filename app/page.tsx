import dynamic from "next/dynamic";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/sections/Hero";

const Services = dynamic(() => import("@/components/sections/Services"), {
    loading: () => <div className="w-full h-96 flex items-center justify-center">Loading...</div>,
});

const Portfolio = dynamic(() => import("@/components/sections/Portfolio"), {
    loading: () => <div className="w-full h-96 flex items-center justify-center">Loading...</div>,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
    </>
  );
}
