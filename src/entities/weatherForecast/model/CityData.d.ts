export type CityData = {
  address: Address
  addresstype: string
  boundingbox: string[]
  class: string
  display_name: string
  importance: number
  lat: string
  licence: string
  lon: string
  name: string
  osm_id: number
  osm_type: string
  place_id: number
  place_rank: number
  type: string
}

type Address = {
  'ISO3166-2-lvl4': string
  amenity: string
  city: string
  country: string
  country_code: string
  county: string
  house_number: string
  postcode: string
  region: string
  square: string
  state: string
}
