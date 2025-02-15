import {backgroundColor, colors, gradientColor} from '@/shared/lib'

/** Изменение цвета фона и градиента */
export const changeColors = (): void => {
  backgroundColor.update((color: string): string => {
    const newColor: string =
      color === colors.WHITE ? colors.BLACK : colors.WHITE

    const newGradient: string =
      newColor === colors.WHITE ? colors.GRADIENT_VIOLET : colors.GRADIENT_GRAY

    gradientColor.set(newGradient)
    return newColor
  })
}
