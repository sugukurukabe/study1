'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VideoPlayer from './VideoPlayer'
import AudioPlayer from './AudioPlayer'
import { Card, CardContent } from '@/components/ui/card'
import { Video, Headphones, FileText } from 'lucide-react'

interface LessonTabsProps {
  lesson: {
    id: string
    title_ja: string
    cloudflare_video_id: string | null
    cloudflare_video_id_ja?: string | null
    cloudflare_video_id_id?: string | null
    cloudflare_video_id_vi?: string | null
    cloudflare_video_id_en?: string | null
    audio_storage_path: string | null
    audio_storage_path_ja?: string | null
    audio_storage_path_id?: string | null
    audio_storage_path_vi?: string | null
    audio_storage_path_en?: string | null
    content: any
  }
  onProgress: (time: number, type: 'video' | 'audio') => void
  startPosition?: number
}

export default function LessonTabs({ lesson, onProgress, startPosition = 0 }: LessonTabsProps) {
  // 言語別動画IDを集約（全言語で旧カラムをフォールバックに使用）
  const videoIds = {
    ja: lesson.cloudflare_video_id_ja || lesson.cloudflare_video_id || undefined,
    id: lesson.cloudflare_video_id_id || lesson.cloudflare_video_id || undefined,
    vi: lesson.cloudflare_video_id_vi || lesson.cloudflare_video_id || undefined,
    en: lesson.cloudflare_video_id_en || lesson.cloudflare_video_id || undefined,
  }

  // 言語別音声パスを集約（全言語で旧カラムをフォールバックに使用）
  const audioPaths = {
    ja: lesson.audio_storage_path_ja || lesson.audio_storage_path || undefined,
    id: lesson.audio_storage_path_id || lesson.audio_storage_path || undefined,
    vi: lesson.audio_storage_path_vi || lesson.audio_storage_path || undefined,
    en: lesson.audio_storage_path_en || lesson.audio_storage_path || undefined,
  }

  // 少なくとも1つの動画IDが存在するか
  const hasVideo = Object.values(videoIds).some(id => !!id)
  // 少なくとも1つの音声パスが存在するか
  const hasAudio = Object.values(audioPaths).some(path => !!path)

  return (
    <Tabs defaultValue="video" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="video" className="flex items-center space-x-2">
          <Video className="h-4 w-4" />
          <span>動画</span>
        </TabsTrigger>
        <TabsTrigger value="audio" className="flex items-center space-x-2">
          <Headphones className="h-4 w-4" />
          <span>音声</span>
        </TabsTrigger>
        <TabsTrigger value="text" className="flex items-center space-x-2">
          <FileText className="h-4 w-4" />
          <span>テキスト</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="video" className="mt-6">
        {hasVideo ? (
          <VideoPlayer
            videoIds={videoIds}
            onProgress={(time) => onProgress(time, 'video')}
            startTime={startPosition}
          />
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              動画コンテンツは準備中です
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="audio" className="mt-6">
        {hasAudio ? (
          <AudioPlayer
            lessonId={lesson.id}
            audioUrl={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audio/${audioPaths.ja || audioPaths.id || audioPaths.vi || audioPaths.en}`}
            title={lesson.title_ja}
            onProgress={(time) => onProgress(time, 'audio')}
            startTime={startPosition}
          />
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              音声コンテンツは準備中です
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="text" className="mt-6">
        <Card>
          <CardContent className="p-6 prose max-w-none">
            {lesson.content?.text ? (
              <div dangerouslySetInnerHTML={{ __html: lesson.content.text }} />
            ) : (
              <div className="py-12 text-center text-gray-500">
                テキストコンテンツは準備中です
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}


