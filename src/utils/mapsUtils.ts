export function isCircle(
  geometry: google.maps.Circle | google.maps.Polygon,
): geometry is google.maps.Circle {
  return "getRadius" in geometry;
}

export function isPolygon(
  geometry: google.maps.Circle | google.maps.Polygon,
): geometry is google.maps.Polygon {
  return "getPath" in geometry;
}
