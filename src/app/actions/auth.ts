'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function registerStudent(data: {
  email: string
  name: string
  enrollmentNumber: string
  faceScanBase64: string // data URL
  signatureBase64: string // data URL
}) {
  const { email, name, enrollmentNumber, faceScanBase64, signatureBase64 } = data

  // 1. Validate .edu email
  if (!email.toLowerCase().endsWith('.edu')) {
    return { success: false, error: 'You must use a valid .edu university email address.' }
  }

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

  // 2. Generate a temporary password (since we are faking OTP/Biometric for this demo)
  // In a real app, you would use supabase.auth.signInWithOtp()
  // But since the user wants a strict signup form, we create a user with a secure random password.
  const tempPassword = Math.random().toString(36).slice(-10) + 'A1!'

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: tempPassword,
    options: {
      data: { full_name: name }
    }
  })

  if (authError) {
    return { success: false, error: authError.message }
  }

  const userId = authData.user?.id
  if (!userId) {
    return { success: false, error: 'Failed to create user account.' }
  }

  try {
    // 3. Upload Face Scan to Storage
    let faceScanUrl = ''
    if (faceScanBase64) {
      const base64Data = faceScanBase64.split(',')[1]
      const buffer = Buffer.from(base64Data, 'base64')
      const fileName = `${userId}/face_scan_${Date.now()}.jpg`
      
      const { error: uploadError } = await supabase.storage
        .from('verification_documents')
        .upload(fileName, buffer, { contentType: 'image/jpeg' })

      if (uploadError) throw new Error(`Face upload failed: ${uploadError.message}`)
      
      faceScanUrl = supabase.storage.from('verification_documents').getPublicUrl(fileName).data.publicUrl
    }

    // 4. Upload Signature to Storage
    let signatureUrl = ''
    if (signatureBase64) {
      const base64Data = signatureBase64.split(',')[1]
      const buffer = Buffer.from(base64Data, 'base64')
      const fileName = `${userId}/signature_${Date.now()}.png`
      
      const { error: uploadError } = await supabase.storage
        .from('verification_documents')
        .upload(fileName, buffer, { contentType: 'image/png' })

      if (uploadError) throw new Error(`Signature upload failed: ${uploadError.message}`)
      
      signatureUrl = supabase.storage.from('verification_documents').getPublicUrl(fileName).data.publicUrl
    }

    // 5. Insert into profiles table
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      email: email,
      full_name: name,
      enrollment_number: enrollmentNumber,
      face_scan_url: faceScanUrl,
      signature_url: signatureUrl,
      verification_status: 'pending',
      is_verified_student: false
    })

    if (profileError) {
      throw new Error(`Profile creation failed: ${profileError.message}`)
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
