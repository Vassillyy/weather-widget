import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {City} from '../model/City'
import {i18n} from '@/shared/i18n'

export const searchCityList = async (value: string): Promise<City> => {
  const apiURL =
    'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'

  try {
    const response: AxiosResponse<City> = await axios.post(
      apiURL,
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
          Authorization: 'Token 32e3066a8245a56c955412eed1889c1fb80504f7'
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
