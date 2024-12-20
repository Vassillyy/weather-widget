import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {City} from '../model/City'

export const searchCity = async (
  value: string
): Promise<City[] | undefined> => {
  if (value.length < 3) return

  const apiURL = `https://api.geoapify.com/v1/geocode/search?text=${value}&lang=ru&type=city&apiKey=d27753f9ddea41d1abc33eaaa7aa7f2f`
  try {
    const response: AxiosResponse<any> = await axios.get(apiURL)
    const data = response.data.features

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
