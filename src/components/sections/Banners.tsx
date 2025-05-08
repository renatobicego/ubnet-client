import { getAllBanners } from "@/services/bannerServices";
import ImageCarousel from "../carousel/ImageCarousel";

const Banners = async () => {
  try {
    const banners = await getAllBanners();
    if (banners.length === 0) return null;

    return <ImageCarousel showArrows={false} images={banners} />;
  } catch {
    return null;
  }
};

export default Banners;
