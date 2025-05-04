import ImageCarousel from "@/components/carousel/ImageCarousel";
import ContactForm from "@/components/sections/ContactForm";
import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <main className="bg-primary_bg bg-contain">
      <ImageCarousel
        showArrows={false}
        images={[
          "/images.jpeg",
          "/internet.jpg",
          "/tipos-fibra-optica-internet.jpg",
        ]}
      />
      <HeroSection />
      <WhyChooseUs />
      <ContactForm />
    </main>
  );
}
