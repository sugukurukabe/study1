import { create } from 'zustand'

interface CachedLesson {
  lessonId: string
  audioUrl: string
  cachedAt: number
  size: number
}

interface OfflineState {
  isOnline: boolean
  cachedLessons: Record<string, CachedLesson>
  setOnlineStatus: (status: boolean) => void
  addCachedLesson: (lesson: CachedLesson) => void
  removeCachedLesson: (lessonId: string) => void
  isCached: (lessonId: string) => boolean
}

export const useOfflineStore = create<OfflineState>((set, get) => ({
  isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
  cachedLessons: {},
  
  setOnlineStatus: (status) => set({ isOnline: status }),
  
  addCachedLesson: (lesson) =>
    set((state) => ({
      cachedLessons: {
        ...state.cachedLessons,
        [lesson.lessonId]: lesson,
      },
    })),
  
  removeCachedLesson: (lessonId) =>
    set((state) => {
      const { [lessonId]: removed, ...rest } = state.cachedLessons
      return { cachedLessons: rest }
    }),
  
  isCached: (lessonId) => !!get().cachedLessons[lessonId],
}))

// オンライン/オフライン状態の監視
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useOfflineStore.getState().setOnlineStatus(true)
  })
  
  window.addEventListener('offline', () => {
    useOfflineStore.getState().setOnlineStatus(false)
  })
}


