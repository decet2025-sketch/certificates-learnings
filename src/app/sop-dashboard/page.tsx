'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Award, 
  Download, 
  RefreshCw, 
  Building2, 
  Clock, 
  CheckCircle, 
  BarChart, 
  Activity, 
  ArrowRight,
  FileText,
  TrendingUp,
  UserCheck,
  Calendar,
  Mail,
  ExternalLink
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SOPDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/signin')
    } else {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== 'sop') {
        router.push('/unauthorized')
      } else {
        setUser(parsedUser)
      }
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleNavigateToSection = (section: string) => {
    // TODO: Implement navigation to specific sections
    console.log(`Navigate to ${section}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const organizationName = user.organizationWebsite || 'Your Organization'
  
  const recentActivities = [
    { 
      id: 1, 
      action: 'Certificate downloaded', 
      learner: 'John Doe', 
      course: 'React Fundamentals', 
      time: '2 hours ago', 
      icon: Download, 
      color: 'blue', 
      gradient: 'from-blue-500 to-blue-600' 
    },
    { 
      id: 2, 
      action: 'Learner completed course', 
      learner: 'Jane Smith', 
      course: 'Node.js Basics', 
      time: '4 hours ago', 
      icon: CheckCircle, 
      color: 'green', 
      gradient: 'from-green-500 to-green-600' 
    },
    { 
      id: 3, 
      action: 'Certificate resent', 
      learner: 'Mike Johnson', 
      course: 'Python Advanced', 
      time: '6 hours ago', 
      icon: RefreshCw, 
      color: 'purple', 
      gradient: 'from-purple-500 to-purple-600' 
    },
    { 
      id: 4, 
      action: 'New learner enrolled', 
      learner: 'Sarah Wilson', 
      course: 'JavaScript Basics', 
      time: '1 day ago', 
      icon: Users, 
      color: 'orange', 
      gradient: 'from-orange-500 to-orange-600' 
    },
  ]

  const mainSections = [
    {
      id: 'my-learners',
      title: 'My Learners',
      description: 'View and manage all learners from your organization',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      stats: { total: 24, active: 18, completed: 15 },
      action: 'View All Learners',
      href: '/learners'
    },
    {
      id: 'certificate-downloads',
      title: 'Certificate Downloads',
      description: 'Download and manage certificates for completed courses',
      icon: Download,
      gradient: 'from-green-500 to-green-600',
      stats: { total: 15, pending: 3, ready: 12 },
      action: 'Manage Certificates',
      href: '/certificates'
    },
    {
      id: 'progress-reports',
      title: 'Progress Reports',
      description: 'View detailed progress reports and analytics',
      icon: BarChart,
      gradient: 'from-purple-500 to-purple-600',
      stats: { completionRate: 78, avgProgress: 65, activeCourses: 8 },
      action: 'View Reports',
      href: '/reports'
    }
  ]

  const quickActions = [
    { 
      id: 1, 
      title: 'Resend Certificates', 
      description: 'Resend certificates to learners', 
      icon: RefreshCw, 
      gradient: 'from-orange-500 to-orange-600' 
    },
    { 
      id: 2, 
      title: 'Export Data', 
      description: 'Export learner data and reports', 
      icon: FileText, 
      gradient: 'from-indigo-500 to-indigo-600' 
    },
    { 
      id: 3, 
      title: 'Contact Support', 
      description: 'Get help with your account', 
      icon: Mail, 
      gradient: 'from-teal-500 to-teal-600' 
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Welcome, {organizationName} Portal
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Manage your organization's learners and certificates
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Building2 className="h-4 w-4" />
                <span>Organization: {organizationName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <UserCheck className="h-4 w-4" />
                <span>SOP Dashboard</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2 w-full sm:w-auto"
          >
            <span>Logout</span>
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Total Learners
              </CardTitle>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">24</div>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />
                +3 this week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Completed Courses
              </CardTitle>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">18</div>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />
                +5 completed
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Certificates
              </CardTitle>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Download className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">15</div>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />
                +2 generated
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Pending
              </CardTitle>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">6</div>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-orange-500" />
                In progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Sections */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Organization Portal</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Access your organization's learning management tools</p>
          </div>
          
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {mainSections.map((section) => {
              const Icon = section.icon
              return (
                <Card 
                  key={section.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleNavigateToSection(section.id)}
                >
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${section.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg">{section.title}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {section.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {Object.entries(section.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-foreground">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-colors text-sm sm:text-base"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToSection(section.id)
                      }}
                    >
                      <span>{section.action}</span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Latest updates from your organization</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 sm:space-x-4 group">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r ${activity.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                          {activity.action}
                          <span className="text-muted-foreground"> - {activity.learner}</span>
                          <span className="text-muted-foreground hidden sm:inline"> - {activity.course}</span>
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Common tasks and shortcuts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Button 
                      key={action.id} 
                      variant="outline" 
                      className="w-full justify-start h-10 sm:h-12 hover:bg-muted/50 transition-all duration-300 group"
                      onClick={() => console.log(`Action: ${action.title}`)}
                    >
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 ${action.gradient} rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-sm sm:text-base truncate">{action.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{action.description}</div>
                      </div>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
