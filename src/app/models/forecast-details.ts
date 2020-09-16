export interface ForecastDetails {
  type: string,
  geometry: Geometry,
  properties: ForecastDetailProperties
}

export interface Geometry{
  type: string,
  coordinates: any[]
}

export interface ForecastDetailProperties{
  updated: string,
  units: string,
  forecastGenerator: string,
  generatedAt: string,
  updateTime: string,
  validTimes: string,
  periods: Periods[]
}

export interface Periods{
  number: number,
  name: string,
  startTime: string,
  endTime: string,
  isDaytime: boolean,
  temperature: number,
  temperatureUnit: string,
  temperatureTrend: string,
  windSpeed: string,
  windDirection: string,
  icon: string,
  shortForecast: string,
  detailedForecast: string
}
