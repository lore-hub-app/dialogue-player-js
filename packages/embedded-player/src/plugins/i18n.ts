import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    restartDialogue: 'Restart Dialogue'
  },
  ru: {
    restartDialogue: 'Перезапустить Диалог'
  }
}


export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})


