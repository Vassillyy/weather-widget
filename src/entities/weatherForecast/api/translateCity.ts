import axios from 'axios'
import type {AxiosResponse} from 'axios'
import {i18n} from '@/shared/i18n'
import type {CityData} from '../model/CityData'

/** Переводим город на нужный нам язык */
export const translateCity = async (
  lat: number,
  lon: number
): Promise<string> => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=${i18n.currentLanguage}`

  try {
    const response: AxiosResponse<CityData> = await axios.get(url)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    return response.data.address.city
  } catch (error) {
    console.error(error)
    throw error
  }
}
