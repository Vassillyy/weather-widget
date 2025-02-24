export interface MyCity {
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

interface Address {
  'ISO3166-2-lvl4': string
  city?: string
  town?: string
  village?: string
  country: string
  country_code: string
  house_number: string
  postcode: string
  region: string
  road: string
  state: string
  suburb: string
}
