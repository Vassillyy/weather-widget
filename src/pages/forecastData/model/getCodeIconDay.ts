import type {Forecast} from '@/entities/weatherForecast'
import {getCodeIcon} from '@/shared/lib'

export const getCodeIconDays = (data: Forecast, index: number): string => {
  const iconText: string = data.forecast.forecastday[index].day.condition.icon
    .split('/')
    .pop()!
    .slice(0, -4)
  const isDay: boolean = !!data.current.is_day

  return getCodeIcon(iconText, isDay)
}
