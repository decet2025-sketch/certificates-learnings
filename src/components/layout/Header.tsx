'use client'

import { Menu, Bell, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMenuClick: () => void
  isSidebarOpen: boolean
  isMobile: boolean
}

export function Header({ onMenuClick, isSidebarOpen, isMobile }: HeaderProps) {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked')
  }

  const handleProfile = () => {
    // TODO: Implement profile logic
    console.log('Profile clicked')
  }

  const handleSettings = () => {
    // TODO: Implement settings logic
    console.log('Settings clicked')
  }

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
          {/* Mobile Menu Button - Enhanced touch target */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden p-2 h-10 w-10 min-h-[44px] min-w-[44px]"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search Bar - Hidden on mobile, shown on tablet and up */}
          <div className="hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 w-48 sm:w-64 lg:w-80 h-9 sm:h-10"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
          {/* Mobile Search Button - Enhanced touch target */}
          <Button
            variant="ghost"
            size="sm"
            className="sm:hidden p-2 h-10 w-10 min-h-[44px] min-w-[44px]"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications - Enhanced touch target */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative p-2 h-10 w-10 min-h-[44px] min-w-[44px]"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="text-center">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2 space-y-2">
                <div className="text-sm text-gray-600 p-2 hover:bg-gray-50 rounded">
                  <p className="font-medium">New certificate issued</p>
                  <p className="text-xs text-gray-500">John Doe completed React course</p>
                </div>
                <div className="text-sm text-gray-600 p-2 hover:bg-gray-50 rounded">
                  <p className="font-medium">Learner enrolled</p>
                  <p className="text-xs text-gray-500">Jane Smith joined Python course</p>
                </div>
                <div className="text-sm text-gray-600 p-2 hover:bg-gray-50 rounded">
                  <p className="font-medium">System update</p>
                  <p className="text-xs text-gray-500">New features available</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu - Enhanced touch target */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 p-2 h-10 min-h-[44px]"
              >
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium">Admin User</span>
                <ChevronDown className="h-4 w-4 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile} className="min-h-[44px]">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettings} className="min-h-[44px]">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 min-h-[44px]">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar - Shown when search is clicked */}
      <div className="sm:hidden mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 w-full h-10"
          />
        </div>
      </div>
    </header>
  )
}
