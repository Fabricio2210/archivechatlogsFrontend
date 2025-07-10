'use client'

import React from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { cn } from '@/lib/utils'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}

export function Switch({ checked, onChange, label, className }: SwitchProps) {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
          checked ? 'switch-bg' : 'bg-muted'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </HeadlessSwitch>
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  )
}