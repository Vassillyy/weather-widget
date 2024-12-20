import {searchMyCity} from '@/entities/city'
import {choisenCity} from '@/shared/lib'

/** Получаем город пользователя */
export const getMyCity = async (): Promise<void> => {
  try {
    const city = await searchMyCity()
    choisenCity.set(city!)
  } catch (error) {
    console.error(error)
    throw error
  }
}
