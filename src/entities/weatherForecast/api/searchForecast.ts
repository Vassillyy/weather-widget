import axios from 'axios'
import type {AxiosResponse} from 'axios'
import {i18n} from '@/shared/i18n'
import type {Forecast} from '../model/Forecast'
import {translateCity} from './translateCity'

/** Получаем прогноз погоды по указанному городу */
export const searchForecast = async (city: string): Promise<Forecast> => {
  const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=49d4f22317144367a50192730242909&q=${city}&lang=${i18n.currentLanguage}&days=3`

  try {
    const response: AxiosResponse<Forecast> = await axios.get(apiURL)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    const lat = response.data.location.lat
    const lon = response.data.location.lon

    const newCity = await translateCity(lat, lon)

    const newUrl = `http://api.weatherapi.com/v1/forecast.json?key=49d4f22317144367a50192730242909&q=${newCity}&lang=${i18n.currentLanguage}&days=3`

    const newResponse: AxiosResponse<Forecast> = await axios.get(newUrl)

    if (newResponse.status !== 200) {
      throw new Error(`Ошибка: ${newResponse.status}`)
    }

    console.log(newResponse.data)

    return newResponse.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
