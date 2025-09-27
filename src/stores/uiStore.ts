import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { UIState, UIActions, Notification } from '@/types/store'

const generateNotificationId = (): string => {
  return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Extended UI actions with optional read property
interface ExtendedUIActions extends Omit<UIActions, 'addNotification'> {
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
}

export const useUIStore = create<UIState & ExtendedUIActions>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        sidebarOpen: true,
        theme: 'system',
        loading: false,
        notifications: [],
        modals: {
          addCourse: false,
          addOrganization: false,
          uploadLearners: false,
          certificatePreview: false,
          learnersSidePanel: false
        },
        filters: {
          search: '',
          organization: 'All',
          course: 'All',
          completionStatus: [],
          certificateStatus: [],
          dateRange: {
            startDate: '',
            endDate: ''
          }
        },
        pagination: {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: 0
        },

        // Actions
        setSidebarOpen: (open) => {
          set({ sidebarOpen: open }, false, 'setSidebarOpen')
        },

        setTheme: (theme) => {
          set({ theme }, false, 'setTheme')
          
          // Apply theme to document
          if (typeof window !== 'undefined') {
            const root = window.document.documentElement
            root.classList.remove('light', 'dark')
            
            if (theme === 'system') {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
              root.classList.add(systemTheme)
            } else {
              root.classList.add(theme)
            }
          }
        },

        setLoading: (loading) => {
          set({ loading }, false, 'setLoading')
        },

        addNotification: (notification) => {
          const newNotification: Notification = {
            ...notification,
            id: generateNotificationId(),
            timestamp: new Date().toISOString(),
            read: false
          }
          
          const { notifications } = get()
          set({ 
            notifications: [newNotification, ...notifications] 
          }, false, 'addNotification')
          
          // Auto-remove success notifications after 5 seconds
          if (notification.type === 'success') {
            setTimeout(() => {
              get().removeNotification(newNotification.id)
            }, 5000)
          }
        },

        removeNotification: (id) => {
          const { notifications } = get()
          set({ 
            notifications: notifications.filter(n => n.id !== id) 
          }, false, 'removeNotification')
        },

        markNotificationAsRead: (id) => {
          const { notifications } = get()
          set({ 
            notifications: notifications.map(n => 
              n.id === id ? { ...n, read: true } : n
            ) 
          }, false, 'markNotificationAsRead')
        },

        clearNotifications: () => {
          set({ notifications: [] }, false, 'clearNotifications')
        },

        setModalOpen: (modal, open) => {
          const { modals } = get()
          set({ 
            modals: { ...modals, [modal]: open } 
          }, false, 'setModalOpen')
        },

        setFilter: (filter, value) => {
          const { filters } = get()
          set({ 
            filters: { ...filters, [filter]: value } 
          }, false, 'setFilter')
        },

        setPagination: (pagination) => {
          const { pagination: currentPagination } = get()
          set({ 
            pagination: { ...currentPagination, ...pagination } 
          }, false, 'setPagination')
        },

        resetFilters: () => {
          set({ 
            filters: {
              search: '',
              organization: 'All',
              course: 'All',
              completionStatus: [],
              certificateStatus: [],
              dateRange: {
                startDate: '',
                endDate: ''
              }
            },
            pagination: {
              currentPage: 1,
              itemsPerPage: 10,
              totalItems: 0
            }
          }, false, 'resetFilters')
        }
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ 
          sidebarOpen: state.sidebarOpen,
          theme: state.theme,
          modals: state.modals,
          filters: state.filters,
          pagination: state.pagination
        })
      }
    ),
    {
      name: 'ui-store'
    }
  )
)
