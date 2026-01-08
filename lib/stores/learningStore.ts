import { create } from 'zustand'

interface LearningProgress {
  lessonId: string
  status: 'not_started' | 'in_progress' | 'completed'
  progress: number // 0-100
  lastPosition?: number // 動画/音声の最後の位置（秒）
}

interface LearningState {
  currentLesson: string | null
  progress: Record<string, LearningProgress>
  setCurrentLesson: (lessonId: string | null) => void
  updateProgress: (lessonId: string, progress: Partial<LearningProgress>) => void
  getProgress: (lessonId: string) => LearningProgress | null
}

export const useLearningStore = create<LearningState>((set, get) => ({
  currentLesson: null,
  progress: {},
  
  setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),
  
  updateProgress: (lessonId, progressUpdate) =>
    set((state) => ({
      progress: {
        ...state.progress,
        [lessonId]: {
          ...(state.progress[lessonId] || { lessonId, status: 'not_started', progress: 0 }),
          ...progressUpdate,
        },
      },
    })),
  
  getProgress: (lessonId) => get().progress[lessonId] || null,
}))


