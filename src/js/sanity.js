import { createClient } from '@sanity/client'

import groq from 'groq'

const client = createClient({
  projectId: 'nipfx4rq',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-09-23',
})

export async function getTerms() {
  return client.fetch(groq`*[_type == "entry" && status in ["approved", "validated", "in_force"]] {
      _id,
      "terms_de": content.de.terms[] {
                _key,
                designation,
                abbreviation,
                status,
        },
        "terms_fr": content.fr.terms[] {
                _key,
                designation,
                abbreviation,
                status,
        },
        "terms_it": content.it.terms[] {
                _key,
                designation,
                abbreviation,
                status,
        }
    }
    `)
}

export async function getFiche(entry_id) {
  return client.fetch(groq`*[_type == "entry" && _id == $id][0]`, {
    id: entry_id,
  })
}
