import {DateTime} from 'luxon'
import type {Forecast} from '@/entities/forecast'
import {getOldValueSunset} from './getOldValueSunset'

type SunData = {
  sunrise: DateTime
  sunset: DateTime
  sunriseNext: DateTime
}

/** Получение времени захода и восхода солнца */
export const fillTime = async (data: Forecast): Promise<SunData> => {
  const timezone = data.location.tz_id
  const localTimezone = DateTime.local().zoneName
  const nowMoment = DateTime.now().setZone(timezone)
  const forecast = data.forecast.forecastday

  let sunrise: DateTime | undefined
  let sunset: DateTime | undefined
  let sunriseNext: DateTime | undefined

  sunrise = DateTime.fromFormat(forecast[0].astro.sunrise, 'hh:mm a', {
    zone: timezone
  }).setZone(localTimezone)

  sunset = DateTime.fromFormat(forecast[0].astro.sunset, 'hh:mm a', {
    zone: timezone
  }).setZone(localTimezone)

  if (
    nowMoment > sunset &&
    nowMoment < DateTime.fromFormat('24:00', 'HH:mm', {zone: timezone})
  ) {
    sunriseNext = DateTime.fromFormat(forecast[1].astro.sunrise, 'hh:mm a', {
      zone: timezone
    })
      .setZone(localTimezone)
      .plus({days: 1})
  } else {
    sunriseNext = DateTime.fromFormat(forecast[0].astro.sunrise, 'hh:mm a', {
      zone: timezone
    }).setZone(localTimezone)

    if (nowMoment < sunriseNext) {
      sunset = await getOldValueSunset({data, date: nowMoment, timezone})
    }
  }
  return {sunrise, sunset, sunriseNext}
}
