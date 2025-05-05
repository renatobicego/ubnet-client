export enum DrawingActionKind {
  UPDATE_OVERLAYS = "update_overlays",
  SET_OVERLAY = "set_overlay",
  DELETE_OVERLAY = "delete_overlay",
  UNDO = "undo",
  REDO = "redo",
  LOAD_SHAPES = "load_shapes",
}

export interface Snapshot {
  center?: google.maps.LatLngLiteral;
  radius?: number;
  path?: google.maps.LatLng[];
}

export interface Overlay {
  type: google.maps.drawing.OverlayType;
  geometry: google.maps.Circle | google.maps.Polygon;
  snapshot: Snapshot;
  id?: string;
  dbId?: string; // MongoDB _id
}

export interface State {
  now: Overlay[];
}

export interface DrawResult {
  type: google.maps.drawing.OverlayType;
  overlay: google.maps.Circle | google.maps.Polygon;
}

export type Action =
  | { type: DrawingActionKind.UPDATE_OVERLAYS }
  | { type: DrawingActionKind.SET_OVERLAY; payload: DrawResult }
  | { type: DrawingActionKind.DELETE_OVERLAY; payload: { id: string } }
  | { type: DrawingActionKind.UNDO }
  | { type: DrawingActionKind.REDO }
  | { type: DrawingActionKind.LOAD_SHAPES; payload: { shapes: ShapeData[] } };

// MongoDB data models
export interface CircleData {
  center: {
    lat: number;
    lng: number;
  };
  radius: number;
}

export interface PolygonData {
  path: {
    lat: number;
    lng: number;
  }[];
}

export interface ShapeData {
  _id?: string;
  type: "CIRCLE" | "POLYGON";
  clientId: string;
  circle?: CircleData;
  polygon?: PolygonData;
  createdAt?: Date;
  updatedAt?: Date;
}
