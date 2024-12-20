import {type Writable, writable} from 'svelte/store'

/** Начальная единица измерения температуры, полученная из локального хранилища */
const initialTempUnit: string = localStorage.getItem('tempUnit') || '°C'

/** Отслеживания единицы измерения температуры */
export const tempUnit: Writable<string> = writable(initialTempUnit)

/** Слушаем изменения температуры и сохраняем в локальное хранилище */
tempUnit.subscribe((value): void => {
  localStorage.setItem('tempUnit', value)
})
