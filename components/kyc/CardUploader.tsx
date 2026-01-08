'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

interface CardUploaderProps {
  title: string
  docType: 'residence_card_front' | 'residence_card_back'
  onUpload: (file: File) => Promise<void>
  existingImageUrl?: string
}

export default function CardUploader({ 
  title, 
  docType, 
  onUpload, 
  existingImageUrl 
}: CardUploaderProps) {
  const [preview, setPreview] = useState<string | null>(existingImageUrl || null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(!!existingImageUrl)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    try {
      await onUpload(file)
      setUploaded(true)
    } catch (error) {
      console.error('Upload failed:', error)
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: uploading || uploaded
  })

  const handleRemove = () => {
    setPreview(null)
    setUploaded(false)
  }

  return (
    <Card className="p-6">
      <h3 className="font-medium text-lg mb-4">{title}</h3>
      
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          <input {...getInputProps()} />
          
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          
          {isDragActive ? (
            <p className="text-indigo-600">ここにドロップしてください</p>
          ) : (
            <div>
              <p className="text-gray-700 mb-2">
                クリックまたはドラッグ&ドロップでアップロード
              </p>
              <p className="text-sm text-gray-500">
                JPEG, PNG, WEBP (最大 10MB)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
          
          {uploading && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
          
          {uploaded && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">アップロード完了</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
              >
                <X className="h-4 w-4 mr-1" />
                削除
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}


