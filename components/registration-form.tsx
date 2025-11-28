"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ProgressSteps } from "@/components/progress-steps"
import { Section1Registration, Section2Expertise, Section3Analytical } from "@/components/form-sections"
import { supabase, isSupabaseConfigured, type RegistrationData } from "@/lib/supabase"
import { ArrowLeft, ArrowRight, Send, Loader2, AlertCircle } from "lucide-react"

const STEP_LABELS = ["Registration", "Tools & Expertise", "Analytical Questions"]

interface FormData extends Omit<RegistrationData, 'created_at'> {}

const initialFormData: FormData = {
  full_name: "",
  email: "",
  phone: "",
  college: "",
  department: "",
  semester: "",
  primary_skillset: "",
  git_proficiency: "",
  technologies: [],
  why_join: "",
  shipping_experience: "",
}

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = useCallback((field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
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
      newErrors.college = "College/University is required"
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
    
    if (!formData.primary_skillset) {
      newErrors.primary_skillset = "Please select your primary skillset"
    }
    
    if (!formData.git_proficiency) {
      newErrors.git_proficiency = "Please select your Git proficiency level"
    }
    
    if (!formData.technologies || formData.technologies.length === 0) {
      newErrors.technologies = "Please select at least one technology"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.why_join.trim()) {
      newErrors.why_join = "Please tell us why you want to join"
    } else if (formData.why_join.trim().length < 50) {
      newErrors.why_join = "Please provide at least 50 characters"
    }
    
    if (!formData.shipping_experience) {
      newErrors.shipping_experience = "Please select an option"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false
    
    if (currentStep === 1) {
      isValid = validateStep1()
    } else if (currentStep === 2) {
      isValid = validateStep2()
    }
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
      // Announce step change for screen readers
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

    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      setSubmitStatus("error")
      setSubmitMessage("⚠️ Database not configured. Please set up Supabase credentials in .env.local file.")
      setIsSubmitting(false)
      console.log("Form data (not saved - Supabase not configured):", formData)
      return
    }

    try {
      console.log('Submitting to Supabase...', formData)
      
      const { error, data, status, statusText } = await supabase
        .from('registrations')
        .insert([{
          ...formData,
          technologies: formData.technologies,
          created_at: new Date().toISOString()
        }])
        .select()

      console.log('Supabase response:', { error, data, status, statusText })

      if (error) {
        console.error('Supabase error details:', JSON.stringify(error, null, 2))
        console.error('Error message:', error.message)
        console.error('Error code:', error.code)
        console.error('Error details:', error.details)
        console.error('Error hint:', error.hint)
        throw error
      }

      console.log('Registration saved:', data)
      setSubmitStatus("success")
      setSubmitMessage("🎉 Registration successful! We'll be in touch soon.")
      
      // Reset form after success
      setTimeout(() => {
        setFormData(initialFormData)
        setCurrentStep(1)
      }, 3000)

    } catch (error: unknown) {
      console.error('Submission error:', error)
      setSubmitStatus("error")
      
      // Provide more helpful error messages
      const supabaseError = error as { message?: string; code?: string; details?: string }
      if (supabaseError?.code === '42P01') {
        setSubmitMessage("⚠️ Database table not found. Please run the SQL schema in Supabase.")
      } else if (supabaseError?.code === '23505') {
        setSubmitMessage("⚠️ This email is already registered.")
      } else if (supabaseError?.message) {
        setSubmitMessage(`Error: ${supabaseError.message}`)
      } else {
        setSubmitMessage("Something went wrong. Please try again or contact support.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Skip link for accessibility */}
      <a href="#main-form" className="skip-link">
        Skip to main form
      </a>

      {/* Progress Steps */}
      <ProgressSteps 
        currentStep={currentStep} 
        totalSteps={3} 
        stepLabels={STEP_LABELS}
      />

      {/* Form Content */}
      <main id="main-form" role="main" aria-label="Registration form">
        <form 
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          {/* Step 1 */}
          {currentStep === 1 && (
            <Section1Registration
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

          {/* Step 2 */}
          {currentStep === 2 && (
            <Section2Expertise
              formData={{
                primary_skillset: formData.primary_skillset,
                git_proficiency: formData.git_proficiency,
                technologies: formData.technologies,
              }}
              onChange={handleChange}
              errors={errors}
            />
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <Section3Analytical
              formData={{
                why_join: formData.why_join,
                shipping_experience: formData.shipping_experience,
              }}
              onChange={handleChange}
              errors={errors}
            />
          )}

          {/* Submit Status Message */}
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
              {submitMessage}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-vibe-light">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
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
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-vibe-red hover:bg-vibe-red/90 min-w-40"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                    Submit Registration
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
