import Fuse from 'fuse.js'

/* const response = await fetch('/search-data.json')

if (!response.ok) throw new Error('Cannot get terms list' + response.statusText)

const list = await response.json() */

import list from '../terms-list.json'

const fuseOptions = {
  keys: ['term'],
  ignoreLocation: true,
  threshold: 0.1,
}

const fuse = new Fuse(list, fuseOptions)

export default (Alpine) => {
  Alpine.data('search', () => ({
    searchPattern: '',
    showBox: false,
    selectedIndex: 0,
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
        window.location.href = `/fiches/${
          this.searchResults[this.selectedIndex].item.slug
        }/`
      }
    },
    get searchResults() {
      if (!this.searchPattern) return []
      this.showBox = true
      return fuse.search(this.searchPattern.trim()).slice(0, 7)
    },
  }))
}
