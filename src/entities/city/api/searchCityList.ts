import axios from 'axios'
import type {AxiosResponse} from 'axios'
import {i18n} from '@/shared/i18n'
import type {Cities} from '../model/Cities'

interface CityListFn {
  (value: string): Promise<Cities>
}

export const searchCityList: CityListFn = async (value) => {
  const apiUrl: string =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
  const apiKey: string = '32e3066a8245a56c955412eed1889c1fb80504f7'

  try {
    const response: AxiosResponse<Cities> = await axios.post(
      apiUrl,
      {
        query: value,
        count: 6,
        locations: [{country: '*', city_type_full: 'город'}],
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
