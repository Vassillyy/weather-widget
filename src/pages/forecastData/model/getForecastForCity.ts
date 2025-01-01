import {searchForecast} from '@/entities/weatherForecast'
import type {Forecast} from '@/entities/weatherForecast'

type Data = {
  dataForecast: Forecast | undefined
  error: boolean
}

/** Получаем данные о погоде по данному городу */
export const getForecastForCity = async (city: string): Promise<Data> => {
  let dataForecast: Forecast | undefined
  let error = false
  try {
    dataForecast = await searchForecast(city)
    error = false
  } catch {
    error = true
    dataForecast = undefined
  }
  return {dataForecast, error}
}
