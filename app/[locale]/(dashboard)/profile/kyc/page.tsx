'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import CardUploader from '@/components/kyc/CardUploader'
import { Shield, AlertCircle, CheckCircle2, Clock } from 'lucide-react'

export default function KYCPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [hasDriversLicense, setHasDriversLicense] = useState(false)
  const [frontUploaded, setFrontUploaded] = useState(false)
  const [backUploaded, setBackUploaded] = useState(false)
  const [kycStatus, setKYCStatus] = useState<'none' | 'pending' | 'verified' | 'rejected'>('none')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadKYCStatus()
  }, [])

  const loadKYCStatus = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    const { data: docs } = await supabase
      .from('kyc_documents')
      .select('*')
      .eq('user_id', user.id)

    if (docs && docs.length > 0) {
      const frontDoc = docs.find(d => d.doc_type === 'residence_card_front')
      const backDoc = docs.find(d => d.doc_type === 'residence_card_back')
      
      setFrontUploaded(!!frontDoc)
      setBackUploaded(!!backDoc)
      
      if (frontDoc) {
        setKYCStatus(frontDoc.status as any)
        setHasDriversLicense(frontDoc.has_drivers_license || false)
      }
    }
    
    setLoading(false)
  }

  const handleUpload = async (file: File, docType: 'residence_card_front' | 'residence_card_back') => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    // Upload to Supabase Storage (private bucket)
    const fileName = `${user.id}/${docType}_${Date.now()}.${file.name.split('.').pop()}`
    const { error: uploadError } = await supabase.storage
      .from('kyc-documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      throw uploadError
    }

    // Create KYC document record
    const { error: dbError } = await supabase
      .from('kyc_documents')
      .insert({
        user_id: user.id,
        doc_type: docType,
        storage_path: fileName,
        status: 'pending',
        has_drivers_license: docType === 'residence_card_front' ? hasDriversLicense : null
      })

    if (dbError) {
      console.error('DB error:', dbError)
      throw dbError
    }

    if (docType === 'residence_card_front') {
      setFrontUploaded(true)
    } else {
      setBackUploaded(true)
    }
  }

  const handleSubmit = async () => {
    if (!frontUploaded || !backUploaded) {
      alert('両面の画像をアップロードしてください')
      return
    }

    setSubmitting(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    // Update documents to pending status
    await supabase
      .from('kyc_documents')
      .update({ 
        status: 'pending',
        has_drivers_license: hasDriversLicense 
      })
      .eq('user_id', user.id)
      .eq('doc_type', 'residence_card_front')

    setKYCStatus('pending')
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          本人確認 (KYC)
        </h1>
        <p className="text-gray-600">
          在留カードをアップロードして、すべての機能を解放しましょう
        </p>
      </div>

      {/* Status Card */}
      {kycStatus !== 'none' && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              {kycStatus === 'pending' && (
                <>
                  <Clock className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900">審査中</p>
                    <p className="text-sm text-amber-800">
                      通常24時間以内に審査が完了します
                    </p>
                  </div>
                </>
              )}
              {kycStatus === 'verified' && (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">承認済み</p>
                    <p className="text-sm text-green-800">
                      本人確認が完了しました。すべての機能が利用可能です。
                    </p>
                  </div>
                </>
              )}
              {kycStatus === 'rejected' && (
                <>
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">却下されました</p>
                    <p className="text-sm text-red-800">
                      書類を再アップロードしてください
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <Shield className="h-5 w-5" />
            <span>プライバシーとセキュリティ</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 space-y-2 text-sm">
          <p>• アップロードされた画像は暗号化されて保存されます</p>
          <p>• あなたと管理者のみがアクセスできます</p>
          <p>• 審査完了後、画像は安全に削除されます</p>
          <p>• 個人情報は厳重に管理されます</p>
        </CardContent>
      </Card>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CardUploader
          title="在留カード - 表面"
          docType="residence_card_front"
          onUpload={(file) => handleUpload(file, 'residence_card_front')}
        />
        
        <CardUploader
          title="在留カード - 裏面"
          docType="residence_card_back"
          onUpload={(file) => handleUpload(file, 'residence_card_back')}
        />
      </div>

      {/* Driver's License */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="driversLicense"
              checked={hasDriversLicense}
              onCheckedChange={(checked) => setHasDriversLicense(checked as boolean)}
              disabled={kycStatus === 'pending'}
            />
            <label
              htmlFor="driversLicense"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              運転免許証を持っています
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      {kycStatus === 'none' || kycStatus === 'rejected' ? (
        <Button
          onClick={handleSubmit}
          disabled={!frontUploaded || !backUploaded || submitting}
          size="lg"
          className="w-full"
        >
          {submitting ? '送信中...' : '審査を申請'}
        </Button>
      ) : kycStatus === 'verified' ? (
        <Button
          onClick={() => router.push('/profile')}
          size="lg"
          className="w-full"
        >
          プロフィールに戻る
        </Button>
      ) : null}
    </div>
  )
}


