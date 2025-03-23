import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {CityTranslate} from '../model/CityTranslate'

interface CityTranslateFn {
  (lat: number, lon: number, lang: string): Promise<string>
}

/** Переводим город на нужный нам язык */
export const translateCity: CityTranslateFn = async (lat, lon, lang) => {
  const apiUrl: string = 'https://api.geoapify.com/v1/geocode/reverse'
  const apiKey: string = 'd27753f9ddea41d1abc33eaaa7aa7f2f'

  const params: URLSearchParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    lang: lang,
    apiKey: apiKey
  })
  const url: string = `${apiUrl}?${params}`

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
