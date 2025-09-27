import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User, AuthStore } from '@/types/store'

// Mock API functions (replace with real API calls)
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-02-20T00:00:00Z'
  },
  {
    id: '2',
    name: 'SOP User',
    email: 'sop@acme-corp.com',
    role: 'sop',
    organizationId: 'org-1',
    organizationWebsite: 'Acme Corp',
    createdAt: '2024-01-15T00:00:00Z',
    lastLogin: '2024-02-20T00:00:00Z'
  }
]

const loginAPI = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Mock authentication logic
  const user = mockUsers.find(u => u.email === email)
  
  if (!user) {
    throw new Error('Invalid email or password')
  }
  
  // In a real implementation, you would verify the password
  if (password !== 'password') {
    throw new Error('Invalid email or password')
  }
  
  // Update last login
  user.lastLogin = new Date().toISOString()
  
  return user
}

const checkAuthAPI = async (): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // In a real implementation, you would check for a valid token
  const token = localStorage.getItem('auth-token')
  
  if (!token) {
    return null
  }
  
  // Mock token validation
  const user = mockUsers[0] // Return admin user for demo
  return user
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        setUser: (user) => {
          set({ 
            user, 
            isAuthenticated: !!user 
          }, false, 'setUser')
        },

        setLoading: (loading) => {
          set({ isLoading: loading }, false, 'setLoading')
        },

        setError: (error) => {
          set({ error }, false, 'setError')
        },

        login: async (email, password) => {
          set({ isLoading: true, error: null }, false, 'login/start')
          
          try {
            const user = await loginAPI(email, password)
            
            // Store auth token (in real implementation)
            localStorage.setItem('auth-token', 'mock-token')
            localStorage.setItem('user', JSON.stringify(user))
            
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false 
            }, false, 'login/success')
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false 
            }, false, 'login/error')
          }
        },

        logout: () => {
          // Clear auth token and user data
          localStorage.removeItem('auth-token')
          localStorage.removeItem('user')
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null 
          }, false, 'logout')
        },

        checkAuth: async () => {
          set({ isLoading: true, error: null }, false, 'checkAuth/start')
          
          try {
            const user = await checkAuthAPI()
            
            if (user) {
              set({ 
                user, 
                isAuthenticated: true, 
                isLoading: false 
              }, false, 'checkAuth/success')
            } else {
              set({ 
                user: null, 
                isAuthenticated: false, 
                isLoading: false 
              }, false, 'checkAuth/unauthorized')
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Auth check failed',
              isLoading: false 
            }, false, 'checkAuth/error')
          }
        }
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ 
          user: state.user,
          isAuthenticated: state.isAuthenticated
        })
      }
    ),
    {
      name: 'auth-store'
    }
  )
)
