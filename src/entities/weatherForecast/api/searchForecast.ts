import axios from 'axios'
import type {AxiosResponse} from 'axios'
import {translateCity} from '@/entities/city/@x/translateCity'
import {i18n} from '@/shared/i18n'
import type {Forecast} from '../model/Forecast'
import {createParams} from '../model/createParams'

interface ForecastFn {
  (city: string): Promise<Forecast>
}

type Coors = {
  lat: number
  lon: number
}

/** Получаем прогноз погоды по указанному городу */
export const searchForecast: ForecastFn = async (city) => {
  const apiUrl: string = 'https://api.weatherapi.com/v1/forecast.json'
  const apiKey: string = '49d4f22317144367a50192730242909'

  const url: string = `${apiUrl}?${createParams(apiKey, city)}`

  try {
    const response: Forecast = await getDataForecast(url)

    const {lat, lon}: Coors = response.location

    const newCity: string = await translateCity(lat, lon, i18n.currentLanguage)

    const newUrl: string = `${apiUrl}?${createParams(apiKey, newCity)}`

    return await getDataForecast(newUrl)
  } catch (error) {
    console.error(error)
    throw error
  }
}

interface DataForecastFn {
  (url: string): Promise<Forecast>
}

/** Получаем данные для погоды */
const getDataForecast: DataForecastFn = async (url) => {
  const response: AxiosResponse<Forecast> = await axios.get(url)

  if (response.status !== 200) {
    throw new Error(`Ошибка: ${response.status}`)
  }

  return response.data
}
