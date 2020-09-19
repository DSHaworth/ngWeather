export interface ForecastDetails {
  type: string,
  geometry: IGeometry,
  properties: IForecastDetailProperties
}

export interface IGeometry{
  type: string,
  coordinates: any[]
}

export interface IForecastDetailProperties{
  updated: string,
  units: string,
  forecastGenerator: string,
  generatedAt: string,
  updateTime: string,
  validTimes: string,
  periods: IPeriod[]
}

export interface IPeriod{
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
