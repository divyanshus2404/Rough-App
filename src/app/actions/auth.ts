'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function completeVerification(data: {
  enrollmentNumber: string
  faceScanBase64: string // data URL
  signatureBase64: string // data URL
}) {
  const { enrollmentNumber, faceScanBase64, signatureBase64 } = data

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch { }
        },
      },
    }
  )

  // Get current logged-in user (from Google OAuth)
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return { success: false, error: 'You must be logged in to complete verification.' }
  }

  // Ensure email is .edu
  if (!user.email?.toLowerCase().endsWith('.edu')) {
    return { success: false, error: 'You must use a valid .edu university email address with your Google account.' }
  }

  try {
    // 1. Upload Face Scan to Storage
    let faceScanUrl = ''
    if (faceScanBase64) {
      const base64Data = faceScanBase64.split(',')[1]
      const buffer = Buffer.from(base64Data, 'base64')
      const fileName = `${user.id}/face_scan_${Date.now()}.jpg`
      
      const { error: uploadError } = await supabase.storage
        .from('verification_documents')
        .upload(fileName, buffer, { contentType: 'image/jpeg' })

      if (uploadError) throw new Error(`Face upload failed: ${uploadError.message}`)
      
      faceScanUrl = supabase.storage.from('verification_documents').getPublicUrl(fileName).data.publicUrl
    }

    // 2. Upload Signature to Storage
    let signatureUrl = ''
    if (signatureBase64) {
      const base64Data = signatureBase64.split(',')[1]
      const buffer = Buffer.from(base64Data, 'base64')
      const fileName = `${user.id}/signature_${Date.now()}.png`
      
      const { error: uploadError } = await supabase.storage
        .from('verification_documents')
        .upload(fileName, buffer, { contentType: 'image/png' })

      if (uploadError) throw new Error(`Signature upload failed: ${uploadError.message}`)
      
      signatureUrl = supabase.storage.from('verification_documents').getPublicUrl(fileName).data.publicUrl
    }

    // 3. Update the existing profile record (which was auto-created by the Postgres trigger)
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        enrollment_number: enrollmentNumber,
        face_scan_url: faceScanUrl,
        signature_url: signatureUrl,
        verification_status: 'pending'
      })
      .eq('id', user.id)

    if (updateError) {
      throw new Error(`Failed to update profile: ${updateError.message}`)
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
