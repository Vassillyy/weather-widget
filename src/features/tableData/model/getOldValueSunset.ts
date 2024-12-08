import {DateTime} from 'luxon'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {Forecast} from '@/entities/forecast'

type Parameters = {
  data: Forecast
  date: DateTime
  timezone: string
}

/** Получаем данные заката прошлого дня */
export const getOldValueSunset = async ({
  data,
  date,
  timezone
}: Parameters): Promise<DateTime> => {
  const apiURL = `http://api.weatherapi.com/v1/history.json?key=49d4f22317144367a50192730242909&q=${data.location.name}&lang=ru&dt=${date.minus({days: 1}).toFormat('yyyy-MM-dd')}`

  try {
    const response: AxiosResponse<Forecast> = await axios.get(apiURL)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    const forecast = response.data.forecast.forecastday

    return DateTime.fromFormat(forecast[0].astro.sunset, 'hh:mm a', {
      zone: timezone
    }).minus({days: 1})
  } catch (error) {
    console.error(error)
    throw error
  }
}
