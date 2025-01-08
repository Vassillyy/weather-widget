import {DateTime} from 'luxon'
import {get} from 'svelte/store'
import type {Forecast} from '@/entities/weatherForecast'
import {tempUnit} from '@/shared/lib'
import {i18n} from '@/shared/i18n'
import type {Hour} from '@/entities/weatherForecast'

type ReturnData = {
  filtTemp: number
  temp: number
  titleCard: string[] | string
}

/** Получаем данные о погоде для карточки по часам */
export const getForecastLittleCard = (
  dataForecast: Forecast,
  index: number
): ReturnData => {
  const infoCard: Hour = dataForecast.forecast.forecastday[0].hour[index]
  const filtTempC: number = Math.round(infoCard.feelslike_c)
  const filtTempF: number = Math.round(infoCard.feelslike_f)
  const tempC: number = Math.round(infoCard.temp_c)
  const tempF: number = Math.round(infoCard.temp_f)
  const hours: string[] = infoCard.time.split(' ').slice(1)

  let filtTemp: number = 0
  let temp: number = 0

  if (get(tempUnit) === '°C') {
    filtTemp = filtTempC
    temp = tempC
  } else {
    filtTemp = filtTempF
    temp = tempF
  }

  const titleCard: string[] | string =
    DateTime.local().hour === Number(hours.join().slice(0, 2))
      ? i18n.get('now')
      : hours

  return {filtTemp, temp, titleCard}
}
