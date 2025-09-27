import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Organization, OrganizationsStore } from '@/types/store'

// Mock API functions (replace with real API calls)
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Acme Corp',
    website: 'https://acme-corp.com',
    sopEmail: 'sop@acme-corp.com',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
    totalLearners: 24,
    totalCourses: 3
  },
  {
    id: '2',
    name: 'TechCorp Inc',
    website: 'https://techcorp.com',
    sopEmail: 'sop@techcorp.com',
    status: 'active',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-18T00:00:00Z',
    totalLearners: 18,
    totalCourses: 2
  },
  {
    id: '3',
    name: 'StartupIO',
    website: 'https://startup.io',
    sopEmail: 'sop@startup.io',
    status: 'active',
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-02-21T00:00:00Z',
    totalLearners: 12,
    totalCourses: 1
  }
]

const fetchOrganizationsFromAPI = async (): Promise<Organization[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockOrganizations
}

const createOrganizationAPI = async (organizationData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>): Promise<Organization> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const newOrganization: Organization = {
    ...organizationData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return newOrganization
}

export const useOrganizationsStore = create<OrganizationsStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        organizations: [],
        selectedOrganization: null,
        isLoading: false,
        error: null,
        totalCount: 0,

        // Actions
        setOrganizations: (organizations) => {
          set({ organizations, totalCount: organizations.length }, false, 'setOrganizations')
        },

        addOrganization: (organization) => {
          const { organizations } = get()
          set({ 
            organizations: [...organizations, organization], 
            totalCount: organizations.length + 1 
          }, false, 'addOrganization')
        },

        updateOrganization: (id, updates) => {
          const { organizations } = get()
          const updatedOrganizations = organizations.map(org =>
            org.id === id ? { ...org, ...updates, updatedAt: new Date().toISOString() } : org
          )
          set({ organizations: updatedOrganizations }, false, 'updateOrganization')
        },

        deleteOrganization: (id) => {
          const { organizations } = get()
          const filteredOrganizations = organizations.filter(org => org.id !== id)
          set({ 
            organizations: filteredOrganizations, 
            totalCount: filteredOrganizations.length 
          }, false, 'deleteOrganization')
        },

        setSelectedOrganization: (organization) => {
          set({ selectedOrganization: organization }, false, 'setSelectedOrganization')
        },

        setLoading: (loading) => {
          set({ isLoading: loading }, false, 'setLoading')
        },

        setError: (error) => {
          set({ error }, false, 'setError')
        },

        fetchOrganizations: async () => {
          set({ isLoading: true, error: null }, false, 'fetchOrganizations/start')
          
          try {
            const organizations = await fetchOrganizationsFromAPI()
            set({ 
              organizations, 
              totalCount: organizations.length, 
              isLoading: false 
            }, false, 'fetchOrganizations/success')
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch organizations',
              isLoading: false 
            }, false, 'fetchOrganizations/error')
          }
        },

        createOrganization: async (organizationData) => {
          set({ isLoading: true, error: null }, false, 'createOrganization/start')
          
          try {
            const newOrganization = await createOrganizationAPI(organizationData)
            const { organizations } = get()
            set({ 
              organizations: [...organizations, newOrganization], 
              totalCount: organizations.length + 1,
              isLoading: false 
            }, false, 'createOrganization/success')
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to create organization',
              isLoading: false 
            }, false, 'createOrganization/error')
          }
        }
      }),
      {
        name: 'organizations-storage',
        partialize: (state) => ({ 
          organizations: state.organizations,
          selectedOrganization: state.selectedOrganization,
          totalCount: state.totalCount
        })
      }
    ),
    {
      name: 'organizations-store'
    }
  )
)
