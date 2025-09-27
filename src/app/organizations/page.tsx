'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Mail, 
  Globe, 
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Award
} from 'lucide-react'
import { AddOrganizationModal } from '@/components/AddOrganizationModal'
import { useState, useMemo } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Organization {
  id: string
  name: string
  website: string
  sopEmail: string
  status: 'Active' | 'Inactive' | 'Pending'
  totalLearners: number
  activeLearners: number
  completedCourses: number
  lastActivity: string
  joinDate: string
}

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Acme Corp',
    website: 'https://acme.com',
    sopEmail: 'sop@acme.com',
    status: 'Active',
    totalLearners: 24,
    activeLearners: 18,
    completedCourses: 15,
    lastActivity: '2024-02-20',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'TechCorp Inc',
    website: 'https://techcorp.com',
    sopEmail: 'contact@techcorp.com',
    status: 'Active',
    totalLearners: 18,
    activeLearners: 12,
    completedCourses: 8,
    lastActivity: '2024-02-18',
    joinDate: '2023-03-10'
  },
  {
    id: '3',
    name: 'StartupCo',
    website: 'https://startup.io',
    sopEmail: 'admin@startup.io',
    status: 'Pending',
    totalLearners: 5,
    activeLearners: 3,
    completedCourses: 2,
    lastActivity: '2024-01-15',
    joinDate: '2024-01-01'
  },
  {
    id: '4',
    name: 'Enterprise Solutions',
    website: 'https://enterprise.com',
    sopEmail: 'sop@enterprise.com',
    status: 'Active',
    totalLearners: 32,
    activeLearners: 25,
    completedCourses: 20,
    lastActivity: '2024-02-19',
    joinDate: '2022-11-20'
  }
]

const STATUSES = ['All', 'Active', 'Inactive', 'Pending']

export default function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredOrganizations = useMemo(() => {
    return mockOrganizations.filter(org => {
      const matchesSearch = 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.sopEmail.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = selectedStatus === 'All' || org.status === selectedStatus
      
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, selectedStatus])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Inactive':
        return <Clock className="h-4 w-4 text-gray-500" />
      case 'Pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedStatus('All')
  }

  const hasActiveFilters = searchTerm || selectedStatus !== 'All'

  const totalOrganizations = mockOrganizations.length
  const totalLearners = mockOrganizations.reduce((sum, org) => sum + org.totalLearners, 0)
  const activeOrganizations = mockOrganizations.filter(org => org.status === 'Active').length
  const totalCompletedCourses = mockOrganizations.reduce((sum, org) => sum + org.completedCourses, 0)

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Organizations</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your organization partners and their details</p>
          </div>
          <AddOrganizationModal />
        </div>

        {/* Search and Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                )}
              </Button>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex items-center space-x-2"
                >
                  <span>Clear</span>
                </Button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Advanced Filters</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-1">
                    <Building2 className="h-4 w-4" />
                    <span>Status</span>
                  </label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrganizations}</div>
              <p className="text-xs text-muted-foreground">
                {activeOrganizations} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLearners}</div>
              <p className="text-xs text-muted-foreground">
                Across all organizations
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompletedCourses}</div>
              <p className="text-xs text-muted-foreground">
                Total completions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeOrganizations}</div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredOrganizations.length} organization{filteredOrganizations.length !== 1 ? 's' : ''} found
            {hasActiveFilters && ' (filtered)'}
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-primary hover:text-primary/80"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* Organizations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Organization List</CardTitle>
            <CardDescription>View and manage all registered organizations</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredOrganizations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <Building2 className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No organizations found</p>
                {hasActiveFilters && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-medium">Organization</th>
                          <th className="text-left p-4 font-medium">Website</th>
                          <th className="text-left p-4 font-medium">SOP Email</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Learners</th>
                          <th className="text-left p-4 font-medium">Completed</th>
                          <th className="text-left p-4 font-medium">Last Activity</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrganizations.map((org) => (
                          <tr key={org.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                  <Building2 className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <div className="font-medium">{org.name}</div>
                                  <div className="text-sm text-muted-foreground">Joined {new Date(org.joinDate).toLocaleDateString()}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <a 
                                  href={org.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  {org.website}
                                </a>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{org.sopEmail}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(org.status)}
                                {getStatusBadge(org.status)}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-center">
                                <div className="text-lg font-semibold">{org.totalLearners}</div>
                                <div className="text-xs text-muted-foreground">{org.activeLearners} active</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-center">
                                <div className="text-lg font-semibold">{org.completedCourses}</div>
                                <div className="text-xs text-muted-foreground">courses</div>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {new Date(org.lastActivity).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Organization</DropdownMenuItem>
                                  <DropdownMenuItem>View Learners</DropdownMenuItem>
                                  <DropdownMenuItem>Send Email</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    Delete Organization
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile/Tablet Cards */}
                <div className="lg:hidden space-y-4">
                  {filteredOrganizations.map((org) => (
                    <Card key={org.id} className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm sm:text-base truncate">{org.name}</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground">Joined {new Date(org.joinDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(org.status)}
                            {getStatusBadge(org.status)}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Organization</DropdownMenuItem>
                                <DropdownMenuItem>View Learners</DropdownMenuItem>
                                <DropdownMenuItem>Send Email</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Delete Organization
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Website and Email */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={org.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm truncate"
                            >
                              {org.website}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs sm:text-sm text-muted-foreground truncate">{org.sopEmail}</span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-1">Total Learners</div>
                            <div className="text-lg font-semibold">{org.totalLearners}</div>
                            <div className="text-xs text-muted-foreground">{org.activeLearners} active</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-1">Completed</div>
                            <div className="text-lg font-semibold">{org.completedCourses}</div>
                            <div className="text-xs text-muted-foreground">courses</div>
                          </div>
                        </div>

                        {/* Last Activity */}
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Last activity: {new Date(org.lastActivity).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
