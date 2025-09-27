import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Learner, LearnersStore } from '@/types/store'

// Mock API functions (replace with real API calls)
const mockLearners: Learner[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    organization: 'Acme Corp',
    organizationId: 'org-1',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
    totalCourses: 3,
    completedCourses: 2
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@techcorp.com',
    organization: 'TechCorp Inc',
    organizationId: 'org-2',
    status: 'active',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-18T00:00:00Z',
    totalCourses: 2,
    completedCourses: 1
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@startup.io',
    organization: 'StartupIO',
    organizationId: 'org-3',
    status: 'active',
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-02-21T00:00:00Z',
    totalCourses: 1,
    completedCourses: 0
  }
]

const fetchLearnersFromAPI = async (): Promise<Learner[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockLearners
}

const createLearnerAPI = async (learnerData: Omit<Learner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Learner> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const newLearner: Learner = {
    ...learnerData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return newLearner
}

const uploadLearnersAPI = async (file: File): Promise<Learner[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Simulate parsing CSV and creating learners
  const newLearners: Learner[] = [
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@enterprise.com',
      organization: 'Enterprise Solutions',
      organizationId: 'org-4',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalCourses: 0,
      completedCourses: 0
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@consulting.com',
      organization: 'Consulting Group',
      organizationId: 'org-5',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalCourses: 0,
      completedCourses: 0
    }
  ]
  
  return newLearners
}

export const useLearnersStore = create<LearnersStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        learners: [],
        selectedLearner: null,
        isLoading: false,
        error: null,
        totalCount: 0,

        // Actions
        setLearners: (learners) => {
          set({ learners, totalCount: learners.length }, false, 'setLearners')
        },

        addLearner: (learner) => {
          const { learners } = get()
          set({ 
            learners: [...learners, learner], 
            totalCount: learners.length + 1 
          }, false, 'addLearner')
        },

        updateLearner: (id, updates) => {
          const { learners } = get()
          const updatedLearners = learners.map(learner =>
            learner.id === id ? { ...learner, ...updates, updatedAt: new Date().toISOString() } : learner
          )
          set({ learners: updatedLearners }, false, 'updateLearner')
        },

        deleteLearner: (id) => {
          const { learners } = get()
          const filteredLearners = learners.filter(learner => learner.id !== id)
          set({ 
            learners: filteredLearners, 
            totalCount: filteredLearners.length 
          }, false, 'deleteLearner')
        },

        setSelectedLearner: (learner) => {
          set({ selectedLearner: learner }, false, 'setSelectedLearner')
        },

        setLoading: (loading) => {
          set({ isLoading: loading }, false, 'setLoading')
        },

        setError: (error) => {
          set({ error }, false, 'setError')
        },

        fetchLearners: async () => {
          set({ isLoading: true, error: null }, false, 'fetchLearners/start')
          
          try {
            const learners = await fetchLearnersFromAPI()
            set({ 
              learners, 
              totalCount: learners.length, 
              isLoading: false 
            }, false, 'fetchLearners/success')
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch learners',
              isLoading: false 
            }, false, 'fetchLearners/error')
          }
        },

        createLearner: async (learnerData) => {
          set({ isLoading: true, error: null }, false, 'createLearner/start')
          
          try {
            const newLearner = await createLearnerAPI(learnerData)
            const { learners } = get()
            set({ 
              learners: [...learners, newLearner], 
              totalCount: learners.length + 1,
              isLoading: false 
            }, false, 'createLearner/success')
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to create learner',
              isLoading: false 
            }, false, 'createLearner/error')
          }
        },

        uploadLearners: async (file) => {
          set({ isLoading: true, error: null }, false, 'uploadLearners/start')
          
          try {
            const newLearners = await uploadLearnersAPI(file)
            const { learners } = get()
            set({ 
              learners: [...learners, ...newLearners], 
              totalCount: learners.length + newLearners.length,
              isLoading: false 
            }, false, 'uploadLearners/success')
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to upload learners',
              isLoading: false 
            }, false, 'uploadLearners/error')
          }
        }
      }),
      {
        name: 'learners-storage',
        partialize: (state) => ({ 
          learners: state.learners,
          selectedLearner: state.selectedLearner,
          totalCount: state.totalCount
        })
      }
    ),
    {
      name: 'learners-store'
    }
  )
)
