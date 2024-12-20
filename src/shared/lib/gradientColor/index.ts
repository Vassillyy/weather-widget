import {type Writable, writable} from 'svelte/store'
import {colors} from '@/shared/lib'

/** Начальный цвет градиента, полученный из локального хранилища */
const initialColorGradient: string =
  localStorage.getItem('colorGradient') || colors.GRADIENT_VIOLET

/** Отслеживание градиента */
export const gradientColor: Writable<string> = writable(initialColorGradient)

/** Слушаем изменения цвета градиента и сохраняем в локальное хранилище */
gradientColor.subscribe((value): void => {
  localStorage.setItem('colorGradient', value)
})
