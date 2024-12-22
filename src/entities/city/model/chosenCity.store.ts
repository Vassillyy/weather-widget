import {type Writable, writable} from 'svelte/store'

/** Начальный город, полученный из локального хранилища */
const initialChoisenCity: string =
  localStorage.getItem('chosenCity') || 'Москва'

/** Отслеживание города */
export const chosenCity: Writable<string> = writable(initialChoisenCity)

/** Слушаем изменения города в локальное хранилище */
chosenCity.subscribe((value): void => {
  localStorage.setItem('chosenCity', value)
})
