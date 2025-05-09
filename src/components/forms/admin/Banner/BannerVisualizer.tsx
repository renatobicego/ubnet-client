"use client";

import { Dispatch, SetStateAction, useState } from "react";
import type { ImageBanner } from "@/components/carousel/ImageCarousel";
import { Card, CardFooter, Image, Spinner } from "@heroui/react";
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

// Sortable banner item component
const SortableBannerItem = ({ banner }: { banner: ImageBanner }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: banner._id });

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
      {...attributes}
      {...listeners}
      className="min-w-[50%] cursor-grab active:cursor-grabbing"
    >
      <Card
        key={banner._id}
        isFooterBlurred
        className="border-none"
        radius="lg"
      >
        <Image
          alt={banner.description}
          className="aspect-video w-full object-cover"
          height={300}
          removeWrapper
          src={banner.imageUrl || "/placeholder.svg"}
          width={600}
        />
        <CardFooter className="rounded-large shadow-small absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden border-1 border-white/20 py-1 before:rounded-xl before:bg-white/10">
          <p className="text-white/80">{banner.description}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

interface BannerVisualizerProps {
  banners: ImageBanner[];
  onReorder: Dispatch<SetStateAction<ImageBanner[]>>;
  loading: boolean;
  onRefresh: () => Promise<void>;
}

const BannerVisualizer = ({
  banners,
  onReorder,
  loading,
  onRefresh,
}: BannerVisualizerProps) => {
  const [isEditing, setIsEditing] = useState(false);
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
      setIsEditing(true);
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
        <article className="flex w-full items-center justify-between gap-4 overflow-x-auto p-2">
          <SortableContext
            items={banners.map((item) => item._id)}
            strategy={horizontalListSortingStrategy}
          >
            {banners.map((banner) => (
              <SortableBannerItem key={banner._id} banner={banner} />
            ))}
          </SortableContext>
        </article>
        {isEditing && (
          <menu className="flex items-center gap-2">
            <PrimaryButton
              onPress={() => {
                setIsEditing(false);
                onRefresh();
              }}
              color="secondary"
            >
              Cancelar
            </PrimaryButton>
            <PrimaryButton>Guardar Cambios</PrimaryButton>
          </menu>
        )}
      </div>
    </DndContext>
  );
};

export default BannerVisualizer;
