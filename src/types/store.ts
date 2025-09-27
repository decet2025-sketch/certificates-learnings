// Core entity types
export interface Course {
  id: string
  name: string
  courseId: string
  certificateTemplate?: File | string
  createdAt: string
  updatedAt: string
  status: 'active' | 'inactive' | 'draft'
  totalLearners: number
  completedLearners: number
}

export interface Learner {
  id: string
  name: string
  email: string
  organization: string
  organizationId: string
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  updatedAt: string
  totalCourses: number
  completedCourses: number
}

export interface Organization {
  id: string
  name: string
  website: string
  sopEmail: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
  totalLearners: number
  totalCourses: number
}

export interface LearnerProgress {
  id: string
  learnerId: string
  courseId: string
  learnerName: string
  email: string
  organization: string
  course: string
  enrollmentDate: string
  completionStatus: 'completed' | 'in-progress' | 'not-started' | 'blocked'
  certificateStatus: 'issued' | 'pending' | 'not-eligible'
  progress: number
  lastActivity: string
  certificateId?: string
  completionDate?: string
}

export interface Certificate {
  id: string
  learnerId: string
  courseId: string
  learnerName: string
  courseName: string
  organizationName: string
  issuedDate: string
  status: 'issued' | 'pending' | 'revoked'
  downloadUrl?: string
  certificateId: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'sop'
  organizationId?: string
  organizationWebsite?: string
  createdAt: string
  lastLogin: string
}

// UI State types
export interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  loading: boolean
  notifications: Notification[]
  modals: {
    addCourse: boolean
    addOrganization: boolean
    uploadLearners: boolean
    certificatePreview: boolean
    learnersSidePanel: boolean
  }
  filters: {
    search: string
    organization: string
    course: string
    completionStatus: string[]
    certificateStatus: string[]
    dateRange: {
      startDate: string
      endDate: string
    }
  }
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
  }
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
}

// Store state interfaces
export interface CoursesState {
  courses: Course[]
  selectedCourse: Course | null
  isLoading: boolean
  error: string | null
  totalCount: number
}

export interface LearnersState {
  learners: Learner[]
  selectedLearner: Learner | null
  isLoading: boolean
  error: string | null
  totalCount: number
}

export interface OrganizationsState {
  organizations: Organization[]
  selectedOrganization: Organization | null
  isLoading: boolean
  error: string | null
  totalCount: number
}

export interface LearnerProgressState {
  learnerProgress: LearnerProgress[]
  selectedProgress: LearnerProgress | null
  isLoading: boolean
  error: string | null
  totalCount: number
  filteredCount: number
}

export interface CertificatesState {
  certificates: Certificate[]
  selectedCertificate: Certificate | null
  isLoading: boolean
  error: string | null
  totalCount: number
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Action types
export interface CoursesActions {
  setCourses: (courses: Course[]) => void
  addCourse: (course: Course) => void
  updateCourse: (id: string, updates: Partial<Course>) => void
  deleteCourse: (id: string) => void
  setSelectedCourse: (course: Course | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchCourses: () => Promise<void>
  createCourse: (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
}

export interface LearnersActions {
  setLearners: (learners: Learner[]) => void
  addLearner: (learner: Learner) => void
  updateLearner: (id: string, updates: Partial<Learner>) => void
  deleteLearner: (id: string) => void
  setSelectedLearner: (learner: Learner | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchLearners: () => Promise<void>
  createLearner: (learnerData: Omit<Learner, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  uploadLearners: (file: File) => Promise<void>
}

export interface OrganizationsActions {
  setOrganizations: (organizations: Organization[]) => void
  addOrganization: (organization: Organization) => void
  updateOrganization: (id: string, updates: Partial<Organization>) => void
  deleteOrganization: (id: string) => void
  setSelectedOrganization: (organization: Organization | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchOrganizations: () => Promise<void>
  createOrganization: (organizationData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
}

export interface LearnerProgressActions {
  setLearnerProgress: (progress: LearnerProgress[]) => void
  addLearnerProgress: (progress: LearnerProgress) => void
  updateLearnerProgress: (id: string, updates: Partial<LearnerProgress>) => void
  deleteLearnerProgress: (id: string) => void
  setSelectedProgress: (progress: LearnerProgress | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchLearnerProgress: () => Promise<void>
  filterLearnerProgress: (filters: Partial<UIState['filters']>) => void
}

export interface CertificatesActions {
  setCertificates: (certificates: Certificate[]) => void
  addCertificate: (certificate: Certificate) => void
  updateCertificate: (id: string, updates: Partial<Certificate>) => void
  deleteCertificate: (id: string) => void
  setSelectedCertificate: (certificate: Certificate | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchCertificates: () => Promise<void>
  generateCertificate: (learnerId: string, courseId: string) => Promise<void>
  downloadCertificate: (certificateId: string) => Promise<void>
}

export interface AuthActions {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export interface UIActions {
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLoading: (loading: boolean) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  markNotificationAsRead: (id: string) => void
  clearNotifications: () => void
  setModalOpen: (modal: keyof UIState['modals'], open: boolean) => void
  setFilter: (filter: keyof UIState['filters'], value: any) => void
  setPagination: (pagination: Partial<UIState['pagination']>) => void
  resetFilters: () => void
}

// Combined store types
export type CoursesStore = CoursesState & CoursesActions
export type LearnersStore = LearnersState & LearnersActions
export type OrganizationsStore = OrganizationsState & OrganizationsActions
export type LearnerProgressStore = LearnerProgressState & LearnerProgressActions
export type CertificatesStore = CertificatesState & CertificatesActions
export type AuthStore = AuthState & AuthActions
export type UIStore = UIState & UIActions

// Root store type
export interface RootStore {
  courses: CoursesStore
  learners: LearnersStore
  organizations: OrganizationsStore
  learnerProgress: LearnerProgressStore
  certificates: CertificatesStore
  auth: AuthStore
  ui: UIStore
}
