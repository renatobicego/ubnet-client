import reducer from "@/store/mapsReducer";
import { useDeleteClickHandler } from "@/utils/hooks/useDeleteShapeClickHandler";
import { useLoadShapes } from "@/utils/hooks/useLoadShapes";
import {
  useMap,
  useMapsLibrary,
  MapControl,
  ControlPosition,
  Map,
} from "@vis.gl/react-google-maps";
import { useState, useRef, useReducer, useEffect } from "react";
import { UndoRedoControl } from "./UndoRedoControl";
import { useDrawingManager } from "@/utils/hooks/useDrawingManager";
import { useDrawingManagerEvents } from "@/utils/hooks/useDrawingManagerEvents";
import { useOverlaySnapshots } from "@/utils/hooks/useOverlaySnapshots";

const ZoneMapForm = ({
  onEditingChange,
}: {
  onEditingChange?: (isEditing: boolean) => void;
}) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const drawingManager = useDrawingManager(isDeleteMode);
  const map = useMap();
  const drawing = useMapsLibrary("drawing");
  const overlaysShouldUpdateRef = useRef(true);

  const [state, dispatch] = useReducer(reducer, {
    now: [],
    past: [],
    future: [],
  });

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  // Set up event listeners and load shapes
  useDrawingManagerEvents(drawingManager, overlaysShouldUpdateRef, dispatch);
  useOverlaySnapshots(map, state, overlaysShouldUpdateRef);
  useDeleteClickHandler(map, state.now, dispatch, isDeleteMode);
  useLoadShapes(map, drawing, dispatch);

  useEffect(() => {
    if (onEditingChange) onEditingChange(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-[60vh] w-full">
      <Map
        defaultZoom={12}
        defaultCenter={{ lat: -45.8569848, lng: -67.5136643 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        cameraControl
        fullscreenControl
        zoomControl
      />
      <MapControl position={ControlPosition.BOTTOM_CENTER}>
        <UndoRedoControl
          drawingManager={drawingManager}
          isDeleteMode={isDeleteMode}
          onToggleDeleteMode={toggleDeleteMode}
          state={state}
          dispatch={dispatch}
        />
      </MapControl>
    </div>
  );
};

export default ZoneMapForm;
