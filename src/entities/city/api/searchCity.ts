import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {City} from '../model/City'

export const searchCity = async (
  value: string
): Promise<string | undefined> => {
  const apiURL = `https://api.geoapify.com/v1/geocode/search?text=${value}&lang=ru&type=city&apiKey=d27753f9ddea41d1abc33eaaa7aa7f2f`
  try {
    const response: AxiosResponse<City> = await axios.get(apiURL)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    for (let item of response.data.features) {
      if (Object.is(item.properties.city, value)) {
        return item.properties.city
      }
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
