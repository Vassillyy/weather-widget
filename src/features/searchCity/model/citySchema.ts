import {z} from 'zod'

/** Схема для поля поиска */
export const citySchema = z.string().transform((val: string): string => {
  return val
    .split(/(\s+|-)/)
    .map((word, index) => {
      if (index % 2 === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
      return word
    })
    .join('')
})
