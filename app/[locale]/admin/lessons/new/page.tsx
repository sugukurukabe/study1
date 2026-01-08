'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewLessonPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    title_ja: '',
    title_vi: '',
    title_id: '',
    title_en: '',
    description_ja: '',
    description_vi: '',
    description_id: '',
    description_en: '',
    cloudflare_video_id: '',
    audio_storage_path: '',
    content_text: '',
    required_tier: '1',
    duration_seconds: '',
    order_index: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    
    const { error } = await supabase.from('lessons').insert({
      id: formData.id,
      title_ja: formData.title_ja,
      title_vi: formData.title_vi || null,
      title_id: formData.title_id || null,
      title_en: formData.title_en || null,
      description_ja: formData.description_ja || null,
      description_vi: formData.description_vi || null,
      description_id: formData.description_id || null,
      description_en: formData.description_en || null,
      cloudflare_video_id: formData.cloudflare_video_id || null,
      audio_storage_path: formData.audio_storage_path || null,
      content: { text: formData.content_text },
      required_tier: parseInt(formData.required_tier),
      duration_seconds: formData.duration_seconds ? parseInt(formData.duration_seconds) : null,
      order_index: formData.order_index ? parseInt(formData.order_index) : null,
    })

    if (error) {
      alert('エラー: ' + error.message)
      setLoading(false)
      return
    }

    router.push('/admin/lessons')
    router.refresh()
  }

  return (
    <div>
      <Link href="/admin/lessons">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          レッスン一覧に戻る
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>新しいレッスンを追加</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">基本情報</h3>
              
              <div>
                <Label htmlFor="id">レッスンID *</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="lesson-001"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  例: lesson-001, lesson-construction-001
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="required_tier">必要Tier *</Label>
                  <Select
                    value={formData.required_tier}
                    onValueChange={(value) => setFormData({ ...formData, required_tier: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Tier 1 (無料)</SelectItem>
                      <SelectItem value="2">Tier 2 (プレミアム)</SelectItem>
                      <SelectItem value="3">Tier 3 (認証済み)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration_seconds">時間（秒）</Label>
                  <Input
                    id="duration_seconds"
                    type="number"
                    value={formData.duration_seconds}
                    onChange={(e) => setFormData({ ...formData, duration_seconds: e.target.value })}
                    placeholder="900"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    例: 900秒 = 15分
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="order_index">表示順序</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: e.target.value })}
                  placeholder="1"
                />
              </div>
            </div>

            {/* Titles */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">タイトル（多言語）</h3>
              
              <div>
                <Label htmlFor="title_ja">日本語タイトル *</Label>
                <Input
                  id="title_ja"
                  value={formData.title_ja}
                  onChange={(e) => setFormData({ ...formData, title_ja: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title_vi">ベトナム語</Label>
                  <Input
                    id="title_vi"
                    value={formData.title_vi}
                    onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="title_id">インドネシア語</Label>
                  <Input
                    id="title_id"
                    value={formData.title_id}
                    onChange={(e) => setFormData({ ...formData, title_id: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="title_en">英語</Label>
                  <Input
                    id="title_en"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">説明</h3>
              
              <div>
                <Label htmlFor="description_ja">日本語説明</Label>
                <Textarea
                  id="description_ja"
                  value={formData.description_ja}
                  onChange={(e) => setFormData({ ...formData, description_ja: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="description_vi">ベトナム語</Label>
                  <Textarea
                    id="description_vi"
                    value={formData.description_vi}
                    onChange={(e) => setFormData({ ...formData, description_vi: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="description_id">インドネシア語</Label>
                  <Textarea
                    id="description_id"
                    value={formData.description_id}
                    onChange={(e) => setFormData({ ...formData, description_id: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="description_en">英語</Label>
                  <Textarea
                    id="description_en"
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">メディアファイル</h3>
              
              <div>
                <Label htmlFor="cloudflare_video_id">Cloudflare Stream Video ID</Label>
                <Input
                  id="cloudflare_video_id"
                  value={formData.cloudflare_video_id}
                  onChange={(e) => setFormData({ ...formData, cloudflare_video_id: e.target.value })}
                  placeholder="abc123def456"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Cloudflare Streamにアップロード後、Video IDをここに入力
                </p>
              </div>

              <div>
                <Label htmlFor="audio_storage_path">音声ファイルパス（Supabase Storage）</Label>
                <Input
                  id="audio_storage_path"
                  value={formData.audio_storage_path}
                  onChange={(e) => setFormData({ ...formData, audio_storage_path: e.target.value })}
                  placeholder="lessons/lesson-001.mp3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supabase Storageの「audio」バケットにアップロード後、パスを入力
                </p>
              </div>
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content_text">テキストコンテンツ（HTML可）</Label>
              <Textarea
                id="content_text"
                value={formData.content_text}
                onChange={(e) => setFormData({ ...formData, content_text: e.target.value })}
                rows={10}
                placeholder="<h2>レッスン内容</h2><p>ここに内容を記載...</p>"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                キャンセル
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? '保存中...' : '保存'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


