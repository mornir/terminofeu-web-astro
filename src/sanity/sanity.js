import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'nipfx4rq',
  dataset: 'productione',
  useCdn: true,
  apiVersion: '2025-09-23', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
  // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content, accessing drafts or using draft perspectives
})

export async function getTerms() {
  const posts = await client.fetch('*[_type == "term"]')
  return posts
}
