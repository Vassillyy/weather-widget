import {DateTime} from 'luxon'

type SunData = {
  sunrise: DateTime
  sunset: DateTime
  sunriseNext: DateTime
}

type ProgressData = {
  progress: number
  time: string
}

/** Обновление процесса заполнения */
export const updateProgress = ({
  sunrise,
  sunset,
  sunriseNext
}: SunData): ProgressData => {
  const nowDate = DateTime.now()

  let progress = 0
  let time = ''

  if (nowDate >= sunrise && nowDate <= sunset) {
    progress =
      (nowDate.diff(sunrise).as('milliseconds') /
        sunset.diff(sunrise).as('milliseconds')) *
      100
    const duration = sunset.diff(nowDate)
    const hours = Math.floor(duration.as('hours')).toString().padStart(2, '0')
    const minutes = Math.floor(duration.as('minutes') % 60)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor(duration.as('seconds') % 60)
      .toString()
      .padStart(2, '0')
    time = `${hours}:${minutes}:${seconds}`
  } else {
    progress =
      Math.abs(
        nowDate.diff(sunset).as('milliseconds') /
          sunriseNext.diff(sunset).as('milliseconds')
      ) * 100

    const duration = sunriseNext.diff(nowDate)
    const hours = Math.floor(duration.as('hours')).toString().padStart(2, '0')
    const minutes = Math.floor(duration.as('minutes') % 60)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor(duration.as('seconds') % 60)
      .toString()
      .padStart(2, '0')

    time = `${hours}:${minutes}:${seconds}`
  }

  return {progress, time}
}
