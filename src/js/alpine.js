import Fuse from 'fuse.js'

import list from '../terms-list.json'
import { languages } from '@/i18n/config'

const fuseOptions = {
  keys: ['term', 'lang'],
  ignoreLocation: true,
  threshold: 0.1,
}

const fuse = new Fuse(list, fuseOptions)

export default (Alpine) => {
  Alpine.store('langs', ['de', 'fr'])

  Alpine.data('search', () => ({
    searchPattern: '',
    showBox: false,
    selectedIndex: 0,
    languages: languages,
    moveUpList() {
      this.selectedIndex > 0
        ? this.selectedIndex--
        : (this.selectedIndex = this.searchResults.length - 1)
    },
    moveDownList() {
      this.selectedIndex < this.searchResults.length - 1
        ? this.selectedIndex++
        : (this.selectedIndex = 0)
    },
    goToFiche() {
      if (this.searchResults.length) {
        window.location.href = `/eintrag/${
          this.searchResults[this.selectedIndex].item.slug
        }/`
      }
    },
    get searchLangs() {
      return this.$store.langs.map((lang) => ({ lang: lang }))
    },
    get searchResults() {
      if (!this.searchPattern) return []
      this.showBox = true
      return fuse.search(
        {
          $and: [
            { term: this.searchPattern.trim() },
            { $or: this.searchLangs },
          ],
        },
        { limit: 7 }
      )
    },
  }))
}
