import type {Forecast} from '@/entities/weatherForecast'
import {getCodeIcon} from '@/shared/lib'

interface CodeIconHoursFn {
  (data: Forecast, index: number): string
}

/**
 * Получаем код иконки для погоды для списка карточек по часам.
 * @param data - Данные о погоде.
 * @param index - Индекс карточки.
 */
export const getCodeIconHours: CodeIconHoursFn = (data, index) => {
  const iconText: string = data.forecast.forecastday[0].hour[
    index
  ].condition.icon
    .split('/')
    .pop()!
    .slice(0, -4)
  const isDay: boolean = !!data.forecast.forecastday[0].hour[index].is_day

  return getCodeIcon(iconText, isDay)
}
