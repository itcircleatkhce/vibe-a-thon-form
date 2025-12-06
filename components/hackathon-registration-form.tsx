"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ProgressSteps } from "@/components/progress-steps"
import { Section1HackathonPersonal } from "@/components/form-sections/hackathon-section-1"
import { Section2TeamIdea } from "@/components/form-sections/hackathon-section-2"
import { Section3Terms } from "@/components/form-sections/hackathon-section-3"
import { supabase, isSupabaseConfigured, type HackathonFormData } from "@/lib/supabase"
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react"

const STEP_LABELS = ["Personal Info", "Team & Idea", "Terms & Submit"]

const initialFormData: HackathonFormData = {
  full_name: "",
  email: "",
  phone: "",
  college: "",
  department: "",
  semester: "",
  team_action: "",
  team_name: "",
  team_code: "",
  idea_title: "",
  idea_description: "",
  idea_category: "",
  terms_accepted: false,
}

export function HackathonRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<HackathonFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [teamInfo, setTeamInfo] = useState<{ team_code: string; team_name: string } | null>(null)

  const handleChange = useCallback((field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [errors])

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required"
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = "Please enter your full name"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = "Please enter a valid phone number"
    }
    
    if (!formData.college.trim()) {
      newErrors.college = "College is required"
    }
    
    if (!formData.department) {
      newErrors.department = "Please select your department"
    }
    
    if (!formData.semester) {
      newErrors.semester = "Please select your semester"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.team_action) {
      newErrors.team_action = "Please choose to create or join a team"
    }
    
    if (formData.team_action === 'create') {
      if (!formData.team_name.trim()) {
        newErrors.team_name = "Team name is required"
      } else if (formData.team_name.trim().length < 3) {
        newErrors.team_name = "Team name must be at least 3 characters"
      }
      
      if (!formData.idea_title.trim()) {
        newErrors.idea_title = "Idea title is required"
      }
      
      if (!formData.idea_description.trim()) {
        newErrors.idea_description = "Idea description is required"
      } else if (formData.idea_description.trim().length < 50) {
        newErrors.idea_description = "Please provide at least 50 characters"
      }
      
      if (!formData.idea_category) {
        newErrors.idea_category = "Please select a category"
      }
    }
    
    if (formData.team_action === 'join') {
      if (!formData.team_code.trim()) {
        newErrors.team_code = "Team code is required"
      } else if (formData.team_code.trim().length !== 6) {
        newErrors.team_code = "Team code must be 6 characters"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.terms_accepted) {
      newErrors.terms_accepted = "You must accept the terms and conditions"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    let isValid = false
    
    if (currentStep === 1) {
      isValid = validateStep1()
    } else if (currentStep === 2) {
      isValid = validateStep2()
      
      // If joining a team, verify the team code exists and has space
      if (isValid && formData.team_action === 'join' && supabase) {
        try {
          const { data: team, error } = await supabase
            .from('hackathon_teams')
            .select('*')
            .eq('team_code', formData.team_code.toUpperCase())
            .single()
          
          if (error || !team) {
            setErrors({ team_code: "Invalid team code. Please check and try again." })
            return
          }
          
          if (team.member_count >= 4) {
            setErrors({ team_code: "This team is already full (max 4 members)" })
            return
          }
        } catch {
          setErrors({ team_code: "Error verifying team code. Please try again." })
          return
        }
      }
    }
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!validateStep3()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    if (!isSupabaseConfigured() || !supabase) {
      setSubmitStatus("error")
      setSubmitMessage("⚠️ Database not configured. Please set up Supabase credentials.")
      setIsSubmitting(false)
      return
    }

    try {
      let teamId: string | null = null
      let isTeamLeader = false
      let finalTeamCode = ""
      let finalTeamName = ""

      if (formData.team_action === 'create') {
        // Create new team
        const { data: newTeam, error: teamError } = await supabase
          .from('hackathon_teams')
          .insert([{
            team_name: formData.team_name.trim(),
            idea_title: formData.idea_title.trim(),
            idea_description: formData.idea_description.trim(),
            idea_category: formData.idea_category,
            created_by_email: formData.email,
          }])
          .select()
          .single()

        if (teamError) {
          if (teamError.code === '23505') {
            throw new Error("A team with this name already exists. Please choose a different name.")
          }
          throw teamError
        }

        teamId = newTeam.id
        isTeamLeader = true
        finalTeamCode = newTeam.team_code
        finalTeamName = newTeam.team_name
      } else if (formData.team_action === 'join') {
        // Get existing team
        const { data: existingTeam, error: findError } = await supabase
          .from('hackathon_teams')
          .select('*')
          .eq('team_code', formData.team_code.toUpperCase())
          .single()

        if (findError || !existingTeam) {
          throw new Error("Team not found. Please check the team code.")
        }

        if (existingTeam.member_count >= 4) {
          throw new Error("This team is already full (max 4 members)")
        }

        teamId = existingTeam.id
        finalTeamCode = existingTeam.team_code
        finalTeamName = existingTeam.team_name
      }

      // Register participant
      const { error: regError } = await supabase
        .from('hackathon_registrations')
        .insert([{
          full_name: formData.full_name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          college: formData.college,
          department: formData.department,
          semester: formData.semester,
          team_id: teamId,
          is_team_leader: isTeamLeader,
          terms_accepted: formData.terms_accepted,
        }])

      if (regError) {
        if (regError.code === '23505') {
          throw new Error("This email is already registered for the hackathon.")
        }
        throw regError
      }

      setTeamInfo({ team_code: finalTeamCode, team_name: finalTeamName })
      setSubmitStatus("success")
      
      if (formData.team_action === 'create') {
        setSubmitMessage(`🎉 Team "${finalTeamName}" created successfully! Share code: ${finalTeamCode} with your teammates.`)
        
        // Send email with team code to leader
        try {
          await fetch('/api/send-team-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              teamName: finalTeamName,
              teamCode: finalTeamCode,
              leaderName: formData.full_name,
            }),
          })
        } catch (emailError) {
          console.error('Failed to send team code email:', emailError)
          // Don't show error to user - registration was successful
        }
      } else {
        setSubmitMessage(`🎉 Successfully joined team "${finalTeamName}"! See you at the hackathon!`)
      }

    } catch (error: unknown) {
      console.error('Submission error:', error)
      setSubmitStatus("error")
      const err = error as { message?: string }
      setSubmitMessage(err?.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <a href="#main-form" className="skip-link">
        Skip to main form
      </a>

      <ProgressSteps 
        currentStep={currentStep} 
        totalSteps={3} 
        stepLabels={STEP_LABELS}
      />

      <main id="main-form" role="main" aria-label="Hackathon registration form">
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          {currentStep === 1 && (
            <Section1HackathonPersonal
              formData={{
                full_name: formData.full_name,
                email: formData.email,
                phone: formData.phone,
                college: formData.college,
                department: formData.department,
                semester: formData.semester,
              }}
              onChange={handleChange}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <Section2TeamIdea
              formData={{
                team_action: formData.team_action,
                team_name: formData.team_name,
                team_code: formData.team_code,
                idea_title: formData.idea_title,
                idea_description: formData.idea_description,
                idea_category: formData.idea_category,
              }}
              onChange={handleChange}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <Section3Terms
              formData={{
                terms_accepted: formData.terms_accepted,
              }}
              onChange={handleChange}
              errors={errors}
              teamAction={formData.team_action}
              teamName={formData.team_name}
            />
          )}

          {submitStatus !== "idle" && (
            <div
              className={`mt-6 p-4 rounded-xl text-center ${
                submitStatus === "success" 
                  ? "bg-vibe-mint/30 text-vibe-dark" 
                  : "bg-vibe-red/10 text-vibe-red"
              }`}
              role="alert"
              aria-live="polite"
            >
              <p className="font-medium">{submitMessage}</p>
              {submitStatus === "success" && teamInfo && formData.team_action === 'create' && (
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-vibe-dark/70 mb-1">Share this code with your teammates:</p>
                  <p className="text-2xl font-bold tracking-wider text-vibe-teal">{teamInfo.team_code}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-vibe-light">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || submitStatus === "success"}
              className={currentStep === 1 ? "invisible" : ""}
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-vibe-teal hover:bg-vibe-teal/90"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            ) : submitStatus !== "success" ? (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-vibe-red hover:bg-vibe-red/90 min-w-40"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                    Registering...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                    Complete Registration
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  setFormData(initialFormData)
                  setCurrentStep(1)
                  setSubmitStatus("idle")
                  setTeamInfo(null)
                }}
                className="bg-vibe-teal hover:bg-vibe-teal/90"
              >
                Register Another Person
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
