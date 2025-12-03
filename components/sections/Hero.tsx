import { FallingPattern } from "@/components/falling-pattern";

export default function Hero() {
    return (
        <section className="relative h-screen w-screen flex items-center justify-center bg-background">
            <button className="absolute top-8 left-1/2 -translate-x-1/2 z-20 px-6 py-2 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors">
                Contact
            </button>
            <div className="relative h-[80vh] w-[65vw] sm:w-[75vw] sm:max-w-7xl max-w-5xl mt-20">
                <FallingPattern className="h-full w-full rounded-lg mask-[radial-gradient(ellipse_at_center,transparent,var(--background))]" />
                <div className="absolute inset-0 z-10 p-12 flex flex-col justify-between">
                    <div className="flex-1 flex items-start">
                        <h1 className="font-montserrat text-center text-4xl max-w-xl sm:text-left md:text-6xl md:max-w-lg lg:text-6xl lg:max-w-2xl xl:text-7xl xl:max-w-3xl font-bold text-foreground leading-tight">
                            Build Websites out of this world with StratosFi
                        </h1>
                    </div>
                    <div className="flex-1 flex items-end justify-end">
                        <p className="font-roboto text-center text-xl sm:text-right md:text-2xl md:max-w-md lg:text-3xl lg:max-w-md xl:text-3xl xl:max-w-md text-muted-foreground max-w-lg ">
                            StratosFi aims to elevate the customers online experience on your websites, improving your image and traffic
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}