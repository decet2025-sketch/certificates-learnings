'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, BookOpen, Upload, Users, Search, Filter, MoreHorizontal } from 'lucide-react'
import { AddCourseModal } from '@/components/AddCourseModal'
import { UploadLearnersModal } from '@/components/UploadLearnersModal'
import { LearnersSidePanel } from '@/components/LearnersSidePanel'
import { useState } from 'react'
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

export default function CoursesPage() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data for demonstration
  const mockCourses = [
    {
      id: '1',
      name: 'Advanced React Development',
      courseId: 'REACT-001',
      status: 'Active',
      learners: 24,
      completionRate: 85,
      lastUpdated: '2024-02-20'
    },
    {
      id: '2',
      name: 'JavaScript Fundamentals',
      courseId: 'JS-001',
      status: 'Active',
      learners: 18,
      completionRate: 92,
      lastUpdated: '2024-02-18'
    },
    {
      id: '3',
      name: 'Python for Data Science',
      courseId: 'PYTHON-001',
      status: 'Archived',
      learners: 12,
      completionRate: 78,
      lastUpdated: '2024-01-15'
    }
  ]

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.courseId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || course.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'Archived':
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Courses</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your courses and certificate templates</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <AddCourseModal />
            <UploadLearnersModal />
            <Button 
              onClick={() => setIsSidePanelOpen(true)} 
              className="flex items-center space-x-2 w-full sm:w-auto"
            >
              <Users className="h-4 w-4" />
              <span>View Learners</span>
            </Button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                  All Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('archived')}>
                  Archived
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockCourses.filter(c => c.status === 'Active').length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockCourses.reduce((sum, course) => sum + course.learners, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all courses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockCourses.reduce((sum, course) => sum + course.completionRate, 0) / mockCourses.length)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Completion rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockCourses.reduce((sum, course) => sum + Math.round(course.learners * course.completionRate / 100), 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Issued certificates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Course Management</CardTitle>
            <CardDescription>View and manage all your courses</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No courses found</p>
                {searchTerm && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search terms
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
                          <th className="text-left p-4 font-medium">Course Name</th>
                          <th className="text-left p-4 font-medium">Course ID</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Learners</th>
                          <th className="text-left p-4 font-medium">Completion Rate</th>
                          <th className="text-left p-4 font-medium">Last Updated</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCourses.map((course) => (
                          <tr key={course.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="font-medium">{course.name}</div>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {course.courseId}
                            </td>
                            <td className="p-4">
                              {getStatusBadge(course.status)}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{course.learners}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${course.completionRate}%` }}
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground">{course.completionRate}%</span>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {new Date(course.lastUpdated).toLocaleDateString()}
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
                                  <DropdownMenuItem>Edit Course</DropdownMenuItem>
                                  <DropdownMenuItem>View Learners</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    Delete Course
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
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base truncate">{course.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{course.courseId}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(course.status)}
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
                                <DropdownMenuItem>Edit Course</DropdownMenuItem>
                                <DropdownMenuItem>View Learners</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Delete Course
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-1">
                              <Users className="h-4 w-4" />
                              <span>Learners</span>
                            </div>
                            <div className="text-lg font-semibold">{course.learners}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-1">Completion</div>
                            <div className="text-lg font-semibold">{course.completionRate}%</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{course.completionRate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${course.completionRate}%` }}
                            />
                          </div>
                        </div>

                        {/* Last Updated */}
                        <div className="text-xs text-muted-foreground">
                          Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
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

      {/* Learners Side Panel */}
      <LearnersSidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
      />
    </DashboardLayout>
  )
}
