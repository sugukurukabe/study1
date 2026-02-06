'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react'
import { useParams } from 'next/navigation'

interface VideoPlayerProps {
  videoIds: {
    ja?: string
    id?: string
    vi?: string
    en?: string
  }
  onProgress?: (time: number) => void
  startTime?: number
}

export default function VideoPlayer({
  videoIds,
  onProgress,
  startTime = 0,
}: VideoPlayerProps) {
  const params = useParams()
  const currentLocale = (params.locale as string) || 'ja'
  
  // 現在の言語の動画IDを取得、なければ日本語版にフォールバック、それもなければ最初に見つかったIDを使用
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale)
  const cloudflareVideoId = videoIds[selectedLanguage as keyof typeof videoIds] || videoIds.ja || Object.values(videoIds).find(id => id) || ''
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  useEffect(() => {
    if (videoRef.current && startTime > 0) {
      videoRef.current.currentTime = startTime
    }
  }, [startTime])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      onProgress?.(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [onProgress])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackSpeed(speed)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Cloudflare Stream のビデオURL
  const videoUrl = `https://videodelivery.net/${cloudflareVideoId}/manifest/video.m3u8`

  // 利用可能な言語のリスト
  const availableLanguages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵', available: !!videoIds.ja },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩', available: !!videoIds.id },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', available: !!videoIds.vi },
    { code: 'en', name: 'English', flag: '🇺🇸', available: !!videoIds.en },
  ].filter(lang => lang.available)

  const handleLanguageChange = (langCode: string) => {
    const currentTime = videoRef.current?.currentTime || 0
    setSelectedLanguage(langCode)
    // 動画を切り替えた後、同じ位置から再生
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime
        if (isPlaying) {
          videoRef.current.play()
        }
      }
    }, 100)
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {/* 言語切り替えボタン（動画上部） */}
      {availableLanguages.length > 1 && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-3">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {availableLanguages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                size="sm"
                variant={selectedLanguage === lang.code ? 'default' : 'secondary'}
                className={`
                  min-w-[100px] h-10 text-sm font-medium transition-all
                  ${selectedLanguage === lang.code 
                    ? 'bg-white text-black hover:bg-gray-200 shadow-lg scale-105' 
                    : 'bg-black/50 text-white hover:bg-black/70 border border-white/30'
                  }
                `}
              >
                <span className="mr-1.5 text-base">{lang.flag}</span>
                <span className="hidden sm:inline">{lang.name}</span>
                <span className="sm:hidden">{lang.code.toUpperCase()}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {cloudflareVideoId ? (
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video"
          onClick={togglePlay}
          key={cloudflareVideoId}
        >
          <source src={videoUrl} type="application/x-mpegURL" />
          お使いのブラウザは動画タグに対応していません。
        </video>
      ) : (
        <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <p className="text-xl mb-2">動画が見つかりません</p>
            <p className="text-sm text-gray-400">このレッスンの動画はまだアップロードされていません</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = Number(e.target.value)
              }
            }}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            <div className="flex items-center space-x-1">
              {[0.75, 1, 1.25, 1.5].map((speed) => (
                <Button
                  key={speed}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSpeedChange(speed)}
                  className={`text-white text-xs hover:bg-white/20 ${
                    playbackSpeed === speed ? 'bg-white/30' : ''
                  }`}
                >
                  {speed}x
                </Button>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleFullscreen}
            className="text-white hover:bg-white/20"
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}


