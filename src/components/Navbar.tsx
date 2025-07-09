'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Archive } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-primary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Archive className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary font-bangers tracking-wider">
              ARCHIVE CHAT LOGS
            </h1>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className={cn(
                'text-lg font-bangers transition-colors hover:text-gray-500',
                pathname === '/' ? 'text-foreground' : 'text-foreground'
              )}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={cn(
                'text-lg font-bangers transition-colors hover:text-gray-500',
                pathname === '/about' ? 'text-foreground' : 'text-foreground'
              )}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}