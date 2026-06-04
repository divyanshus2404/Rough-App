'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createListing(data: {
  title: string
  categoryId: string
  condition: string
  description: string
  price: number
  currency: string
  isSwapOpen: boolean
  swapPreferences: string[]
  images: string[]
}) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  )

  // Get current logged in user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('You must be logged in to create a listing. (Or Supabase is not configured).')
  }

  // Get Category UUID by slug (since the frontend passes slugs like 'electronics')
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', data.categoryId)
    .single()
    
  if (!categoryData) {
    throw new Error('Invalid category selected.')
  }

  // Insert into listings
  const { data: listingData, error: insertError } = await supabase
    .from('listings')
    .insert({
      seller_id: user.id,
      category_id: categoryData.id,
      title: data.title,
      description: data.description,
      price: data.price,
      currency: data.currency,
      condition: data.condition,
      is_swap_open: data.isSwapOpen,
      swap_preferences: data.swapPreferences,
      images: data.images,
      status: 'active'
    })
    .select()
    .single()

  if (insertError) {
    throw new Error(insertError.message)
  }

  return { success: true, listingId: listingData.id }
}
