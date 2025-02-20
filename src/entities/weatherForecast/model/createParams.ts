import {i18n} from '@/shared/i18n'

/** Получаем параметры для запроса */
export const createParams = (apiKey: string, city: string): URLSearchParams => {
  return new URLSearchParams({
    key: apiKey,
    q: city,
    lang: i18n.currentLanguage,
    days: '3'
  })
}
