export interface CityTranslate {
  features: Array<{
    bbox: number[]
    geometry: Geometry
    properties: Properties
    type: string
  }>
  query: {
    lat: number
    lon: number
    plus_code: string
  }
  type: string
}

interface Geometry {
  coordinates: number[]
  type: string
}

interface Properties {
  address_line1: string
  address_line2: string
  category: string
  city: string
  country: string
  country_code: string
  county: string
  datasource: Datasource
  district: string
  formatted: string
  lat: number
  lon: number
  place_id: string
  plus_code: string
  rank: Rank
  result_type: string
  state: string
  timezone: Timezone
  village: string
}

interface Datasource {
  attribution: string
  license: string
  sourcename: string
  url: string
}

interface Rank {
  confidence: number
  confidence_city_level: number
  importance: number
  match_type: string
  popularity: number
}

interface Timezone {
  name: string
  offset_DST: string
  offset_DST_seconds: number
  offset_STD: string
  offset_STD_seconds: number
}
