import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Course, CoursesStore } from '@/types/store'

// Mock API functions (replace with real API calls)
const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Advanced React Development',
    courseId: 'REACT-ADV-001',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
    totalLearners: 45,
    completedLearners: 32
  },
  {
    id: '2',
    name: 'JavaScript Fundamentals',
    courseId: 'JS-FUND-001',
    status: 'active',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-18T00:00:00Z',
    totalLearners: 38,
    completedLearners: 28
  },
  {
    id: '3',
    name: 'Node.js Backend Development',
    courseId: 'NODE-BACK-001',
    status: 'active',
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-02-21T00:00:00Z',
    totalLearners: 29,
    completedLearners: 18
  }
]

const fetchCoursesFromAPI = async (): Promise<Course[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockCourses
}

const createCourseAPI = async (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const newCourse: Course = {
    ...courseData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return newCourse
}

export const useCoursesStore = create<CoursesStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        courses: [],
        selectedCourse: null,
        isLoading: false,
        error: null,
        totalCount: 0,

        // Actions
        setCourses: (courses) => {
          set({ courses, totalCount: courses.length }, false, 'setCourses')
        },

        addCourse: (course) => {
          const { courses } = get()
          set({ 
            courses: [...courses, course], 
            totalCount: courses.length + 1 
          }, false, 'addCourse')
        },

        updateCourse: (id, updates) => {
          const { courses } = get()
          const updatedCourses = courses.map(course =>
            course.id === id ? { ...course, ...updates, updatedAt: new Date().toISOString() } : course
          )
          set({ courses: updatedCourses }, false, 'updateCourse')
        },

        deleteCourse: (id) => {
          const { courses } = get()
          const filteredCourses = courses.filter(course => course.id !== id)
          set({ 
            courses: filteredCourses, 
            totalCount: filteredCourses.length 
          }, false, 'deleteCourse')
        },

        setSelectedCourse: (course) => {
          set({ selectedCourse: course }, false, 'setSelectedCourse')
        },

        setLoading: (loading) => {
          set({ isLoading: loading }, false, 'setLoading')
        },

        setError: (error) => {
          set({ error }, false, 'setError')
        },

        fetchCourses: async () => {
          set({ isLoading: true, error: null }, false, 'fetchCourses/start')
          
          try {
            const courses = await fetchCoursesFromAPI()
            set({ 
              courses, 
              totalCount: courses.length, 
              isLoading: false 
            }, false, 'fetchCourses/success')
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch courses',
              isLoading: false 
            }, false, 'fetchCourses/error')
          }
        },

        createCourse: async (courseData) => {
          set({ isLoading: true, error: null }, false, 'createCourse/start')
          
          try {
            const newCourse = await createCourseAPI(courseData)
            const { courses } = get()
            set({ 
              courses: [...courses, newCourse], 
              totalCount: courses.length + 1,
              isLoading: false 
            }, false, 'createCourse/success')
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to create course',
              isLoading: false 
            }, false, 'createCourse/error')
          }
        }
      }),
      {
        name: 'courses-storage',
        partialize: (state) => ({ 
          courses: state.courses,
          selectedCourse: state.selectedCourse,
          totalCount: state.totalCount
        })
      }
    ),
    {
      name: 'courses-store'
    }
  )
)
