import {type Writable, writable} from 'svelte/store'

/** Начальный город, полученный из локального хранилища */
const initialChosenCity: string = localStorage.getItem('chosenCity') || 'Москва'

/** Отслеживание города */
export const chosenCity: Writable<string> = writable(initialChosenCity)

/** Слушаем изменения города в локальное хранилище */
chosenCity.subscribe((value) => {
  localStorage.setItem('chosenCity', value)
})
