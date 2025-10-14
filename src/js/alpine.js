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
    langs: [],
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
    checkLangs(event) {
      console.log('hello')
    },
    get searchLangs() {
      return this.langs.map((lang) => ({ lang: lang }))
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
