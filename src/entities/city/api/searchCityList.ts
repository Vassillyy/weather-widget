import axios from 'axios'
import type {AxiosResponse} from 'axios'
import {i18n} from '@/shared/i18n'
import type {City} from '../model/City'

interface CityListFn {
  (value: string): Promise<City>
}

export const searchCityList: CityListFn = async (value) => {
  const apiUrl: string = import.meta.env.VITE_URL_API_DADATA
  const apiKey: string = import.meta.env.VITE_KEY_API_DADATA

  try {
    const response: AxiosResponse<City> = await axios.post(
      apiUrl,
      {
        query: value,
        count: 6,
        from_bound: {value: 'city'},
        to_bound: {value: 'city'},
        locations: [{country: '*'}],
        language: i18n.currentLanguage
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + apiKey
        }
      }
    )

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
