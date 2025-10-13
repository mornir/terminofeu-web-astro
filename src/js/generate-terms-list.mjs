import fs from 'fs'
import { getTerms } from './sanity.js'

function generateTermsList(entries = [], lang) {
  const property = 'terms_' + lang
  return entries
    .flatMap((entry) => {
      if (!entry[property]) {
        return []
      }
      return entry[property].flatMap((term) => {
        const designations = [
          {
            key: 't_' + term._key,
            entry_id: entry._id,
            term: term.designation,
            status: term.status,
            lang,
          },
        ]
        if (term.abbreviation) {
          designations.push({
            key: 'a_' + term._key,
            entry_id: entry._id,
            term: term.abbreviation,
            status: term.status,
            lang,
          })
        }
        return designations
      })
    })
    .filter((t) => t.status !== 'avoid' && t.status !== 'to_be_defined')
}

async function main() {
  console.log('🟡 Fetching content from Sanity...')

  const entries = await getTerms()

  const terms_de = generateTermsList(entries, 'de')
  const terms_fr = generateTermsList(entries, 'fr')
  const terms_it = generateTermsList(entries, 'it')

  const terms = [...terms_de, ...terms_fr, ...terms_it]

  fs.writeFileSync(
    'src/terms-list.json',
    JSON.stringify(terms, null, 2),
    'utf-8'
  )

  console.log(`✅ Generated terms-list.json with ${terms.length} entries`)
}

main().catch((err) => {
  console.error('❌ Error generating terms-list.json:', err)
  process.exit(1)
})
