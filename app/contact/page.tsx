import Navbar from "@/components/ui/navbar";

export default function Contact() {
    return (
        <>
            <Navbar />
            <section className="w-full bg-background py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Contact</h1>
                </div>
            </section>
        </>
    )
}   