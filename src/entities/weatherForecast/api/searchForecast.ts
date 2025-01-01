import axios from 'axios'
import type {AxiosResponse} from 'axios'
import {i18n} from '@/shared/i18n'
import type {Forecast} from '../model/Forecast'

export const searchForecast = async (city: string): Promise<Forecast> => {
  const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=49d4f22317144367a50192730242909&q=${city}&lang=${i18n.currentLanguage}&days=3`

  try {
    const response: AxiosResponse<Forecast> = await axios.get(apiURL)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    console.log(response.data)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
