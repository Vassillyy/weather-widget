import {DateTime, Duration} from 'luxon'

interface ProgressFn {
  ({
    sunrise,
    sunset,
    sunriseNext
  }: {
    sunrise: DateTime
    sunset: DateTime
    sunriseNext: DateTime
  }): ReturnData
}

interface ReturnData {
  progress: number
  time: string
}

/** Обновление процесса заполнения */
export const updateProgress: ProgressFn = ({sunrise, sunset, sunriseNext}) => {
  const nowDate: DateTime = DateTime.now()

  let progress: number = 0
  let time: string = ''

  if (nowDate >= sunrise && nowDate <= sunset) {
    progress =
      (nowDate.diff(sunrise).as('milliseconds') /
        sunset.diff(sunrise).as('milliseconds')) *
      100
    const duration: Duration = sunset.diff(nowDate)
    const hours: string = Math.floor(duration.as('hours'))
      .toString()
      .padStart(2, '0')
    const minutes: string = Math.floor(duration.as('minutes') % 60)
      .toString()
      .padStart(2, '0')
    const seconds: string = Math.floor(duration.as('seconds') % 60)
      .toString()
      .padStart(2, '0')
    time = `${hours}:${minutes}:${seconds}`
  } else {
    progress =
      Math.abs(
        nowDate.diff(sunset).as('milliseconds') /
          sunriseNext.diff(sunset).as('milliseconds')
      ) * 100

    const duration: Duration = sunriseNext.diff(nowDate)
    const hours: string = Math.floor(duration.as('hours'))
      .toString()
      .padStart(2, '0')
    const minutes: string = Math.floor(duration.as('minutes') % 60)
      .toString()
      .padStart(2, '0')
    const seconds: string = Math.floor(duration.as('seconds') % 60)
      .toString()
      .padStart(2, '0')

    time = `${hours}:${minutes}:${seconds}`
  }

  return {progress, time}
}
