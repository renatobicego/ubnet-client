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
  past: Overlay[][];
  now: Overlay[];
  future: Overlay[][];
  shapesToDelete: string[]; // IDs of shapes to delete
}

export interface DrawResult {
  type: google.maps.drawing.OverlayType;
  overlay: google.maps.Circle | google.maps.Polygon;
  _id?: string; // MongoDB _id
}

export type Action =
  | { type: DrawingActionKind.UPDATE_OVERLAYS }
  | { type: DrawingActionKind.SET_OVERLAY; payload: DrawResult }
  | { type: DrawingActionKind.DELETE_OVERLAY; payload: { id: string } }
  | { type: DrawingActionKind.UNDO; payload: { map: google.maps.Map | null } }
  | { type: DrawingActionKind.REDO; payload: { map: google.maps.Map | null } }
  | { type: DrawingActionKind.LOAD_SHAPES; payload: { shapes: Overlay[] } };

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
