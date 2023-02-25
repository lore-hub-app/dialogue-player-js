import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    restartDialogue: 'hello world'
  },
  ja: {
    restartDialogue: 'こんにちは、世界'
  }
}


export const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages,
})


