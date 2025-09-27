'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { 
  Home, 
  BookOpen, 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  X,
  Award,
  FileText,
  Calendar,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isMobile: boolean
}

interface NavItem {
  name: string
  href: string
  icon: ReactNode
  badge?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="h-4 w-4 sm:h-5 sm:w-5" />
  },
  {
    name: 'Courses',
    href: '/courses',
    icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
  },
  {
    name: 'Learners',
    href: '/learners',
    icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />
  },
  {
    name: 'Organizations',
    href: '/organizations',
    icon: <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
  },
  {
    name: 'SOP Dashboard',
    href: '/sop-dashboard',
    icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" />
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
  }
]

export function Sidebar({ isOpen, onClose, isMobile }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">Sharon Decet</h1>
                <p className="text-xs text-gray-500">Certificate Management</p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors min-h-[44px]', // Enhanced touch target
                      isActive
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <span className={cn(
                      'mr-3 flex-shrink-0',
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    )}>
                      {item.icon}
                    </span>
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">Sharon Decet</h1>
                <p className="text-xs text-gray-500">Certificate Management</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 h-10 w-10 min-h-[44px] min-w-[44px]" // Enhanced touch target
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors min-h-[44px]', // Enhanced touch target
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <span className={cn(
                    'mr-3 flex-shrink-0',
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  )}>
                    {item.icon}
                  </span>
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <HelpCircle className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Help & Support</p>
                <p className="text-xs text-gray-500">Get assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
