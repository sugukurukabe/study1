'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Download,
  Loader2
} from 'lucide-react'
import { useOfflineStore } from '@/lib/stores/offlineStore'

interface AudioPlayerProps {
  lessonId: string
  audioUrl: string
  title: string
  onProgress?: (time: number) => void
  startTime?: number
}

export default function AudioPlayer({
  lessonId,
  audioUrl,
  title,
  onProgress,
  startTime = 0,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [downloading, setDownloading] = useState(false)
  
  const { isCached, addCachedLesson, isOnline } = useOfflineStore()
  const cached = isCached(lessonId)

  useEffect(() => {
    if (audioRef.current && startTime > 0) {
      audioRef.current.currentTime = startTime
    }
  }, [startTime])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      onProgress?.(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [onProgress])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds
    }
  }

  const handleDownload = async () => {
    if (!isOnline || downloading) return
    
    setDownloading(true)
    try {
      // Cache the audio file
      const cache = await caches.open('audio-lessons-v1')
      await cache.add(audioUrl)
      
      addCachedLesson({
        lessonId,
        audioUrl,
        cachedAt: Date.now(),
        size: 0, // Could calculate actual size
      })
    } catch (error) {
      console.error('Failed to cache audio:', error)
    } finally {
      setDownloading(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="p-6">
      <audio ref={audioRef} src={audioUrl} />
      
      <div className="mb-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = Number(e.target.value)
            }
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => skip(-15)}
          >
            <SkipBack className="h-4 w-4" />
            <span className="ml-1 text-xs">15s</span>
          </Button>
          
          <Button
            size="lg"
            onClick={togglePlay}
            className="rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => skip(15)}
          >
            <span className="mr-1 text-xs">15s</span>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-gray-600" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              const newVolume = Number(e.target.value)
              setVolume(newVolume)
              if (audioRef.current) {
                audioRef.current.volume = newVolume
              }
            }}
            className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          
          {!cached && isOnline && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          )}
          
          {cached && (
            <div className="text-xs text-green-600 flex items-center">
              <Download className="h-3 w-3 mr-1" />
              オフライン可
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}


