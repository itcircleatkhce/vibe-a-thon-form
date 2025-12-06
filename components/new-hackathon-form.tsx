"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase, isSupabaseConfigured, NewHackathonFormData, TeamMember, emptyMember, initialFormData } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, User, ChevronLeft, ChevronRight, Loader2, CheckCircle2, AlertCircle, Sparkles, Rocket } from "lucide-react"
import { EntryTypeSelection } from "./registration/entry-type-selection"
import { TeamInfoSection } from "./registration/team-info-section"
import { MembersSection } from "./registration/members-section"
import { IdeaSection } from "./registration/idea-section"
import { TermsSection } from "./registration/terms-section"
import { SuccessScreen } from "./registration/success-screen"

export function NewHackathonForm() {
  const [formData, setFormData] = useState<NewHackathonFormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [teamCode, setTeamCode] = useState("")

  // Steps depend on entry type
  const getSteps = () => {
    if (formData.entry_type === 'team') {
      return [
        { title: "Registration Type", description: "Choose how to participate" },
        { title: "Team Info", description: "Name your team" },
        { title: "Team Members", description: "Add 2-4 members" },
        { title: "Project Idea", description: "Describe your idea" },
        { title: "Review & Submit", description: "Accept terms" },
      ]
    } else if (formData.entry_type === 'individual') {
      return [
        { title: "Registration Type", description: "Choose how to participate" },
        { title: "Your Details", description: "Personal information" },
        { title: "Project Idea", description: "Describe your idea" },
        { title: "Review & Submit", description: "Accept terms" },
      ]
    }
    return [{ title: "Registration Type", description: "Choose how to participate" }]
  }

  const steps = getSteps()
  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const updateFormData = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const updateMember = (index: number, field: keyof TeamMember, value: string | boolean) => {
    const newMembers = [...formData.members]
    newMembers[index] = { ...newMembers[index], [field]: value }
    setFormData(prev => ({ ...prev, members: newMembers }))
  }

  const addMember = () => {
    if (formData.members.length < 4) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { ...emptyMember, is_leader: false }]
      }))
    }
  }

  const removeMember = (index: number) => {
    if (formData.members.length > 2) {
      const newMembers = formData.members.filter((_, i) => i !== index)
      // Ensure at least one leader
      if (!newMembers.some(m => m.is_leader) && newMembers.length > 0) {
        newMembers[0].is_leader = true
      }
      setFormData(prev => ({ ...prev, members: newMembers }))
    }
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 0) {
      if (!formData.entry_type) {
        newErrors.entry_type = "Please select a registration type"
      }
    }

    if (formData.entry_type === 'team') {
      if (currentStep === 1) {
        if (!formData.team_name.trim()) {
          newErrors.team_name = "Team name is required"
        } else if (formData.team_name.trim().length < 3) {
          newErrors.team_name = "Team name must be at least 3 characters"
        }
      }

      if (currentStep === 2) {
        if (formData.members.length < 2) {
          newErrors.members = "Team must have at least 2 members"
        }
        formData.members.forEach((member, index) => {
          if (!member.full_name.trim()) newErrors[`member_${index}_name`] = "Name is required"
          if (!member.email.trim()) newErrors[`member_${index}_email`] = "Email is required"
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
            newErrors[`member_${index}_email`] = "Invalid email format"
          }
          if (!member.phone.trim()) newErrors[`member_${index}_phone`] = "Phone is required"
          else if (!/^[0-9]{10}$/.test(member.phone.replace(/\D/g, ''))) {
            newErrors[`member_${index}_phone`] = "Phone must be 10 digits"
          }
          if (!member.college) newErrors[`member_${index}_college`] = "College is required"
          if (!member.department) newErrors[`member_${index}_department`] = "Department is required"
          if (!member.semester) newErrors[`member_${index}_semester`] = "Semester is required"
        })
        // Check for duplicate emails
        const emails = formData.members.map(m => m.email.toLowerCase())
        const duplicates = emails.filter((e, i) => emails.indexOf(e) !== i)
        if (duplicates.length > 0) {
          newErrors.members_duplicate = "Each member must have a unique email"
        }
        // Ensure one leader
        if (!formData.members.some(m => m.is_leader)) {
          newErrors.members_leader = "Please designate a team leader"
        }
      }

      if (currentStep === 3) {
        if (!formData.idea_title.trim()) newErrors.idea_title = "Idea title is required"
        if (!formData.idea_description.trim()) newErrors.idea_description = "Description is required"
        else if (formData.idea_description.trim().length < 50) {
          newErrors.idea_description = "Description must be at least 50 characters"
        }
        if (!formData.idea_category) newErrors.idea_category = "Please select a category"
      }

      if (currentStep === 4) {
        if (!formData.terms_accepted) newErrors.terms_accepted = "You must accept the terms"
      }
    }

    if (formData.entry_type === 'individual') {
      if (currentStep === 1) {
        const member = formData.members[0]
        if (!member) {
          newErrors.member = "Please fill in your details"
        } else {
          if (!member.full_name.trim()) newErrors.full_name = "Name is required"
          if (!member.email.trim()) newErrors.email = "Email is required"
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
            newErrors.email = "Invalid email format"
          }
          if (!member.phone.trim()) newErrors.phone = "Phone is required"
          else if (!/^[0-9]{10}$/.test(member.phone.replace(/\D/g, ''))) {
            newErrors.phone = "Phone must be 10 digits"
          }
          if (!member.college) newErrors.college = "College is required"
          if (!member.department) newErrors.department = "Department is required"
          if (!member.semester) newErrors.semester = "Semester is required"
        }
      }

      if (currentStep === 2) {
        if (!formData.idea_title.trim()) newErrors.idea_title = "Idea title is required"
        if (!formData.idea_description.trim()) newErrors.idea_description = "Description is required"
        else if (formData.idea_description.trim().length < 50) {
          newErrors.idea_description = "Description must be at least 50 characters"
        }
        if (!formData.idea_category) newErrors.idea_category = "Please select a category"
      }

      if (currentStep === 3) {
        if (!formData.terms_accepted) newErrors.terms_accepted = "You must accept the terms"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      // Initialize members when entry type is selected
      if (currentStep === 0 && formData.entry_type === 'team' && formData.members.length === 0) {
        setFormData(prev => ({
          ...prev,
          members: [
            { ...emptyMember, is_leader: true },
            { ...emptyMember, is_leader: false }
          ]
        }))
      } else if (currentStep === 0 && formData.entry_type === 'individual' && formData.members.length === 0) {
        setFormData(prev => ({
          ...prev,
          members: [{ ...emptyMember, is_leader: true }]
        }))
      }
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    if (!isSupabaseConfigured() || !supabase) {
      setSubmitStatus("error")
      setSubmitMessage("Database not configured. Please contact the organizers.")
      return
    }

    setIsSubmitting(true)

    try {
      const entryData = {
        entry_type: formData.entry_type,
        team_name: formData.entry_type === 'team' ? formData.team_name.trim() : null,
        idea_title: formData.idea_title.trim(),
        idea_description: formData.idea_description.trim(),
        idea_category: formData.idea_category,
        members: formData.members.map(m => ({
          ...m,
          full_name: m.full_name.trim(),
          email: m.email.trim().toLowerCase(),
          phone: m.phone.trim()
        }))
      }

      const { data, error } = await supabase
        .from('hackathon_entries')
        .insert([entryData])
        .select()
        .single()

      if (error) {
        // Check for duplicate email
        if (error.code === '23505') {
          throw new Error("One or more email addresses are already registered.")
        }
        throw error
      }

      setTeamCode(data.team_code || '')
      setSubmitStatus("success")
      
      if (formData.entry_type === 'team') {
        setSubmitMessage(`🎉 Team "${formData.team_name}" registered successfully!`)
      } else {
        setSubmitMessage(`🎉 Registration successful! We'll match you with a team.`)
      }

    } catch (error) {
      console.error("Submission error:", error)
      setSubmitStatus("error")
      setSubmitMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setCurrentStep(0)
    setErrors({})
    setSubmitStatus("idle")
    setSubmitMessage("")
    setTeamCode("")
  }

  // Render success screen
  if (submitStatus === "success") {
    return (
      <SuccessScreen
        entryType={formData.entry_type as 'team' | 'individual'}
        teamName={formData.team_name}
        teamCode={teamCode}
        message={submitMessage}
        onReset={resetForm}
      />
    )
  }

  // Determine which step content to show
  const renderStepContent = () => {
    // Step 0: Entry type selection (same for all)
    if (currentStep === 0) {
      return (
        <EntryTypeSelection
          value={formData.entry_type}
          onChange={(type: 'team' | 'individual') => updateFormData('entry_type', type)}
          error={errors.entry_type}
        />
      )
    }

    if (formData.entry_type === 'team') {
      switch (currentStep) {
        case 1:
          return (
            <TeamInfoSection
              teamName={formData.team_name}
              onChange={(name: string) => updateFormData('team_name', name)}
              error={errors.team_name}
            />
          )
        case 2:
          return (
            <MembersSection
              members={formData.members}
              updateMember={updateMember}
              addMember={addMember}
              removeMember={removeMember}
              errors={errors}
              isTeam={true}
            />
          )
        case 3:
          return (
            <IdeaSection
              ideaTitle={formData.idea_title}
              ideaDescription={formData.idea_description}
              ideaCategory={formData.idea_category}
              onChange={updateFormData}
              errors={errors}
            />
          )
        case 4:
          return (
            <TermsSection
              formData={formData}
              accepted={formData.terms_accepted}
              onChange={(accepted: boolean) => updateFormData('terms_accepted', accepted)}
              error={errors.terms_accepted}
            />
          )
      }
    }

    if (formData.entry_type === 'individual') {
      switch (currentStep) {
        case 1:
          return (
            <MembersSection
              members={formData.members}
              updateMember={updateMember}
              addMember={() => {}}
              removeMember={() => {}}
              errors={errors}
              isTeam={false}
            />
          )
        case 2:
          return (
            <IdeaSection
              ideaTitle={formData.idea_title}
              ideaDescription={formData.idea_description}
              ideaCategory={formData.idea_category}
              onChange={updateFormData}
              errors={errors}
            />
          )
        case 3:
          return (
            <TermsSection
              formData={formData}
              accepted={formData.terms_accepted}
              onChange={(accepted: boolean) => updateFormData('terms_accepted', accepted)}
              error={errors.terms_accepted}
            />
          )
      }
    }

    return null
  }

  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-6 bg-gradient-to-r from-vibe-teal/20 to-vibe-mint/30 border-vibe-teal/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-vibe-teal flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                {steps[currentStep]?.title}
              </CardTitle>
              <CardDescription className="text-vibe-dark/60">
                {steps[currentStep]?.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <span className="text-sm text-vibe-teal">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <Progress value={progress} className="h-2 bg-vibe-mint/30" />
        </CardContent>
      </Card>

      {/* Step Indicators */}
      <div className="flex justify-center mb-6 gap-2 flex-wrap">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              index === currentStep
                ? 'bg-vibe-teal text-white'
                : index < currentStep
                ? 'bg-vibe-teal/20 text-vibe-teal'
                : 'bg-vibe-light text-vibe-dark/50'
            }`}
          >
            {index < currentStep ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px]">
                {index + 1}
              </span>
            )}
            <span className="hidden sm:inline">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Main Form Content */}
      <Card className="bg-white/80 border-vibe-mint/50 shadow-xl">
        <CardContent className="p-6">
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-vibe-red/10 border border-vibe-red/30 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-vibe-red flex-shrink-0" />
              <p className="text-vibe-red text-sm">{submitMessage}</p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-vibe-mint">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep || isSubmitting}
              className="border-vibe-mint text-vibe-dark hover:bg-vibe-mint/20"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {isLastStep ? (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-vibe-teal to-vibe-orange hover:from-vibe-teal/90 hover:to-vibe-orange/90 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Complete Registration
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-vibe-teal hover:bg-vibe-teal/90 text-white"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
