export interface OverpassBar {
  lat: number;
  lon: number;
  tags: OverpassTag;
}

interface OverpassTag {
  amenity;
  brewery;
  name;
}
