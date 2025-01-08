import type {Hour} from './Hour'

export type Day = {
  astro: Astro
  date: string
  date_epoch: number
  day: Age
  hour: Hour[]
}

type Astro = {
  is_moon_up: number
  is_sun_up: number
  moon_illumination: number
  moon_phase: string
  moonrise: string
  moonset: string
  sunrise: string
  sunset: string
}

type Age = {
  avghumidity: number
  avgtemp_c: number
  avgtemp_f: number
  avgvis_km: number
  avgvis_miles: number
  condition: Condition
  daily_chance_of_rain: number
  daily_chance_of_snow: number
  daily_will_it_rain: number
  daily_will_it_snow: number
  maxtemp_c: number
  maxtemp_f: number
  maxwind_kph: number
  maxwind_mph: number
  mintemp_c: number
  mintemp_f: number
  totalprecip_in: number
  totalprecip_mm: number
  totalsnow_cm: number
  uv: number
}

type Condition = {
  code: number
  icon: string
  text: string
}
