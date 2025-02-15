import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {CityTranslate} from '../model/CityTranslate'

/** Переводим город на нужный нам язык */
export const translateCity = async (
  lat: number,
  lon: number,
  lang: string
): Promise<string> => {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=${lang}&apiKey=d27753f9ddea41d1abc33eaaa7aa7f2f`

  try {
    const response: AxiosResponse<CityTranslate> = await axios.get(url)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    return response.data.features[0].properties.city
  } catch (error) {
    console.error(error)
    throw error
  }
}
