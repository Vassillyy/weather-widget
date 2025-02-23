import {i18n} from '@/shared/i18n'

interface ParamsFn {
  (apiKey: string, city: string): URLSearchParams
}

/** Получаем параметры для запроса */
export const createParams: ParamsFn = (apiKey, city) => {
  return new URLSearchParams({
    key: apiKey,
    q: city,
    lang: i18n.currentLanguage,
    days: '3'
  })
}
