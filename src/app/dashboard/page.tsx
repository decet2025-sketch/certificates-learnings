'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  Plus, 
  Upload, 
  FileText, 
  BarChart3,
  CheckCircle,
  AlertCircle,
  Activity,
  Calendar,
  Building2,
  BookOpen as BookIcon,
  Download,
  RefreshCw,
  Eye,
  ArrowRight
} from 'lucide-react'
import { LearnerProgressTable } from '@/components/LearnerProgressTable'
import { useState } from 'react'

interface Activity {
  id: string
  type: 'course_added' | 'learners_uploaded' | 'certificate_issued' | 'organization_added'
  description: string
  timestamp: string
  status: 'success' | 'pending' | 'error'
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'course_added',
    description: 'New course "Advanced React Development" added',
    timestamp: '2024-02-20T10:30:00Z',
    status: 'success'
  },
  {
    id: '2',
    type: 'learners_uploaded',
    description: '25 learners uploaded via CSV',
    timestamp: '2024-02-20T09:15:00Z',
    status: 'success'
  },
  {
    id: '3',
    type: 'certificate_issued',
    description: 'Certificate issued to John Doe',
    timestamp: '2024-02-19T16:45:00Z',
    status: 'success'
  },
  {
    id: '4',
    type: 'organization_added',
    description: 'New organization "TechCorp Inc" registered',
    timestamp: '2024-02-19T14:20:00Z',
    status: 'pending'
  }
]

export default function DashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  const totalCourses = 12
  const totalLearners = 1250
  const totalCertificates = 980
  const completionRate = 78.4

  const activeCourses = 8
  const pendingCertificates = 50
  const systemHealth = 'Good'

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_added':
        return <BookOpen className="h-4 w-4" />
      case 'learners_uploaded':
        return <Users className="h-4 w-4" />
      case 'certificate_issued':
        return <Award className="h-4 w-4" />
      case 'organization_added':
        return <Building2 className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'error':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Progress Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Overview of your learning platform's progress</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Export Report</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourses}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
              <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLearners.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
              <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCertificates.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCourses}</div>
              <p className="text-xs text-muted-foreground">
                Currently running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Certificates</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCertificates}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{systemHealth}</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Learner Progress Table */}
          <div className="lg:col-span-2">
            <LearnerProgressTable />
          </div>

          {/* Sidebar Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                  </Button>
                </div>
                <CardDescription>Latest actions and updates in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getActivityColor(activity.status)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimestamp(activity.timestamp)}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getActivityColor(activity.status)}`}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Perform common tasks quickly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Course
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Learners
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="mr-2 h-4 w-4" />
                  Issue Certificate
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Data
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
                <CardDescription>Current system health and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">File Storage</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email Service</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600">Degraded</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
