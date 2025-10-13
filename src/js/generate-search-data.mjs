import fs from 'fs'
import { getTerms } from './sanity.js'

function generateTermsList(entries = []) {
  return entries
    .flatMap((entry) => {
      if (!entry.terms) {
        return []
      }
      return entry.terms.flatMap((term) => {
        const designations = [
          {
            key: 't_' + term._key,
            entry_id: entry._id,
            term: term.designation,
            status: term.status,
          },
        ]
        if (term.abbreviation) {
          designations.push({
            key: 'a_' + term._key,
            entry_id: entry._id,
            term: term.abbreviation,
            status: term.status,
          })
        }
        return designations
      })
    })
    .filter((t) => t.status !== 'avoid' && t.status !== 'to_be_defined')
}

async function main() {
  console.log('🟡 Fetching content from Sanity...')

  const list = await getTerms()

  const terms = generateTermsList(list)

  fs.writeFileSync(
    'public/search-data.json',
    JSON.stringify(terms, null, 2),
    'utf-8'
  )

  console.log(
    `✅ Generated public/search-data.json with ${terms.length} entries`
  )
}

main().catch((err) => {
  console.error('❌ Error generating search-data.json:', err)
  process.exit(1)
})
