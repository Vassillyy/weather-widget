import type {Forecast} from '@/entities/weatherForecast'
import {getCodeIcon} from '@/shared/lib'

interface CodeIconDaysFn {
  (data: Forecast, index: number): string
}

export const getCodeIconDays: CodeIconDaysFn = (data, index) => {
  const iconText: string = data.forecast.forecastday[index].day.condition.icon
    .split('/')
    .pop()!
    .slice(0, -4)
  const isDay: boolean = !!data.current.is_day

  return getCodeIcon(iconText, isDay)
}
