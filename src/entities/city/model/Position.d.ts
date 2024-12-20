export type Position = {
  coords: Coords
  timestamp: number
}

type Coords = {
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number
  longitude: number
  speed: number | null
}
