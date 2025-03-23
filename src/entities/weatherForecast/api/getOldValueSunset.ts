import {DateTime} from 'luxon'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {Forecast} from '@/entities/weatherForecast'
import {i18n} from '@/shared/i18n'
import type {Day} from '../model/Day'

interface OldValueSunsetFn {
  ({
    data,
    date,
    timezone
  }: {
    data: Forecast
    date: DateTime
    timezone: string
  }): Promise<DateTime>
}

/** Получаем данные заката прошлого дня */
export const getOldValueSunset: OldValueSunsetFn = async ({
  data,
  date,
  timezone
}) => {
  const apiUrl: string = 'http://api.weatherapi.com/v1/history.json'
  const apiKey: string = '49d4f22317144367a50192730242909'

  const params: URLSearchParams = new URLSearchParams({
    q: data.location.name,
    lang: i18n.currentLanguage,
    dt: date.minus({days: 1}).toFormat('yyyy-MM-dd'),
    key: apiKey
  })
  const url: string = `${apiUrl}?${params.toString()}`

  try {
    const response: AxiosResponse<Forecast> = await axios.get(url)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    const forecast: Day[] = response.data.forecast.forecastday

    return DateTime.fromFormat(forecast[0].astro.sunset, 'hh:mm a', {
      zone: timezone
    }).minus({days: 1})
  } catch (error) {
    console.error(error)
    throw error
  }
}
