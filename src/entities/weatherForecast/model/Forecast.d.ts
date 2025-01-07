import type {Hour} from './Hour'

export type Forecast = {
  current: Current
  forecast: {
    forecastday: Forecastday[]
  }
  location: Location
}

type Current = {
  cloud: number
  condition: Condition
  dewpoint_c: number
  dewpoint_f: number
  feelslike_c: number
  feelslike_f: number
  gust_kph: number
  gust_mph: number
  heatindex_c: number
  heatindex_f: number
  humidity: number
  is_day: 0 | 1
  last_updated: string
  last_updated_epoch: number
  precip_in: number
  precip_mm: number
  pressure_in: number
  pressure_mb: number
  temp_c: number
  temp_f: number
  uv: number
  vis_km: number
  vis_miles: number
  wind_degree: number
  wind_dir: string
  wind_kph: number
  wind_mph: number
  windchill_c: number
  windchill_f: number
}

type Condition = {
  code: number
  icon: string
  text: string
}

type Forecastday = {
  astro: Astro
  date: string
  date_epoch: number
  day: Day
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

type Day = {
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

type Location = {
  country: string
  lat: number
  localtime: string
  localtime_epoch: number
  lon: number
  name: string
  region: string
  tz_id: string
}
