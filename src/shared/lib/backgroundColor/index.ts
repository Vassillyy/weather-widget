import {writable} from 'svelte/store'

/**
 * Начальный цвет фона, полученный из локального хранилища.
 */
const initialBackgroundColor: string =
  localStorage.getItem('backgroundColor') || 'rgb(255, 255, 255)'

/**
 * Отслеживание цвета фона.
 */
export const backgroundColor = writable(initialBackgroundColor)
