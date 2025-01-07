import type {Forecast} from '@/entities/weatherForecast'
import {getCodeIcon} from '@/shared/lib'

/**
 * Получаем код иконки для погоды на данный момент.
 * @param data - данные о погоде.
 */
export const getCodeIconNow = (data: Forecast): string => {
  const iconText: string = data.current.condition.icon
    .split('/')
    .pop()!
    .slice(0, -4)
  const isDay: boolean = !!data.current.is_day

  return getCodeIcon(iconText, isDay)
}
