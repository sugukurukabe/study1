'use client'

import { useState } from 'react'
import { Play, X } from 'lucide-react'

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

  // Cloudflare Stream アカウントID
  const accountId = '7h7i3oj7pv51qq1p'

  // サムネイルURL
  const thumbnailUrl = `https://customer-${accountId}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg?time=&height=600`

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video max-w-3xl mx-auto">
      {!isPlaying ? (
        // サムネイルと再生ボタン
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          {/* サムネイル画像 */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/40" />

          {/* 再生ボタン */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all group-hover:scale-110">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </div>

          {/* タイトルとサブタイトル */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
            <p className="text-white/70 text-sm">{subtitle}</p>
          </div>
        </div>
      ) : (
        // 動画プレイヤー（iframe）
        <div className="absolute inset-0">
          <iframe
            src={`https://customer-${accountId}.cloudflarestream.com/${videoId}/iframe?autoplay=true`}
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
          />

          {/* 閉じるボタン */}
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
