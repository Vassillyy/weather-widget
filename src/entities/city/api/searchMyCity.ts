import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {Position} from '../model/Position'
import type {MyCity} from '../model/MyCity'

interface MyCityFn {
  (): Promise<string | undefined>
}

type Coords = {latitude: number; longitude: number}

export const searchMyCity: MyCityFn = async () => {
  const apiUrl: string = import.meta.env.VITE_URL_API_OSM

  try {
    const position: Position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    const {latitude, longitude}: Coords = position.coords

    const params: URLSearchParams = new URLSearchParams({
      format: 'json',
      lat: latitude.toString(),
      lon: longitude.toString(),
      zoom: '18',
      addressdetails: '1'
    })
    const url: string = `${apiUrl}?${params.toString()}`

    const response: AxiosResponse<MyCity> = await axios.get(url)

    if (response.status !== 200) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    return (
      response.data.address.city ||
      response.data.address.town ||
      response.data.address.village
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}
