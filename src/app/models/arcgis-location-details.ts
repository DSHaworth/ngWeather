export interface ArcGisLocationDetails {
  locations: Location[]
}

export interface Location {
  extent: Extent,
  feature: Feature,
  name: string
}

export interface Extent{
  xmax: number,
  xmin: number,
  ymax: number,
  ymin: number
}

export interface Feature{
  attributes: Attributes,
  geometry: Geometry
}

export interface Attributes{
  Addr_Type: string,
  Score: number
}

export interface Geometry{
  x: number,
  y: number
}
