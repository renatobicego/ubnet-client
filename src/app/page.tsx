import Banners from "@/components/sections/Banners";
import ContactForm from "@/components/sections/ContactForm";
import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <main className="bg-primary_bg bg-contain">
      <Banners />
      <HeroSection />
      <WhyChooseUs />
      <ContactForm />
    </main>
  );
}
