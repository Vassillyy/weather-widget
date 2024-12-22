import {searchMyCity} from '@/entities/city'
import {chosenCity} from '@/entities/city'

/** Получаем город пользователя */
export const getMyCity = async (): Promise<void> => {
  try {
    const city = await searchMyCity()
    chosenCity.set(city!)
  } catch (error) {
    console.error(error)
    throw error
  }
}
