'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, XCircle, User, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

interface KYCDocument {
  id: string
  user_id: string
  doc_type: string
  storage_path: string
  has_drivers_license: boolean
  status: string
  ocr_data: any
  created_at: string
  profiles: {
    full_name: string
    nationality: string
    prefecture: string
  }
}

export default function AdminKYCPage() {
  const [documents, setDocuments] = useState<KYCDocument[]>([])
  const [selectedDoc, setSelectedDoc] = useState<KYCDocument | null>(null)
  const [imageUrls, setImageUrls] = useState<{ front: string; back: string } | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    const supabase = createClient()
    
    // Get pending KYC documents
    const { data } = await supabase
      .from('kyc_documents')
      .select(`
        *,
        profiles(full_name, nationality, prefecture)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (data) {
      // Group by user_id
      const grouped = new Map<string, KYCDocument[]>()
      data.forEach(doc => {
        if (!grouped.has(doc.user_id)) {
          grouped.set(doc.user_id, [])
        }
        grouped.get(doc.user_id)!.push(doc)
      })
      
      // Take only front documents for list
      const frontDocs = Array.from(grouped.values())
        .map(docs => docs.find(d => d.doc_type === 'residence_card_front'))
        .filter(Boolean) as KYCDocument[]
      
      setDocuments(frontDocs)
    }
    
    setLoading(false)
  }

  const loadImageUrls = async (userId: string) => {
    const supabase = createClient()
    
    const { data: docs } = await supabase
      .from('kyc_documents')
      .select('*')
      .eq('user_id', userId)

    if (!docs) return

    const frontDoc = docs.find(d => d.doc_type === 'residence_card_front')
    const backDoc = docs.find(d => d.doc_type === 'residence_card_back')

    if (frontDoc && backDoc) {
      const { data: frontUrl } = await supabase.storage
        .from('kyc-documents')
        .createSignedUrl(frontDoc.storage_path, 3600)
      
      const { data: backUrl } = await supabase.storage
        .from('kyc-documents')
        .createSignedUrl(backDoc.storage_path, 3600)

      if (frontUrl && backUrl) {
        setImageUrls({
          front: frontUrl.signedUrl,
          back: backUrl.signedUrl
        })
      }
    }
  }

  const handleSelect = (doc: KYCDocument) => {
    setSelectedDoc(doc)
    loadImageUrls(doc.user_id)
  }

  const handleApprove = async () => {
    if (!selectedDoc) return

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    // Update documents status
    await supabase
      .from('kyc_documents')
      .update({
        status: 'verified',
        verified_at: new Date().toISOString(),
        verified_by: user.id
      })
      .eq('user_id', selectedDoc.user_id)

    // Update user tier
    await supabase
      .from('profiles')
      .update({ current_tier: 3 })
      .eq('id', selectedDoc.user_id)

    // Reload
    setSelectedDoc(null)
    setImageUrls(null)
    loadDocuments()
  }

  const handleReject = async () => {
    if (!selectedDoc || !rejectionReason) return

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    await supabase
      .from('kyc_documents')
      .update({
        status: 'rejected',
        rejection_reason: rejectionReason,
        verified_by: user.id
      })
      .eq('user_id', selectedDoc.user_id)

    setSelectedDoc(null)
    setImageUrls(null)
    setRejectionReason('')
    loadDocuments()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          KYC審査管理
        </h1>
        <p className="text-gray-600">
          未審査: {documents.length}件
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Documents List */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className={`cursor-pointer transition-shadow hover:shadow-md ${
                selectedDoc?.id === doc.id ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => handleSelect(doc)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{doc.profiles.full_name}</p>
                    <p className="text-sm text-gray-600">{doc.profiles.nationality}</p>
                  </div>
                  <Badge variant="outline">pending</Badge>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(doc.created_at).toLocaleString('ja-JP')}
                </p>
              </CardContent>
            </Card>
          ))}

          {documents.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                審査待ちの申請はありません
              </CardContent>
            </Card>
          )}
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-2">
          {selectedDoc && imageUrls ? (
            <Card>
              <CardHeader>
                <CardTitle>審査詳細</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{selectedDoc.profiles.full_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{selectedDoc.profiles.prefecture}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">
                      {new Date(selectedDoc.created_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={selectedDoc.has_drivers_license ? 'default' : 'outline'}>
                      運転免許: {selectedDoc.has_drivers_license ? 'あり' : 'なし'}
                    </Badge>
                  </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">表面</p>
                    <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={imageUrls.front}
                        alt="Front"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">裏面</p>
                    <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={imageUrls.back}
                        alt="Back"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* OCR Data */}
                {selectedDoc.ocr_data && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">OCR抽出データ</p>
                    <pre className="text-xs text-gray-700">
                      {JSON.stringify(selectedDoc.ocr_data, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Rejection Reason */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    却下理由（却下する場合のみ）
                  </label>
                  <Textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="画像が不鮮明、有効期限切れなど"
                    rows={3}
                  />
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button
                    onClick={handleApprove}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    承認
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="destructive"
                    className="flex-1"
                    size="lg"
                    disabled={!rejectionReason}
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    却下
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                左側のリストから申請を選択してください
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


