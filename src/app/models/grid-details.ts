export interface GridDetails {
  properties: GridDetailProperties,
  timeZone: string
}

export interface GridDetailProperties {
  id: string,
  type: string,
  country: string,
  cwa: string,
  fireWeatherZone: string,
  forecast: string,
  forcastGridData: string,
  forecastHourly: string,
  forecastZone: string,
  gridId: string,
  gridX: number,
  gridY: number,
  obsercationStations: string,
  radarStation: string
}

