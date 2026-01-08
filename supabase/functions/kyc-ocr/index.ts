import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { documentId } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get document
    const { data: doc } = await supabaseClient
      .from('kyc_documents')
      .select('*')
      .eq('id', documentId)
      .single()

    if (!doc) {
      throw new Error('Document not found')
    }

    // Download image from storage
    const { data: fileData } = await supabaseClient.storage
      .from('kyc-documents')
      .download(doc.storage_path)

    if (!fileData) {
      throw new Error('Failed to download file')
    }

    // Convert to base64
    const buffer = await fileData.arrayBuffer()
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(buffer)))

    // Call Google Vision API
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${Deno.env.get('GOOGLE_VISION_API_KEY')}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: 'TEXT_DETECTION' }],
            },
          ],
        }),
      }
    )

    const visionData = await visionResponse.json()
    const textAnnotations = visionData.responses[0]?.textAnnotations || []

    const ocrData = {
      fullText: textAnnotations[0]?.description || '',
      annotations: textAnnotations.slice(1).map((a: any) => ({
        text: a.description,
        confidence: a.confidence,
      })),
      extractedAt: new Date().toISOString(),
    }

    // Update document with OCR data
    await supabaseClient
      .from('kyc_documents')
      .update({ ocr_data: ocrData })
      .eq('id', documentId)

    return new Response(
      JSON.stringify({ success: true, ocrData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})


