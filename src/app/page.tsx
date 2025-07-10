'use client'

import React, { useState } from 'react'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { SearchForm } from '@/components/SearchForm'
import { SearchResults } from '@/components/SearchResults'

export default function Home() {
  const [searchResults, setSearchResults] = useState(null)
  const [showForm, setShowForm] = useState(true)

  const handleSearchResults = (results: any) => {
    setSearchResults(results)
    setShowForm(false)
  }

  const handleNewSearch = () => {
    setSearchResults(null)
    setShowForm(true)
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-center py-4">
        <DarkModeToggle />
      </div>
      
      {showForm && (
        <div className="max-w-4xl mx-auto">
          <SearchForm onResults={handleSearchResults} />
        </div>
      )}
      
      {searchResults && (
        <div className="max-w-6xl mx-auto">
          <SearchResults 
            results={searchResults} 
            onNewSearch={handleNewSearch}
          />
        </div>
      )}
    </div>
  )
}