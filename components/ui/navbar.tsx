'use client'
import { useEffect, useState } from "react"
import Link from "next/link";
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
                <div className="flex flex-row gap-4 fixed top-8 right-8 z-20">
                    <button className="z-20 px-6 py-2 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors">
                        <Link href="/">Home</Link>
                    </button>
                    <button className="z-20 px-6 py-2 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors">
                        <Link href="/about">About</Link>
                    </button>
                    <button className="z-20 px-6 py-2 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors">
                        <Link href="/contact">Contact</Link>
                    </button>
                </div>
            ) : (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20 px-6 py-2 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors">
                    Hello
                </div>
            )}
        </nav>
    )
}