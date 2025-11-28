import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create Supabase client - will be null if credentials are not configured
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && supabase !== null
}

// Types for our registration form
export interface RegistrationData {
  // Section 1: Personal Info
  full_name: string
  email: string
  phone: string
  college: string
  department: string
  semester: string
  
  // Section 2: Tools & Expertise
  primary_skillset: string
  git_proficiency: string
  technologies: string[]
  
  // Section 3: Analytical Questions
  why_join: string
  shipping_experience: string
  
  // Metadata
  created_at?: string
}
