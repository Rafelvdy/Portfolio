import { AnimatedDottedBorder } from "@/components/ui/animated-dotted-border";

interface PortfolioCardProps {
    children: React.ReactNode;
}
export default function PortfolioCard({ children }: PortfolioCardProps) {
    return (            
        <AnimatedDottedBorder 
            className="w-fit h-fit p-10 hover:cursor-pointer hover:text-red-500 transition-all duration-100 delay-100" 
            animationDuration={20}
            hoverExpand={true}
        >
            <div className="text-foreground">
                {children}
            </div>
        </AnimatedDottedBorder>
   
    )
}