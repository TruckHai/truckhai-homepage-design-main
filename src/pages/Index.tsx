
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import InsurancePreview from "@/components/InsurancePreview";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <InsurancePreview />
      <PricingSection />
      <Testimonials />
      <SupportSection />
      <Footer />
    </div>
  );
};

export default Index;
