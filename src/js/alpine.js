import Fuse from 'fuse.js'

import list from '../terms-list.json'

const fuseOptions = {
  keys: ['term', 'lang'],
  ignoreLocation: true,
  threshold: 0.1,
}

const fuse = new Fuse(list, fuseOptions)

export default (Alpine) => {
  Alpine.data('search', () => ({
    searchPattern: '',
    showBox: false,
    selectedIndex: 0,
    languages: [{ lang: 'de' }, { lang: 'fr' }],
    langs: ['de', 'fr'],
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
    get searchResults() {
      if (!this.searchPattern) return []
      this.showBox = true
      return fuse.search(
        {
          $and: [{ term: this.searchPattern.trim() }, { $or: this.languages }],
        },
        { limit: 7 }
      )
    },
  }))
}
