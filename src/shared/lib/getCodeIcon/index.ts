import type {Conditions} from './Conditions'

/**
 * Функция для получения кода иконки на основе текста и дня/ночи.
 * @param iconText - цифровой код иконки.
 * @param isDay - день или ночь.
 */
const getCodeIcon = (iconText: string, isDay: boolean): string => {
  let code: string | undefined

  const forecastConditions: Conditions = {
    fog: ['143', '248', '260'],
    littleCloudy: ['116', '119', '199', '122'],
    cloudy: [
      '176',
      '179',
      '182',
      '185',
      '200',
      '263',
      '293',
      '323',
      '329',
      '335'
    ],
    rain: [
      '266',
      '281',
      '284',
      '296',
      '299',
      '302',
      '305',
      '308',
      '311',
      '314',
      '353',
      '356',
      '359'
    ],
    snow: [
      '227',
      '230',
      '317',
      '320',
      '326',
      '332',
      '338',
      '350',
      '362',
      '365',
      '368',
      '371',
      '374',
      '377'
    ],
    storm: ['386', '389', '392', '395'],
    clear: ['113']
  } as const

  ;(Object.keys(forecastConditions) as Array<keyof Conditions>).forEach(
    (condition: keyof Conditions): void => {
      if (forecastConditions[condition].includes(iconText)) {
        if (condition === 'fog') {
          code = '07'
        } else if (condition === 'snow') {
          code = '06'
        } else if (condition === 'storm') {
          code = '05'
        } else if (condition === 'rain') {
          code = '04'
        } else if (condition === 'cloudy') {
          code = '03'
        } else if (condition === 'littleCloudy') {
          code = '02'
        } else if (condition === 'clear') {
          code = '01'
        } else {
          code = ''
        }
      }
    }
  )
  return code + (isDay ? 'd' : 'n')
}

/**
 * Получаем код иконки для погоды на данный момент.
 * @param data - данные о погоде.
 */
export const getCodeIconNow = (data: any): string => {
  const iconText: string = data.current.condition.icon
    .split('/')
    .pop()
    .slice(0, -4)
  const isDay: boolean = !!data.current.is_day

  return getCodeIcon(iconText, isDay)
}

/*export const getCodeIconDays = (data: any, index: number): string => {
  const iconText: string = data.forecast.forecastday[index].day.condition.icon
    .split('/')
    .pop()
    .slice(0, -4)
  const isDay: boolean = !!data.current.is_day

  return getСodeIcon(iconText, isDay)
}

export const getCodeIconHourly = (data: any, index: number): string => {
  const iconText: string = data.forecast.forecastday[0].hour[index].condition.icon
    .split('/')
    .pop()
    .slice(0, -4)
  const isDay: boolean = data.forecast.forecastday[0].hour[index].is_day

  return getСodeIcon(iconText, isDay)
}*/
