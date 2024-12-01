import axios, {type AxiosResponse} from 'axios'
import type {Forecast} from '../types/Forecast'

export const fetchForecast = async (city: any): Promise<Forecast> => {
  const apiURL: string = `http://api.weatherapi.com/v1/forecast.json?key=49d4f22317144367a50192730242909&q=${city}&lang=ru&days=3`

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
