import { createClient } from '@sanity/client'

import groq from 'groq'

const client = createClient({
  projectId: 'nipfx4rq',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-09-23',
})

export async function getTerms(lang = 'de') {
  console.log(lang)
  return client.fetch(`*[_type == "entry" && status in ["approved", "validated", "in_force"]] {
      _id,
      "terms": content.${lang}.terms[] {
                _key,
                designation,
                abbreviation,
                status,
        },
    }
    `)
}
