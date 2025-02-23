import {tempUnit} from '@/shared/lib'

/** Измерение температуры */
export const changeTempUnit = (): void => {
  tempUnit.update((unit) => (unit === '°C' ? '°F' : '°C'))
}
