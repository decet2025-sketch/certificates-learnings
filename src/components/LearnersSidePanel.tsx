'use client'

import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Search, Filter, Users, CheckCircle2, Clock, XCircle, MinusCircle, Building2, BookOpen, Calendar, Award } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface Learner {
  id: string
  name: string
  email: string
  organization: string
  status: 'Completed' | 'In Progress' | 'Not Started' | 'Blocked'
  certificateStatus: 'Issued' | 'Pending' | 'Not Applicable'
  course: string
  enrollmentDate: string
  completionPercentage: number
}

const mockLearners: Learner[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    organization: 'Acme Corp',
    status: 'Completed',
    certificateStatus: 'Issued',
    course: 'Advanced React Development',
    enrollmentDate: '2024-01-15',
    completionPercentage: 100
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@techcorp.com',
    organization: 'TechCorp Inc',
    status: 'In Progress',
    certificateStatus: 'Pending',
    course: 'JavaScript Fundamentals',
    enrollmentDate: '2024-02-01',
    completionPercentage: 65
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@startup.io',
    organization: 'StartupCo',
    status: 'Not Started',
    certificateStatus: 'Not Applicable',
    course: 'Python for Data Science',
    enrollmentDate: '2024-02-10',
    completionPercentage: 0
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@enterprise.com',
    organization: 'Enterprise Solutions',
    status: 'Completed',
    certificateStatus: 'Issued',
    course: 'Node.js Backend Development',
    enrollmentDate: '2024-01-20',
    completionPercentage: 100
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@techcorp.com',
    organization: 'TechCorp Inc',
    status: 'Blocked',
    certificateStatus: 'Not Applicable',
    course: 'Advanced React Development',
    enrollmentDate: '2024-02-05',
    completionPercentage: 30
  }
]

interface LearnersSidePanelProps {
  isOpen: boolean
  onClose: () => void
}

export function LearnersSidePanel({ isOpen, onClose }: LearnersSidePanelProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterOrganization, setFilterOrganization] = useState('all')

  const filteredLearners = useMemo(() => {
    return mockLearners.filter(learner => {
      const matchesSearch = 
        learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learner.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learner.course.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || learner.status.toLowerCase().replace(' ', '-') === filterStatus
      const matchesOrganization = filterOrganization === 'all' || learner.organization === filterOrganization
      
      return matchesSearch && matchesStatus && matchesOrganization
    })
  }, [searchTerm, filterStatus, filterOrganization])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'Not Started':
        return <MinusCircle className="h-4 w-4 text-gray-500" />
      case 'Blocked':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case 'Not Started':
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
      case 'Blocked':
        return <Badge className="bg-red-100 text-red-800">Blocked</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getCertificateStatusBadge = (status: string) => {
    switch (status) {
      case 'Issued':
        return <Badge className="bg-green-100 text-green-800">Issued</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'Not Applicable':
        return <Badge className="bg-gray-100 text-gray-800">N/A</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const organizations = ['All', ...Array.from(new Set(mockLearners.map(l => l.organization)))]
  const statuses = ['All', 'Completed', 'In Progress', 'Not Started', 'Blocked']

  const clearFilters = () => {
    setSearchTerm('')
    setFilterStatus('all')
    setFilterOrganization('all')
  }

  const hasActiveFilters = searchTerm || filterStatus !== 'all' || filterOrganization !== 'all'

  return (
    <div
      className={cn(
        'fixed inset-y-0 right-0 z-50 w-full border-l bg-background transition-transform duration-300 ease-in-out sm:w-[450px] lg:w-[500px]',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4 sm:p-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Learners</h2>
            <p className="text-sm text-muted-foreground">View and manage learners</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="border-b p-4 sm:p-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search learners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 text-sm">
                  <Filter className="h-4 w-4" />
                  <span>Status</span>
                  {filterStatus !== 'all' && (
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuRadioGroup value={filterStatus} onValueChange={setFilterStatus}>
                  {statuses.map((status) => (
                    <DropdownMenuRadioItem key={status} value={status.toLowerCase().replace(' ', '-')}>
                      {status}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 text-sm">
                  <Building2 className="h-4 w-4" />
                  <span>Organization</span>
                  {filterOrganization !== 'all' && (
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuRadioGroup value={filterOrganization} onValueChange={setFilterOrganization}>
                  {organizations.map((org) => (
                    <DropdownMenuRadioItem key={org} value={org.toLowerCase()}>
                      {org}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-primary hover:text-primary/80"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="border-b p-4 sm:p-6">
          <div className="flex items-center justify-between">
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
        </div>

        {/* Learners List */}
        <div className="flex-1 overflow-y-auto">
          {filteredLearners.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center p-4">
              <Users className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm">No learners found</p>
              {hasActiveFilters && (
                <p className="text-xs text-muted-foreground mt-1">
                  Try adjusting your filters
                </p>
              )}
            </div>
          ) : (
            <div className="p-4 sm:p-6 space-y-4">
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Learner</TableHead>
                        <TableHead className="w-[120px]">Status</TableHead>
                        <TableHead className="w-[100px]">Progress</TableHead>
                        <TableHead className="w-[120px]">Certificate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLearners.map((learner) => (
                        <TableRow key={learner.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm">{learner.name}</div>
                              <div className="text-xs text-muted-foreground truncate">{learner.email}</div>
                              <div className="text-xs text-muted-foreground">{learner.organization}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(learner.status)}
                              {getStatusBadge(learner.status)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${learner.completionPercentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">{learner.completionPercentage}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getCertificateStatusBadge(learner.certificateStatus)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-3">
                {filteredLearners.map((learner) => (
                  <div key={learner.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{learner.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{learner.email}</p>
                        <p className="text-xs text-muted-foreground">{learner.organization}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(learner.status)}
                        {getStatusBadge(learner.status)}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground truncate">{learner.course}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{learner.completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${learner.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(learner.enrollmentDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="h-3 w-3 text-muted-foreground" />
                          {getCertificateStatusBadge(learner.certificateStatus)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1" size="sm">
              <Users className="mr-2 h-4 w-4" />
              View All Learners
            </Button>
            <Button variant="outline" className="flex-1" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
