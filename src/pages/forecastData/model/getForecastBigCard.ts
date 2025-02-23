import {get} from 'svelte/store'
import {DateTime} from 'luxon'
import type {Day, Forecast} from '@/entities/weatherForecast'
import {tempUnit} from '@/shared/lib'

interface ForecastBigCardDataFn {
  (data: Forecast, index: number): ReturnData
}

interface ReturnData {
  day: string
  statusWeather: string
  temp: number
  chanceRain: number
  chanceSnow: number
}

/** Получаем данные о погоде для карточки по дням */
export const getForecastBigCardData: ForecastBigCardDataFn = (data, index) => {
  const infoCard: Day = data.forecast.forecastday[index]
  const day: string = DateTime.fromISO(infoCard.date).toFormat('dd.MM.yyyy')
  const statusWeather: string = infoCard.day.condition.text
  const tempC: number = Math.round(infoCard.day.avgtemp_c)
  const tempF: number = Math.round(infoCard.day.avgtemp_f)
  const temp: number = get(tempUnit) === '°C' ? tempC : tempF
  const chanceRain: number = infoCard.day.daily_chance_of_rain
  const chanceSnow: number = infoCard.day.daily_chance_of_snow

  return {day, statusWeather, temp, chanceRain, chanceSnow}
}
