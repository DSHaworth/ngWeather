export interface IForecastOffice {
  id: string,
  name: string,
  address: IAddress,
  telephone: string,
  faxNumber: string,
  email: string,
  sameAs: string,
  nwsRegion: string,
  parentOrganization: string,
  responsibleCounties: string[],
  responsibleForecastZones: string[],
  responsibleFireZones: string[],
  approvedObservationStations: string[]
}

export interface IAddress {
  "@type": string,
  streetAddress: string,
  addressLocality: string,
  addressRegion: string,
  postalCode: string
}
