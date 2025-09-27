'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MainContentProps {
  children: ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className="py-3 sm:py-4 lg:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
