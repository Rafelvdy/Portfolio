import PortfolioCard from "@/components/ui/portfolio-card";
import WebDevelopmentIcon from "@/components/ui/web-development-icon";

export default function Portfolio() {
    return (
        <section className="w-screen h-full">
            {/* <WebDevelopmentIcon height={64} width={64} loop={true} /> */}
            <PortfolioCard>
                <div>
                    <h2>Dunstan Detailing</h2>
                    <p>Custom built and hosted website for a local car detailing business</p>
                </div>
            </PortfolioCard>
        </section>
    )
}