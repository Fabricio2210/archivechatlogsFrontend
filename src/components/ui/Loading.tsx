import React from 'react'
import { Loader2 } from 'lucide-react'

export function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-semibold">
          Searching
          <span className="animate-pulse">...</span>
        </h1>
      </div>
    </div>
  )
}