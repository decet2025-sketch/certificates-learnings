'use client'

import { ReactNode, useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MainContent } from './MainContent'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false) // Close sidebar on desktop
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        isMobile={isMobile}
      />
      
      {/* Main Content Area - Fixed positioning for desktop sidebar */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Header */}
        <Header 
          onMenuClick={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />
        
        {/* Main Content */}
        <MainContent>
          {children}
        </MainContent>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
