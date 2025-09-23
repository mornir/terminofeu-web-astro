import { createClient } from '@sanity/client'

import { defineQuery } from 'groq'

const client = createClient({
  projectId: 'nipfx4rq',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-09-23',
})

const query =
  defineQuery(`*[_type == "entry" && status in ["approved", "validated", "in_force"]] {
      _id,
      "terms": content.fr.terms[] {
                _key,
                designation,
                abbreviation,
                status
        }
    }
    `)

export async function getFRTerms() {
  return client.fetch(query)
}
