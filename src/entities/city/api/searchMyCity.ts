import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {Position} from '../model/Position'
import type {MyCity} from '../model/MyCity'

export const searchMyCity = async (): Promise<string | undefined> => {
  try {
    const position: Position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    const {latitude, longitude} = position.coords
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    const response: AxiosResponse<MyCity> = await axios.get(url)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    const address = response.data.address

    return address.city || address.town || address.village
  } catch (error) {
    console.error(error)
    throw error
  }
}
