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

// Types for our registration form (Workshop - keeping for backward compatibility)
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

// Types for Hackathon Registration
export interface HackathonTeam {
  id?: string
  team_name: string
  team_code?: string
  idea_title: string
  idea_description: string
  idea_category: string
  created_by_email: string
  member_count?: number
  is_complete?: boolean
  status?: string // Status field for admin (pending, approved, rejected, etc.)
  created_at?: string
}

export interface HackathonRegistration {
  id?: string
  // Personal Information
  full_name: string
  email: string
  phone: string
  college: string
  department: string
  semester: string
  
  // Team Information
  team_id?: string
  is_team_leader: boolean
  
  // Terms
  terms_accepted: boolean
  
  // Metadata
  created_at?: string
}

// Combined form data for hackathon registration (Legacy)
export interface HackathonFormData {
  // Personal Info
  full_name: string
  email: string
  phone: string
  college: string
  department: string
  semester: string
  
  // Team Info
  team_action: 'create' | 'join' | ''
  team_name: string
  team_code: string
  
  // Idea Details (only for team creators)
  idea_title: string
  idea_description: string
  idea_category: string
  
  // Terms
  terms_accepted: boolean
}

// ============================================
// NEW HACKATHON REGISTRATION SYSTEM
// ============================================

// Individual member data structure
export interface TeamMember {
  full_name: string
  email: string
  phone: string
  college: string
  department: string
  semester: string
  is_leader: boolean
}

// Main entry type stored in database
export interface HackathonEntry {
  id?: string
  entry_type: 'team' | 'individual'
  team_name?: string
  team_code?: string
  idea_title: string
  idea_description: string
  idea_category: string
  members: TeamMember[]
  status?: 'pending' | 'approved' | 'rejected' | 'waitlist'
  created_at?: string
  updated_at?: string
}

// Form data for the new registration form
export interface NewHackathonFormData {
  // Registration type
  entry_type: 'team' | 'individual' | ''
  
  // Team info (only for team registration)
  team_name: string
  
  // Idea details
  idea_title: string
  idea_description: string
  idea_category: string
  
  // Team members (2-4 for teams, 1 for individual)
  members: TeamMember[]
  
  // Terms
  terms_accepted: boolean
}

// Empty member template
export const emptyMember: TeamMember = {
  full_name: '',
  email: '',
  phone: '',
  college: '',
  department: '',
  semester: '',
  is_leader: false
}

// Create initial form data
export const initialFormData: NewHackathonFormData = {
  entry_type: '',
  team_name: '',
  idea_title: '',
  idea_description: '',
  idea_category: '',
  members: [],
  terms_accepted: false
}
