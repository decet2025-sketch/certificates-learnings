'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppStore } from '@/stores/useAppStore'

export default function TestPage() {
  const { ui, courses, learners, organizations, learnerProgress, certificates, auth } = useAppStore()

  const handleTest = () => {
    ui.setLoading(true)
    setTimeout(() => {
      ui.setLoading(false)
      ui.setPagination({ currentPage: 1 })
    }, 1000)
  }

  const handleFetchData = async () => {
    try {
      await Promise.all([
        courses.fetchCourses(),
        learners.fetchLearners(),
        organizations.fetchOrganizations(),
        learnerProgress.fetchLearnerProgress(),
        certificates.fetchCertificates()
      ])
      ui.addNotification({
        type: 'success',
        title: 'Data Fetched',
        message: 'All data has been successfully fetched from the stores'
      })
    } catch (error) {
      ui.addNotification({
        type: 'error',
        title: 'Fetch Error',
        message: 'Failed to fetch data from stores'
      })
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">State Management Test Page</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>UI Store Test</CardTitle>
            <CardDescription>Testing UI state management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleTest} disabled={ui.loading}>
              {ui.loading ? 'Loading...' : 'Test UI Store'}
            </Button>
            <div className="text-sm text-muted-foreground">
              <p>Current Page: {ui.pagination.currentPage}</p>
              <p>Loading: {ui.loading ? 'Yes' : 'No'}</p>
              <p>Sidebar Open: {ui.sidebarOpen ? 'Yes' : 'No'}</p>
              <p>Theme: {ui.theme}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Stores Test</CardTitle>
            <CardDescription>Testing data store management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleFetchData}>
              Fetch All Data
            </Button>
            <div className="text-sm text-muted-foreground">
              <p>Courses: {courses.courses.length}</p>
              <p>Learners: {learners.learners.length}</p>
              <p>Organizations: {organizations.organizations.length}</p>
              <p>Progress Records: {learnerProgress.learnerProgress.length}</p>
              <p>Certificates: {certificates.certificates.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Auth Store Test</CardTitle>
            <CardDescription>Testing authentication state</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>Authenticated: {auth.isAuthenticated ? 'Yes' : 'No'}</p>
              <p>User: {auth.user?.name || 'None'}</p>
              <p>Role: {auth.user?.role || 'None'}</p>
              <p>Loading: {auth.isLoading ? 'Yes' : 'No'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications Test</CardTitle>
            <CardDescription>Testing notification system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                size="sm" 
                onClick={() => ui.addNotification({
                  type: 'success',
                  title: 'Success!',
                  message: 'This is a success notification'
                })}
              >
                Add Success
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => ui.addNotification({
                  type: 'error',
                  title: 'Error!',
                  message: 'This is an error notification'
                })}
              >
                Add Error
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => ui.clearNotifications()}
              >
                Clear All
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Notifications: {ui.notifications.length}</p>
              <p>Unread: {ui.notifications.filter(n => !n.read).length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modals Test</CardTitle>
            <CardDescription>Testing modal state management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                size="sm" 
                onClick={() => ui.setModalOpen('addCourse', true)}
              >
                Open Add Course
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => ui.setModalOpen('addOrganization', true)}
              >
                Open Add Organization
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Add Course Modal: {ui.modals.addCourse ? 'Open' : 'Closed'}</p>
              <p>Add Organization Modal: {ui.modals.addOrganization ? 'Open' : 'Closed'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tailwind CSS Test</CardTitle>
            <CardDescription>Testing Tailwind CSS styling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-primary rounded"></div>
              <div className="h-4 bg-secondary rounded"></div>
              <div className="h-4 bg-accent rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
