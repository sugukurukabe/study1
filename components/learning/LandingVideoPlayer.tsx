'use client'

import { useState, useCallback } from 'react'
import { Play, X, ExternalLink } from 'lucide-react'

interface LandingVideoPlayerProps {
  videoId: string
  title: string
  subtitle: string
}

export default function LandingVideoPlayer({
  videoId,
  title,
  subtitle,
}: LandingVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Cloudflare Stream アカウントID
  const accountId = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID || '933b96ef9d4f85409bc15a4935369fcf'

  // サムネイルURL
  const thumbnailUrl = `https://customer-${accountId}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg?time=0s&height=720`

  // 動画再生URL
  const videoSrc = `https://customer-${accountId}.cloudflarestream.com/${videoId}/iframe?autoplay=true&poster=${encodeURIComponent(thumbnailUrl)}`

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(false)
  }, [])

  const handleThumbnailError = useCallback(() => {
    setError(true)
  }, [])

  if (isPlaying) {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video max-w-3xl mx-auto">
        <iframe
          src={videoSrc}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          title={title}
        />
        {/* 閉じるボタン */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="動画プレイヤー閉じる"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    )
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video max-w-3xl mx-auto cursor-pointer group"
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
    >
      {/* サムネイル画像 */}
      {!error ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={handleThumbnailError}
          loading="eager"
        />
      ) : (
        // サムネイル読み込みエラーのフォールバック
        <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center">
          <div className="text-center text-white/80">
            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-sm">動画プレビュー</p>
          </div>
        </div>
      )}

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/50 to-black/60" />

      {/* フローティングパーティクル効果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* 再生ボタン */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative">
          {/* グロー効果 */}
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />

          {/* 外リング */}
          <div className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:scale-110">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </div>
        </div>
      </div>

      {/* タイトルとサブタイトル */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h3 className="text-white text-xl font-bold mb-2 drop-shadow-lg">{title}</h3>
        <p className="text-white/80 text-sm drop-shadow-md">{subtitle}</p>
      </div>

      {/* 右上のリンクアイコン */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <ExternalLink className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  )
}
