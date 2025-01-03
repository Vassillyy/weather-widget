import {ru} from './ru'
import {en} from './en'

class I18n {
  currentLanguage: string
  translations: {[key: string]: {[key: string]: string}}

  constructor(defaultLanguage = 'ru') {
    this.currentLanguage = localStorage.getItem('lang') || defaultLanguage
    this.translations = {
      en,
      ru
    }
  }

  get(key: string): string {
    return this.translations[this.currentLanguage][key] || key
  }

  set(language: string): void {
    if (this.translations[language]) {
      this.currentLanguage = language
    } else {
      console.warn(`Язык ${language} не поддерживается.`)
    }
  }
}

export const i18n = new I18n()
