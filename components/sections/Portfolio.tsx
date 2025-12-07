import PortfolioCard from "@/components/ui/portfolio-card";

export default function Portfolio() {

    const projects = [
        {
          projectTitle: "Dunstan Detailing",
          projectDescription: "Custom built and hosted website for a local car detailing business featuring online booking and service packages.",
          projectQuote: "StratosFi transformed our online presence completely. Bookings increased by 200%!",
          projectQuoteAuthor: "Luke Dunstan, Owner",
          projectLink: "https://dunstandetailing.com",
          projectImage: "/customer-logos/dunstan-detailing.jpg",
          techStack: ["Next.js", "React Framework", "GSAP"],
          category: "Web Development"
        },
      ];

    return (
        <section className="w-full bg-background py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Portfolio
            </h2>
            <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore projects I've built for clients, from custom websites to full-stack applications.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto justify-items-center">
            {projects.map((project, index) => (
              <PortfolioCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
    )
}