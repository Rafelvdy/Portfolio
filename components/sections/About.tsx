import Image from "next/image";

export default function About() {
  return (
    <section className="w-full bg-background py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl border-dotted border-2 border-foreground rounded-lg p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-48 h-48 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
              <Image
                src="/images/pfp.jpg"
                alt="Rafe Loveday - Full Stack Software Engineer"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-center gap-4">
                <h2 className="font-montserrat text-sm sm:text-md md:text-lg font-medium text-foreground">Rafe Loveday</h2>
                <div className="text-xs sm:text-xs md:text-md inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-blue-500 from- via-blue-900 via-100% w-fit">
                    <p>Next.js (React) • TypeScript • WordPress (CMS)</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

