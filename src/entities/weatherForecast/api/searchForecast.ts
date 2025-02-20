import axios from 'axios'
import type {AxiosResponse} from 'axios'
import {translateCity} from '@/entities/city/@x/translateCity'
import {i18n} from '@/shared/i18n'
import type {Forecast} from '../model/Forecast'
import {createParams} from '../model/createParams'

interface ForecastFn {
  (city: string): Promise<Forecast>
}

/** Получаем прогноз погоды по указанному городу */
export const searchForecast: ForecastFn = async (city) => {
  const apiUrl: string = import.meta.env.VITE_URL_API_WEATHER
  const apiKey: string = import.meta.env.VITE_KEY_API_WEATHER

  const url = `${apiUrl}?${createParams(apiKey, city)}`

  try {
    const response: AxiosResponse<Forecast> = await axios.get(url)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    const lat: number = response.data.location.lat
    const lon: number = response.data.location.lon

    const newCity: string = await translateCity(lat, lon, i18n.currentLanguage)

    const newUrl: string = `${apiUrl}?${createParams(apiKey, newCity)}`

    const newResponse: AxiosResponse<Forecast> = await axios.get(newUrl)

    if (newResponse.status !== 200) {
      throw new Error(`Ошибка: ${newResponse.status}`)
    }

    return newResponse.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
