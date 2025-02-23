import type {Forecast} from '@/entities/weatherForecast'
import {getCodeIcon} from '@/shared/lib'

interface CodeIconNowFn {
  (data: Forecast): string
}

/**
 * Получаем код иконки для погоды на данный момент.
 * @param data - данные о погоде.
 */
export const getCodeIconNow: CodeIconNowFn = (data) => {
  const iconText: string = data.current.condition.icon
    .split('/')
    .pop()!
    .slice(0, -4)
  const isDay: boolean = !!data.current.is_day

  return getCodeIcon(iconText, isDay)
}
