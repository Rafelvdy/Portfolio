import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Navbar from "@/components/ui/navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Portfolio />
      <About />
    </>
  );
}
