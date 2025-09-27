'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Mail, 
  Building2, 
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Award
} from 'lucide-react'
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

interface Learner {
  id: string
  name: string
  email: string
  organization: string
  courses: string[]
  status: 'Active' | 'Inactive' | 'Suspended'
  lastActivity: string
  completionRate: number
  certificates: number
}

const mockLearners: Learner[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    organization: 'Acme Corp',
    courses: ['Advanced React Development', 'JavaScript Fundamentals'],
    status: 'Active',
    lastActivity: '2024-02-20',
    completionRate: 85,
    certificates: 2
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@techcorp.com',
    organization: 'TechCorp Inc',
    courses: ['Python for Data Science'],
    status: 'Active',
    lastActivity: '2024-02-18',
    completionRate: 92,
    certificates: 1
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@startup.io',
    organization: 'StartupCo',
    courses: ['Node.js Backend Development'],
    status: 'Inactive',
    lastActivity: '2024-01-15',
    completionRate: 45,
    certificates: 0
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@enterprise.com',
    organization: 'Enterprise Solutions',
    courses: ['Advanced React Development', 'JavaScript Fundamentals', 'Python for Data Science'],
    status: 'Active',
    lastActivity: '2024-02-19',
    completionRate: 78,
    certificates: 3
  }
]

const ORGANIZATIONS = ['All', 'Acme Corp', 'TechCorp Inc', 'StartupCo', 'Enterprise Solutions']
const STATUSES = ['All', 'Active', 'Inactive', 'Suspended']

export default function LearnersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrganization, setSelectedOrganization] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredLearners = useMemo(() => {
    return mockLearners.filter(learner => {
      const matchesSearch = 
        learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learner.organization.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesOrganization = selectedOrganization === 'All' || learner.organization === selectedOrganization
      const matchesStatus = selectedStatus === 'All' || learner.status === selectedStatus
      
      return matchesSearch && matchesOrganization && matchesStatus
    })
  }, [searchTerm, selectedOrganization, selectedStatus])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case 'Suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
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
      case 'Suspended':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedOrganization('All')
    setSelectedStatus('All')
  }

  const hasActiveFilters = searchTerm || selectedOrganization !== 'All' || selectedStatus !== 'All'

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Learners</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage and track learner progress</p>
          </div>
          <div className="flex gap-2">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Learner</span>
            </Button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search learners..."
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
                    <span>Organization</span>
                  </label>
                  <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORGANIZATIONS.map((org) => (
                        <SelectItem key={org} value={org}>
                          {org}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-1">
                    <Users className="h-4 w-4" />
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
              <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockLearners.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockLearners.filter(l => l.status === 'Active').length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockLearners.filter(l => l.status === 'Active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently enrolled
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockLearners.reduce((sum, learner) => sum + learner.completionRate, 0) / mockLearners.length)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Completion rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockLearners.reduce((sum, learner) => sum + learner.certificates, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total issued
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredLearners.length} learner{filteredLearners.length !== 1 ? 's' : ''} found
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

        {/* Learners Table */}
        <Card>
          <CardHeader>
            <CardTitle>Learner Management</CardTitle>
            <CardDescription>View and manage all learners</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredLearners.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <Users className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No learners found</p>
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
                          <th className="text-left p-4 font-medium">Learner</th>
                          <th className="text-left p-4 font-medium">Organization</th>
                          <th className="text-left p-4 font-medium">Courses</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Completion</th>
                          <th className="text-left p-4 font-medium">Certificates</th>
                          <th className="text-left p-4 font-medium">Last Activity</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLearners.map((learner) => (
                          <tr key={learner.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{learner.name}</div>
                                <div className="text-sm text-muted-foreground">{learner.email}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span>{learner.organization}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span>{learner.courses.length}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(learner.status)}
                                {getStatusBadge(learner.status)}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${learner.completionRate}%` }}
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground">{learner.completionRate}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                <span>{learner.certificates}</span>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {new Date(learner.lastActivity).toLocaleDateString()}
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
                                  <DropdownMenuItem>Edit Learner</DropdownMenuItem>
                                  <DropdownMenuItem>View Progress</DropdownMenuItem>
                                  <DropdownMenuItem>Send Email</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    Delete Learner
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
                  {filteredLearners.map((learner) => (
                    <Card key={learner.id} className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base truncate">{learner.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{learner.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(learner.status)}
                            {getStatusBadge(learner.status)}
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
                                <DropdownMenuItem>Edit Learner</DropdownMenuItem>
                                <DropdownMenuItem>View Progress</DropdownMenuItem>
                                <DropdownMenuItem>Send Email</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Delete Learner
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Organization and Courses */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs sm:text-sm text-muted-foreground">{learner.organization}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs sm:text-sm text-muted-foreground">{learner.courses.length} courses</span>
                          </div>
                        </div>

                        {/* Progress and Certificates */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-1">Completion</div>
                            <div className="text-lg font-semibold">{learner.completionRate}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-1">Certificates</div>
                            <div className="text-lg font-semibold">{learner.certificates}</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{learner.completionRate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${learner.completionRate}%` }}
                            />
                          </div>
                        </div>

                        {/* Last Activity */}
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Last activity: {new Date(learner.lastActivity).toLocaleDateString()}</span>
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
