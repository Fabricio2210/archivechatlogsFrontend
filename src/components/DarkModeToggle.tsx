'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Switch } from '@/components/ui/Switch'

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center justify-center py-4">
      <Switch
        checked={theme === 'light'}
        onChange={toggleTheme}
        label={`Theme: ${theme}`}
        className="text-lg"
      />
    </div>
  )
}