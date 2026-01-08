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
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'

export default function NewQuestionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    question_ja: '',
    options: { A: '', B: '', C: '', D: '' },
    correct_answer: 'A',
    explanation_ja: '',
    category: '',
    difficulty: 'medium',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    
    const { error } = await supabase.from('exam_questions').insert({
      id: formData.id,
      question_ja: formData.question_ja,
      options: formData.options,
      correct_answer: formData.correct_answer,
      explanation_ja: formData.explanation_ja,
      category: formData.category || null,
      difficulty: formData.difficulty,
    })

    if (error) {
      alert('エラー: ' + error.message)
      setLoading(false)
      return
    }

    router.push('/admin/questions')
    router.refresh()
  }

  return (
    <div>
      <Link href="/admin/questions">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          問題一覧に戻る
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>新しい試験問題を追加</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="id">問題ID *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="q-001"
                required
              />
            </div>

            <div>
              <Label htmlFor="question_ja">問題文 *</Label>
              <Textarea
                id="question_ja"
                value={formData.question_ja}
                onChange={(e) => setFormData({ ...formData, question_ja: e.target.value })}
                rows={4}
                required
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <Label>選択肢 *</Label>
              {Object.entries(formData.options).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <span className="font-bold w-8">{key}.</span>
                  <Input
                    value={value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        options: { ...formData.options, [key]: e.target.value },
                      })
                    }
                    placeholder={`選択肢${key}`}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="correct_answer">正解 *</Label>
                <Select
                  value={formData.correct_answer}
                  onValueChange={(value) => setFormData({ ...formData, correct_answer: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">カテゴリ</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="労働法、建設、介護など"
                />
              </div>

              <div>
                <Label htmlFor="difficulty">難易度</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">簡単</SelectItem>
                    <SelectItem value="medium">普通</SelectItem>
                    <SelectItem value="hard">難しい</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="explanation_ja">解説</Label>
              <Textarea
                id="explanation_ja"
                value={formData.explanation_ja}
                onChange={(e) => setFormData({ ...formData, explanation_ja: e.target.value })}
                rows={4}
                placeholder="正解の理由を詳しく説明..."
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


