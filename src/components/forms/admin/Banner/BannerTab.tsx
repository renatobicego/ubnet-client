import { useEffect, useState } from "react";
import BannerVisualizer from "./BannerVisualizer";
import { ImageBanner } from "@/components/carousel/ImageCarousel";
import { addToast } from "@heroui/react";
import { getAllBanners } from "@/services/bannerServices";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const BannerTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [banners, setBanners] = useState<ImageBanner[]>([]);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const bannersData = await getAllBanners();
        setBanners(bannersData);
      } catch {
        addToast({
          title: "Error al cargar los banners",
          description: "No se pudieron cargar los banners.",
          color: "danger",
        });
      }
    };
    fetchBanners();
  }, []);
  return (
    <div className="w-full">
      <PrimaryButton onPress={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? "Ocultar formulario" : "Agregar banner"}
      </PrimaryButton>
      {showForm ? <></> : <BannerVisualizer banners={banners} />}
    </div>
  );
};

export default BannerTab;
