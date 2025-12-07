'use client'
import { useEffect, useState } from "react"


export default function Navbar() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth > 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <nav>
            {isDesktop ? (
                <button className="fixed top-8 left-1/2 -translate-x-1/2 z-20 px-6 py-2 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors">
                    Contact
                </button>

            ) : (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20 px-6 py-2 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors">
                    Hello
                </div>
            )}
        </nav>
    )
}