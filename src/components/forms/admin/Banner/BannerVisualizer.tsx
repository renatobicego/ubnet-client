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
import { updateBanners } from "@/services/bannerServices";
import { FaTrash } from "react-icons/fa6";

// Sortable banner item component
const SortableBannerItem = ({ banner }: { banner: ImageBanner }) => {
  const { isEditing } = useBannerContext();
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
      >
        <div className="relative mb-1 w-full">
          <Image
            alt={banner.description}
            className="aspect-[3/1] w-full object-cover"
            removeWrapper
            src={banner.imageUrl || "/placeholder.svg"}
          />
          <p className="shadow-small rounded-large absolute top-2 left-2 z-10 border-white/20 px-2 py-1 text-xs text-black backdrop-blur-2xl">
            Imagen en formato computadora
          </p>
        </div>
        {banner.mobileImageUrl && (
          <div className="relative w-full">
            <Image
              alt={banner.description}
              className="aspect-video w-full object-cover"
              removeWrapper
              src={banner.mobileImageUrl || "/placeholder.svg"}
            />
            <p className="shadow-small rounded-large absolute top-2 left-2 z-10 border-white/20 px-2 py-1 text-xs text-black backdrop-blur-2xl">
              Imagen en formato teléfono
            </p>
          </div>
        )}
        <CardFooter className="rounded-large shadow-small absolute bottom-1 z-10 ml-1 flex w-[calc(100%_-_8px)] items-center justify-between gap-2 overflow-hidden border-1 border-white/20 py-1 before:rounded-xl before:bg-white/10">
          <menu className="flex items-center gap-2">
            <EditBanner banner={banner} />
            <Button isIconOnly radius="full" color="danger">
              <FaTrash />
            </Button>
          </menu>
          <p className="flex-1 text-right text-white/80">
            {banner.description}
          </p>
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
    try {
      const resData = await updateBanners(banners);
      onReorder(resData);
    } catch {
      addToast({
        title: "Error al guardar los banners",
        description: "No se pudo guardar el orden de los banners.",
        color: "danger",
      });
      return;
    }
    setIsEditing((prev) => ({
      ...prev,
      editingOrder: false,
    }));
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
            <PrimaryButton onPress={handleSave}>Guardar Cambios</PrimaryButton>
          </menu>
        )}
      </div>
    </DndContext>
  );
};

export default BannerVisualizer;
