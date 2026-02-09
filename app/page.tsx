import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import HeroSection from "@/components/HeroSection";
import { Features } from "@/components/Features";

export default function Home() {
  return (
    <div >
      <HeroSection />
      {/* <Hero /> */}

      {/* <div className="pt-[40vh] bg-denary">

      </div> */}
      {/* <div className="pt-[10vh] bg-denary">

      </div> */}
      <Features />
      <ShowcaseSection />




      <Footer />
    </div>
  );
}
