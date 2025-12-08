import Navbar from "@/components/ui/navbar";
import dynamic from "next/dynamic";
import Blog from "@/components/sections/blog";

const About = dynamic(() => import("@/components/sections/About"), {
    loading: () => <div className="w-full h-96 flex items-center justify-center">Loading...</div>,
});



export default function AboutPage() {
    return (
        <>
            <Navbar />
            <section className="w-full bg-background py-16 md:py-24 lg:py-32">
                <About />
                <Blog />
            </section>
        </>
    )
}