import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {CityTranslate} from '../model/CityTranslate'

interface CityTranslateFn {
  (lat: number, lon: number, lang: string): Promise<string>
}

/** Переводим город на нужный нам язык */
export const translateCity: CityTranslateFn = async (lat, lon, lang) => {
  const apiUrl: string = import.meta.env.VITE_URL_API_GEO
  const apiKey: string = import.meta.env.VITE_KEY_API_GEO

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
