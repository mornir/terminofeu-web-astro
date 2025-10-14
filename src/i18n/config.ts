export const languages = [
  { name: 'Deutsch', code: 'de', flag: '🇩🇪' },
  { name: 'français', code: 'fr', flag: '🇫🇷' },
  { name: 'italiano', code: 'it', flag: '🇮🇹' },
]

export const defaultLocale = 'de'

export const locales = Object.fromEntries(
  languages.map(({ code }) => [code, `${code}-CH`])
)
