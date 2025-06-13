"use client";

import { useMap } from "@vis.gl/react-google-maps";
import { useCallback, useState, type Dispatch } from "react";
import {
  type State,
  type Action,
  DrawingActionKind,
  ShapeData,
} from "@/types/maps-types";
import { deleteShapes, updateShapes } from "@/services/mapsZonesServices";
import { isCircle, isPolygon } from "@/utils/mapsUtils";
import { addToast } from "@heroui/react";
import PrimaryButton from "@/components/buttons/PrimaryButton";

interface UndoRedoControlProps {
  drawingManager: google.maps.drawing.DrawingManager | null;
  isDeleteMode: boolean;
  onToggleDeleteMode: () => void;
  state: State;
  dispatch: Dispatch<Action>;
}

export function UndoRedoControl({
  isDeleteMode,
  onToggleDeleteMode,
  state,
  dispatch,
}: UndoRedoControlProps) {
  const map = useMap();
  const [isLoading, setIsLoading] = useState(false);

  const handleUndo = useCallback(() => {
    dispatch({
      type: DrawingActionKind.UNDO,
      payload: { map },
    });
  }, [dispatch, map]);

  const handleRedo = useCallback(() => {
    dispatch({
      type: DrawingActionKind.REDO,
      payload: { map },
    });
  }, [dispatch, map]);

  const handleSubmit = async () => {
    // Handle save changes logic here
    setIsLoading(true);
    try {
      const shapesToSave: ShapeData[] = state.now.map((shape) => ({
        _id: shape.dbId,
        type: isCircle(shape.geometry) ? "CIRCLE" : "POLYGON",
        clientId: shape.id ?? "",
        circle: isCircle(shape.geometry)
          ? {
              center: {
                lat: shape.geometry.getCenter()?.lat() ?? 0,
                lng: shape.geometry.getCenter()?.lng() ?? 0,
              },
              radius: shape.geometry.getRadius(),
            }
          : undefined,
        polygon: isPolygon(shape.geometry)
          ? {
              path:
                shape.geometry
                  .getPath()
                  ?.getArray()
                  .map((latLng) => ({
                    lat: latLng.lat(),
                    lng: latLng.lng(),
                  })) ?? [],
            }
          : undefined,
      }));
      await updateShapes(shapesToSave);
      await deleteShapes(state.shapesToDelete);
      addToast({
        title: "Cobertura Actualizada",
        description: "Las zonas han sido actualizadas correctamente",
        color: "success",
      });
    } catch {
      addToast({
        title: "Error",
        description: "Error al guardar los cambios",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded bg-white p-2 shadow-md">
      <div className="mb-2 flex gap-2">
        <PrimaryButton
          color="secondary"
          variant="bordered"
          size="sm"
          onPress={onToggleDeleteMode}
          className="border-primary"
          title={isDeleteMode ? "Exit Delete Mode" : "Enter Delete Mode"}
        >
          {isDeleteMode ? "Salir" : "Modo Borrar Zonas"}
        </PrimaryButton>

        {!isDeleteMode && (
          <>
            <PrimaryButton
              size="sm"
              onPress={handleSubmit}
              isDisabled={isLoading}
              title="save changes"
              isLoading={isLoading}
            >
              Guardar Cambios
            </PrimaryButton>

            {/* Undo and Redo buttons */}
            <PrimaryButton
              className={` ${
                state.past.length > 0
                  ? "bg-gray-700 text-white hover:bg-gray-800"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
              onPress={handleUndo}
              isDisabled={state.past.length === 0}
              title="Undo"
              size="sm"
            >
              Deshacer Cambios
            </PrimaryButton>
            <PrimaryButton
              className={`${
                state.future.length > 0
                  ? "bg-gray-700 text-white hover:bg-gray-800"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
              onPress={handleRedo}
              isDisabled={state.future.length === 0}
              title="Redo"
              size="sm"
            >
              Rehacer Cambios
            </PrimaryButton>
          </>
        )}
      </div>

      {isDeleteMode && (
        <div className="mt-2 rounded bg-red-100 p-2 text-sm text-red-800">
          <p>Modo de Borrado Activado: Clickea en la zona a borrar</p>
        </div>
      )}
    </div>
  );
}
