export type City = {
  bbox: number[]
  geometry: Geometry
  properties: Properties
  type: string
}

type Geometry = {
  coordinates: number[]
  type: string
}

type Properties = {
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

type Datasource = {
  attribution: string
  license: string
  sourcename: string
  url: string
}

type Rank = {
  confidence: number
  confidence_city_level: number
  importance: number
  match_type: string
  popularity: number
}

type Timezone = {
  name: string
  offset_DST: string
  offset_DST_seconds: number
  offset_STD: string
  offset_STD_seconds: number
}
