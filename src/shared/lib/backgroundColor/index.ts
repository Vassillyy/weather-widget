import {type Writable, writable} from 'svelte/store'
import {colors} from '@/shared/lib'

/** Начальный цвет фона, полученный из локального хранилища */
const initialBackgroundColor: string =
  localStorage.getItem('backgroundColor') || colors.WHITE

/** Отслеживание цвета фона */
export const backgroundColor: Writable<string> = writable(
  initialBackgroundColor
)

/** Слушаем изменения цвета фона и сохраняем в локальное хранилище */
backgroundColor.subscribe((value) => {
  localStorage.setItem('backgroundColor', value)
})
