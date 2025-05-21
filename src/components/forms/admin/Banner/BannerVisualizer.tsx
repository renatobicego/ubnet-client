"use client";

import type { ImageBanner } from "@/components/carousel/ImageCarousel";
import {
  addToast,
  Button,
  Card,
  CardFooter,
  Image,
  Spinner,
} from "@heroui/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import EditBanner from "@/components/modals/banners/EditBanner";
import { useBannerContext } from "@/context/BannerContext";
import { deleteBanner, updateBanners } from "@/services/bannerServices";
import { FaTrash } from "react-icons/fa6";
import { UT_URL } from "@/utils/urls";
import { deleteFilesService } from "@/services/uploadthingServices";
import { useState } from "react";

// Sortable banner item component
const SortableBannerItem = ({ banner }: { banner: ImageBanner }) => {
  const { isEditing, setBanners } = useBannerContext();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: banner._id,
    disabled: isEditing.editingBannerModalOpen,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas borrar este banner?",
    );
    if (!confirmDelete) return;
    try {
      await deleteBanner(banner._id);
      addToast({
        title: "Banner borrado",
        description: "El banner ha sido borrado con éxito.",
        color: "success",
      });
      setBanners((prevBanners) =>
        prevBanners.filter((b) => b._id !== banner._id),
      );
      deleteFilesService([banner.imageUrl, banner.mobileImageUrl || ""]);
    } catch {
      addToast({
        title: "Error al borrar el banner",
        description: "No se pudo borrar el banner. Inténtalo de nuevo.",
        color: "danger",
      });
    }
    return;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isEditing.editingBannerModalOpen ? {} : attributes)}
      {...(isEditing.editingBannerModalOpen ? {} : listeners)}
      className={`min-w-[60%] ${
        isEditing.editingBannerModalOpen
          ? "cursor-default"
          : "cursor-grab active:cursor-grabbing"
      }`}
    >
      <Card
        key={banner._id}
        isFooterBlurred
        className="border-none"
        radius="lg"
        classNames={{
          footer: "bg-white/60 ",
        }}
      >
        <div className="relative mb-1 w-full">
          <Image
            alt={banner.description}
            className="aspect-[3/1] w-full object-cover"
            removeWrapper
            src={`${UT_URL}/${banner.imageUrl}`}
          />
          <p className="shadow-small rounded-large absolute top-2 left-2 z-10 border-white/20 bg-white/60 px-2 py-1 text-xs text-black backdrop-blur-2xl">
            Imagen en formato computadora
          </p>
        </div>
        {banner.mobileImageUrl && (
          <div className="relative w-full">
            <Image
              alt={banner.description}
              className="aspect-video w-full object-cover"
              removeWrapper
              src={`${UT_URL}/${banner.mobileImageUrl}`}
            />
            <p className="shadow-small rounded-large absolute top-2 left-2 z-10 border-white/20 bg-white/60 px-2 py-1 text-xs text-black backdrop-blur-2xl">
              Imagen en formato teléfono
            </p>
          </div>
        )}
        <CardFooter className="rounded-large shadow-small absolute bottom-1 z-10 ml-1 flex w-[calc(100%_-_8px)] items-center justify-between gap-2 overflow-hidden border-1 border-white/20 py-1 before:rounded-xl before:bg-white/10">
          <menu className="flex items-center gap-2">
            <EditBanner banner={banner} />
            <Button
              onPress={handleDelete}
              isIconOnly
              radius="full"
              color="danger"
            >
              <FaTrash />
            </Button>
          </menu>
          <p className="flex-1 text-right text-black">{banner.description}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

const BannerVisualizer = () => {
  const {
    isEditing,
    fetchBanners: onRefresh,
    setIsEditing,
    setBanners: onReorder,
    banners,
    loading,
  } = useBannerContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Set up sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setIsEditing((prev) => ({
        ...prev,
        editingOrder: true,
      }));

      onReorder((currentItems) => {
        const oldIndex = currentItems.findIndex(
          (item) => item._id === active.id,
        );
        const newIndex = currentItems.findIndex((item) => item._id === over.id);

        const newOrder = arrayMove(currentItems, oldIndex, newIndex).map(
          (item, index) => ({
            ...item,
            order: index,
          }),
        );

        return newOrder;
      });
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const resData = await updateBanners(banners);
      onReorder(resData);
      setIsEditing((prev) => ({
        ...prev,
        editingOrder: false,
      }));
    } catch {
      addToast({
        title: "Error al guardar los banners",
        description: "No se pudo guardar el orden de los banners.",
        color: "danger",
      });
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Spinner className="mx-auto mt-8" size="lg" />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex w-full flex-col items-end justify-between gap-4">
        <article className="flex w-full items-start justify-between gap-4 overflow-x-auto p-2">
          <SortableContext
            items={banners.map((item) => item._id)}
            strategy={horizontalListSortingStrategy}
            disabled={isEditing.editingBannerModalOpen}
          >
            {banners.map((banner) => (
              <SortableBannerItem key={banner._id} banner={banner} />
            ))}
          </SortableContext>
        </article>
        {isEditing.editingOrder && (
          <menu className="flex items-center gap-2">
            <PrimaryButton
              onPress={() => {
                setIsEditing((prev) => ({
                  ...prev,
                  editingOrder: false,
                }));
                onRefresh();
              }}
              color="secondary"
            >
              Cancelar
            </PrimaryButton>
            <PrimaryButton
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
              onPress={handleSave}
            >
              Guardar Cambios
            </PrimaryButton>
          </menu>
        )}
      </div>
    </DndContext>
  );
};

export default BannerVisualizer;
