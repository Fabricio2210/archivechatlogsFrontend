'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Search,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Loading } from '@/components/ui/Loading'
import { formatDate } from '@/lib/utils'

interface SearchResultsProps {
  results: any
  onNewSearch: () => void
}

export function SearchResults({ results, onNewSearch }: SearchResultsProps) {
  const [data, setData] = useState(results.data)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages] = useState(results.totalPages)
  const [totalResults] = useState(results.totalResults)
  const [isLoading, setIsLoading] = useState(false)
  const [pageInput, setPageInput] = useState('')
  const [isTableView, setIsTableView] = useState(true)
  const [showScrollButtons, setShowScrollButtons] = useState(true)

  const searchParams = results.searchParams

  const fetchPage = async (page: number) => {
    setIsLoading(true)
    setShowScrollButtons(false)
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${searchParams.selectedChannel}`,
        {
          userName: searchParams.userName,
          message: searchParams.message,
          hour: '',
          dateFrom: searchParams.dateFrom,
          dateEnd: searchParams.dateEnd
        },
        {
          params: {
            page,
            limit: 51,
            userName: searchParams.usernameSearchType,
            message: searchParams.messageSearchType
          }
        }
      )
      
      setData(response.data.data)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching page:', error)
    } finally {
      setIsLoading(false)
      setShowScrollButtons(true)
    }
  }

  const goToPage = () => {
    const page = parseInt(pageInput) - 1
    if (page >= 0 && page < totalPages) {
      fetchPage(page)
      setPageInput('')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Nothing Found</h1>
        <Button onClick={onNewSearch}>New Search</Button>
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  const isPreviousDisabled = currentPage === 0
  const isNextDisabled = currentPage >= totalPages - 1

  return (
    <div className="space-y-6">
      {/* Results Info and Controls */}
      <div className="text-center space-y-4">
        <h5 className="text-lg">
          Found {totalResults} results divided into {totalPages} pages.
        </h5>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPage(0)}
              disabled={isPreviousDisabled}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPage(currentPage - 1)}
              disabled={isPreviousDisabled}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-lg font-medium px-4">
              Page {currentPage + 1}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPage(currentPage + 1)}
              disabled={isNextDisabled}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPage(totalPages - 1)}
              disabled={isNextDisabled}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2 ml-4">
              <Input
                type="number"
                placeholder="Page"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                className="w-20"
                min="1"
                max={totalPages}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPage}
                disabled={!pageInput}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-center space-x-4">
          <Button onClick={onNewSearch}>New Search</Button>
          <Switch
            checked={isTableView}
            onChange={setIsTableView}
            label={`Switch View: ${isTableView ? 'Table' : 'Cards'}`}
          />
        </div>
      </div>

      {/* Results Display */}
      {isTableView ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted">
                <th className="border border-primary px-4 py-3 text-center">User</th>
                <th className="border border-primary px-4 py-3">Day</th>
                <th className="border border-primary px-4 py-3">Timestamp</th>
                <th className="border border-primary px-4 py-3 text-center">Message</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-muted/50">
                  <td className="border border-primary px-4 py-3 text-center">{item.userName}</td>
                  <td className="border border-primary px-4 py-3 text-center">{formatDate(item.logDay)}</td>
                  <td className="border border-primary px-4 py-3 text-center">@{item.hour}</td>
                  <td className="border border-primary px-4 py-3">{item.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item: any, index: number) => (
            <div key={index} className="border-form p-4 rounded-lg">
              <p className="mb-2">
                <span className="font-bold">User:</span> {item.userName}
              </p>
              <p className="mb-2">
                <span className="font-bold">Day:</span> {formatDate(item.logDay)}
              </p>
              <p className="mb-2">
                <span className="font-bold">Timestamp:</span> {item.hour}
              </p>
              <p>
                <span className="font-bold">Message:</span> {item.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Controls */}
      <div className="text-center space-y-4">
        <h5 className="text-lg">
          Found {totalResults} results divided into {totalPages} pages.
        </h5>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPage(0)}
              disabled={isPreviousDisabled}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPage(currentPage - 1)}
              disabled={isPreviousDisabled}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-lg font-medium px-4">
              Page {currentPage + 1}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPage(currentPage + 1)}
              disabled={isNextDisabled}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPage(totalPages - 1)}
              disabled={isNextDisabled}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <Button onClick={onNewSearch}>New Search</Button>
      </div>

      {/* Scroll Buttons */}
      {showScrollButtons && (
        <>
          <div className="hidden lg:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="fixed bottom-20 right-5 bg-primary text-white hover:bg-primary-hover rounded-full p-3"
            >
              <ArrowUp className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToBottom}
              className="fixed bottom-5 right-5 bg-primary text-white hover:bg-primary-hover rounded-full p-3"
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="fixed bottom-14 right-2 bg-primary text-white hover:bg-primary-hover rounded-full p-2"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToBottom}
              className="fixed bottom-2 right-2 bg-primary text-white hover:bg-primary-hover rounded-full p-2"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}