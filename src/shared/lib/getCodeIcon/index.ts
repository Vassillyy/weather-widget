import type {Conditions} from './Conditions'

interface CodeIconFn {
  (iconText: string, isDay: boolean): string
}

/**
 * Функция для получения кода иконки на основе текста и дня/ночи.
 * @param iconText - цифровой код иконки.
 * @param isDay - день или ночь.
 */
export const getCodeIcon: CodeIconFn = (iconText, isDay) => {
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
  }

  ;(Object.keys(forecastConditions) as Array<keyof Conditions>).forEach(
    (condition) => {
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
