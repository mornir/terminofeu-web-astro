// @ts-check
import { defineConfig } from 'astro/config'

import alpinejs from '@astrojs/alpinejs'

import tailwindcss from '@tailwindcss/vite'

import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration'

import icon from 'astro-icon'

import sitemap from '@astrojs/sitemap'

const defaultLocale = 'de'
const locales = {
  de: 'de-CH', // the `defaultLocale` value must present in `locales` keys
  fr: 'fr-CH',
  it: 'it-CH',
}

// https://astro.build/config
export default defineConfig({
  site: 'https://terminofeu.ch/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    alpinejs(),
    icon(),
    i18n({
      locales,
      defaultLocale,
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
