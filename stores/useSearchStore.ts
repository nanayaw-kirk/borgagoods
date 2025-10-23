import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    recentSearches: [],
    maxRecentSearches: 15
  }),
  
  getters: {
    getRecentSearches: (state) => state.recentSearches,
    hasRecentSearches: (state) => state.recentSearches.length > 0
  },
  
  actions: {
    addSearch(query) {
      if (!query || query.trim() === '') return
        const trimmedQuery = query.trim()
      this.recentSearches = this.recentSearches.filter(search => search !== trimmedQuery)
      this.recentSearches.unshift(trimmedQuery)
      if (this.recentSearches.length > this.maxRecentSearches) {
        this.recentSearches = this.recentSearches.slice(0, this.maxRecentSearches)
      }
    },
    
    removeSearch(query) {
      this.recentSearches = this.recentSearches.filter(search => search !== query)
    },
    
    clearAllSearches() {
      this.recentSearches = []
    }
  },
  
  persist: true
})