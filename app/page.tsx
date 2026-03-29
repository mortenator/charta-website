import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChartTypes from "@/components/ChartTypes";
import Demo from "@/components/Demo";
import Pricing from "@/components/Pricing";
import SecondaryHero from "@/components/SecondaryHero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ overflow: "clip", background: "#000000" }}
    >
      <Navbar />
      <Hero />
      <Features />
      <ChartTypes />
      <Demo />
      <Pricing />
      <SecondaryHero />
      <Footer />
    </div>
  );
}
