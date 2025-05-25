import { getAllBanners } from "@/services/bannerServices";
import ImageCarousel from "../carousel/ImageCarousel";

const Banners = async () => {
  try {
    const banners = await getAllBanners();
    if (banners.length === 0)
      return (
        <section id="avisos" className={`relative h-[30vh] w-full`}></section>
      );

    return <ImageCarousel showArrows={false} images={banners} />;
  } catch {
    return (
      <section id="avisos" className={`relative h-[30vh] w-full`}></section>
    );
  }
};

export default Banners;
