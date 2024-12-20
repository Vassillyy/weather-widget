import {type Writable, writable} from 'svelte/store'

/** Начальный город, полученный из локального хранилища */
const initialChoisenCity: string =
  localStorage.getItem('choisenCity') || 'Москва'

/** Отслеживание города */
export const choisenCity: Writable<string> = writable(initialChoisenCity)

/** Слушаем изменения города в локальное хранилище */
choisenCity.subscribe((value): void => {
  localStorage.setItem('choisenCity', value)
})
