import {tempUnit} from '@/shared/lib'

/** Измерение температуры */
export const changeTempUnit = (): void => {
  tempUnit.update((unit: string): string => {
    return unit === '°C' ? '°F' : '°C'
  })
}
