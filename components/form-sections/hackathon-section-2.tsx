"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, UserPlus, Key, Lightbulb, Sparkles, List } from "lucide-react"
import { supabase, HackathonTeam } from "@/lib/supabase"

interface Section2Props {
  formData: {
    team_action: 'create' | 'join' | ''
    team_name: string
    team_code: string
    idea_title: string
    idea_description: string
    idea_category: string
  }
  onChange: (field: string, value: string) => void
  errors: Record<string, string>
}

export function Section2TeamIdea({ formData, onChange, errors }: Section2Props) {
  const [availableTeams, setAvailableTeams] = useState<HackathonTeam[]>([])
  const [loadingTeams, setLoadingTeams] = useState(false)

  // Fetch available teams when join is selected
  useEffect(() => {
    if (formData.team_action === 'join') {
      fetchAvailableTeams()
    }
  }, [formData.team_action])

  const fetchAvailableTeams = async () => {
    if (!supabase) return
    
    setLoadingTeams(true)
    try {
      const { data, error } = await supabase
        .from('hackathon_teams')
        .select('*')
        .lt('member_count', 4) // Only teams with less than 4 members
        .order('team_name', { ascending: true })
      
      if (error) throw error
      setAvailableTeams(data || [])
    } catch (error) {
      console.error('Error fetching teams:', error)
    } finally {
      setLoadingTeams(false)
    }
  }

  const handleTeamSelect = (teamCode: string) => {
    onChange("team_code", teamCode)
  }

  const ideaCategories = [
    "Web Application",
    "Mobile Application",
    "AI/ML Solution",
    "IoT & Hardware",
    "Social Impact",
    "Education & Learning",
    "Health & Wellness",
    "Productivity Tools",
    "Entertainment & Gaming",
    "E-commerce & Fintech",
    "Other"
  ]

  return (
    <div className="space-y-8">
      {/* Team Info Card */}
      <Card className="bg-gradient-to-br from-vibe-orange/10 to-vibe-red/5 border-vibe-orange/30 group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-orange flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <Users className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
            Registration Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-vibe-dark/80">
              <span className="text-vibe-teal">✓</span>
              <span>All individuals with no team will be <strong>paired</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-vibe-dark/80">
              <span className="text-vibe-teal">✓</span>
              <span>For <strong>individual</strong> participation, create a team with team name "<strong> SOLO </strong>" </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-vibe-dark/80">
              <span className="text-vibe-teal">✓</span>
              <span>In team registration, team leader creates the team and shares the code</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-vibe-dark/80">
              <span className="text-vibe-teal">✓</span>
              <span>Other members join using the 6-character team code</span>
            </div>
            
          </div>
        </CardContent>
      </Card>

      {/* Team Action Selection */}
      <Card className="form-section group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-dark transition-all duration-500 group-hover/card:translate-x-2">
            Team Formation
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            Create a new team or join an existing one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset>
            <legend className="sr-only">Choose team action</legend>
            <RadioGroup
              value={formData.team_action}
              onValueChange={(value) => onChange("team_action", value)}
              className="grid gap-4 md:grid-cols-2"
              aria-required="true"
              aria-invalid={!!errors.team_action}
            >
              <div className={`
                flex items-start space-x-3 p-5 rounded-xl border-2 cursor-pointer
                transition-all duration-300
                ${formData.team_action === 'create' 
                  ? 'border-vibe-teal bg-vibe-teal/10 shadow-md' 
                  : 'border-vibe-light hover:border-vibe-teal/50 hover:bg-vibe-mint/10'
                }
              `}>
                <RadioGroupItem value="create" id="team-create" className="mt-1" />
                <Label htmlFor="team-create" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <UserPlus className="w-5 h-5 text-vibe-teal" />
                    <span className="font-semibold text-vibe-dark">Create a Team</span>
                  </div>
                  <span className="block text-sm text-vibe-dark/60">
                    Start a new team as the leader. You&apos;ll get a code to share with teammates.
                  </span>
                </Label>
              </div>
              
              <div className={`
                flex items-start space-x-3 p-5 rounded-xl border-2 cursor-pointer
                transition-all duration-300
                ${formData.team_action === 'join' 
                  ? 'border-vibe-orange bg-vibe-orange/10 shadow-md' 
                  : 'border-vibe-light hover:border-vibe-orange/50 hover:bg-vibe-blush/10'
                }
              `}>
                <RadioGroupItem value="join" id="team-join" className="mt-1" />
                <Label htmlFor="team-join" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Key className="w-5 h-5 text-vibe-orange" />
                    <span className="font-semibold text-vibe-dark">Join a Team</span>
                  </div>
                  <span className="block text-sm text-vibe-dark/60">
                    Enter the team code shared by your team leader to join.
                  </span>
                </Label>
              </div>
            </RadioGroup>
            {errors.team_action && (
              <p className="text-sm text-vibe-red mt-2 transition-all duration-500 animate-in fade-in-0" role="alert">
                {errors.team_action}
              </p>
            )}
          </fieldset>
        </CardContent>
      </Card>

      {/* Create Team Form */}
      {formData.team_action === 'create' && (
        <>
          <Card className="form-section group/card hover:shadow-lg transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
            <CardHeader>
              <CardTitle className="text-vibe-teal flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
                <Sparkles className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110" aria-hidden="true" />
                Team Details
              </CardTitle>
              <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
                Give your team a memorable name
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="team_name" className="text-vibe-dark">
                  Team Name <span className="text-vibe-red" aria-hidden="true">*</span>
                </Label>
                <Input
                  id="team_name"
                  name="team_name"
                  type="text"
                  placeholder="e.g., Code Crushers, Byte Brigade"
                  value={formData.team_name}
                  onChange={(e) => onChange("team_name", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.team_name}
                  aria-describedby={errors.team_name ? "team_name_error" : undefined}
                  className={`
                    transition-all duration-300 ease-out
                    hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                    focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                    ${errors.team_name ? "border-vibe-red animate-shake" : ""}
                  `}
                />
                {errors.team_name && (
                  <p id="team_name_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                    {errors.team_name}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Idea Details */}
          <Card className="form-section group/card hover:shadow-lg transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in-0 duration-500 delay-100">
            <CardHeader>
              <CardTitle className="text-vibe-red flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
                <Lightbulb className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
                Project Idea
              </CardTitle>
              <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
                Share your hackathon project idea (can be refined later)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Idea Title */}
              <div className="space-y-2">
                <Label htmlFor="idea_title" className="text-vibe-dark">
                  Idea Title <span className="text-vibe-red" aria-hidden="true">*</span>
                </Label>
                <Input
                  id="idea_title"
                  name="idea_title"
                  type="text"
                  placeholder="e.g., AI-Powered Study Assistant"
                  value={formData.idea_title}
                  onChange={(e) => onChange("idea_title", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.idea_title}
                  aria-describedby={errors.idea_title ? "idea_title_error" : undefined}
                  className={`
                    transition-all duration-300 ease-out
                    hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                    focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                    ${errors.idea_title ? "border-vibe-red animate-shake" : ""}
                  `}
                />
                {errors.idea_title && (
                  <p id="idea_title_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                    {errors.idea_title}
                  </p>
                )}
              </div>

              {/* Idea Category */}
              <div className="space-y-2">
                <Label htmlFor="idea_category" className="text-vibe-dark">
                  Category <span className="text-vibe-red" aria-hidden="true">*</span>
                </Label>
                <Select
                  value={formData.idea_category}
                  onValueChange={(value) => onChange("idea_category", value)}
                >
                  <SelectTrigger
                    id="idea_category"
                    aria-required="true"
                    aria-invalid={!!errors.idea_category}
                    aria-describedby={errors.idea_category ? "idea_category_error" : undefined}
                    className={`
                      transition-all duration-300 ease-out
                      hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                      focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                      ${errors.idea_category ? "border-vibe-red animate-shake" : ""}
                    `}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="animate-in zoom-in-95 fade-in-0 duration-300">
                    {ideaCategories.map((category) => (
                      <SelectItem 
                        key={category} 
                        value={category}
                        className="transition-all duration-200 ease-out hover:translate-x-2 hover:bg-vibe-mint/20"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.idea_category && (
                  <p id="idea_category_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                    {errors.idea_category}
                  </p>
                )}
              </div>

              {/* Idea Description */}
              <div className="space-y-2">
                <Label htmlFor="idea_description" className="text-vibe-dark">
                  Brief Description <span className="text-vibe-red" aria-hidden="true">*</span>
                </Label>
                <Textarea
                  id="idea_description"
                  name="idea_description"
                  placeholder="Describe your project idea, what problem it solves, and how you plan to build it..."
                  value={formData.idea_description}
                  onChange={(e) => onChange("idea_description", e.target.value)}
                  className={`
                    min-h-[120px] transition-all duration-300 ease-out
                    hover:scale-[1.01] hover:shadow-md hover:border-vibe-teal/50
                    focus:scale-[1.01] focus:shadow-md focus:border-vibe-teal
                    ${errors.idea_description ? "border-vibe-red animate-shake" : ""}
                  `}
                  aria-required="true"
                  aria-invalid={!!errors.idea_description}
                  aria-describedby={errors.idea_description ? "idea_description_error" : "idea_description_hint"}
                />
                <p id="idea_description_hint" className="text-sm text-vibe-dark/60">
                  Minimum 50 characters. Don&apos;t worry, you can refine your idea at the event!
                </p>
                {errors.idea_description && (
                  <p id="idea_description_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                    {errors.idea_description}
                  </p>
                )}
                <p className={`text-xs text-right transition-all duration-300 ${
                  formData.idea_description?.length > 0 ? "text-vibe-teal font-medium" : "text-vibe-dark/50"
                }`}>
                  {formData.idea_description?.length || 0} characters
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Join Team Form */}
      {formData.team_action === 'join' && (
        <Card className="form-section group/card hover:shadow-lg transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
          <CardHeader>
            <CardTitle className="text-vibe-orange flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
              <Key className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110" aria-hidden="true" />
              Join a Team
            </CardTitle>
            <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
              Enter the team code or select from available teams
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Side by side layout with OR separator */}
            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-start">
              {/* Code Input Method */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-5 h-5 text-vibe-orange" />
                  <span className="font-semibold text-vibe-dark">Enter Team Code</span>
                </div>
                <Label htmlFor="team_code" className="text-vibe-dark text-sm">
                  Team Code <span className="text-vibe-red" aria-hidden="true">*</span>
                </Label>
                <Input
                  id="team_code"
                  name="team_code"
                  type="text"
                  placeholder="ABC123"
                  value={formData.team_code}
                  onChange={(e) => onChange("team_code", e.target.value.toUpperCase())}
                  maxLength={6}
                  aria-required="true"
                  aria-invalid={!!errors.team_code}
                  aria-describedby={errors.team_code ? "team_code_error" : "team_code_hint"}
                  className={`
                    text-center text-xl tracking-[0.2em] font-bold uppercase
                    transition-all duration-300 ease-out
                    hover:scale-[1.02] hover:shadow-md hover:border-vibe-orange/50
                    focus:scale-[1.02] focus:shadow-md focus:border-vibe-orange
                    ${errors.team_code ? "border-vibe-red animate-shake" : ""}
                  `}
                />
                <p id="team_code_hint" className="text-xs text-vibe-dark/60 text-center">
                  6-character code from your team leader
                </p>
              </div>

              {/* OR Separator */}
              <div className="flex md:flex-col items-center justify-center gap-3 py-4 md:py-0">
                <div className="flex-1 md:flex-none md:h-16 w-px md:w-px bg-gradient-to-b from-transparent via-vibe-dark/20 to-transparent hidden md:block" />
                <div className="h-px md:h-auto w-16 md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-vibe-dark/20 to-transparent md:hidden" />
                <span className="px-3 py-1.5 bg-vibe-light/80 rounded-full text-sm font-semibold text-vibe-dark/60 whitespace-nowrap">
                  OR
                </span>
                <div className="flex-1 md:flex-none md:h-16 w-px md:w-px bg-gradient-to-b from-transparent via-vibe-dark/20 to-transparent hidden md:block" />
                <div className="h-px md:h-auto w-16 md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-vibe-dark/20 to-transparent md:hidden" />
              </div>

              {/* Dropdown Selection Method */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <List className="w-5 h-5 text-vibe-teal" />
                  <span className="font-semibold text-vibe-dark">Browse Teams</span>
                </div>
                <Label htmlFor="team_select" className="text-vibe-dark text-sm">
                  Select Team <span className="text-vibe-red" aria-hidden="true">*</span>
                </Label>
                {loadingTeams ? (
                  <div className="flex items-center justify-center py-4 text-vibe-dark/60">
                    <div className="animate-spin w-5 h-5 border-2 border-vibe-teal border-t-transparent rounded-full mr-2" />
                    Loading...
                  </div>
                ) : availableTeams.length === 0 ? (
                  <div className="text-center py-3 text-vibe-dark/60 bg-vibe-light/30 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-1 opacity-50" />
                    <p className="text-sm">No teams available yet</p>
                  </div>
                ) : (
                  <>
                    <Select
                      value={formData.team_code}
                      onValueChange={handleTeamSelect}
                    >
                      <SelectTrigger
                        id="team_select"
                        aria-invalid={!!errors.team_code}
                        className={`
                          transition-all duration-300 ease-out
                          hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                          focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                          ${errors.team_code ? "border-vibe-red animate-shake" : ""}
                        `}
                      >
                        <SelectValue placeholder="Select a team..." />
                      </SelectTrigger>
                      <SelectContent className="animate-in zoom-in-95 fade-in-0 duration-300 max-h-[300px]">
                        {availableTeams.map((team) => (
                          <SelectItem 
                            key={team.team_code} 
                            value={team.team_code || ''}
                            className="transition-all duration-200 ease-out hover:translate-x-2 hover:bg-vibe-mint/20"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{team.team_name}</span>
                              <span className="text-xs text-vibe-dark/60">
                                {team.member_count}/4 members • {team.idea_category}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-vibe-dark/60 text-center">
                      {availableTeams.length} team{availableTeams.length !== 1 ? 's' : ''} available
                    </p>
                  </>
                )}
              </div>
            </div>

            {errors.team_code && (
              <p id="team_code_error" className="text-sm text-vibe-red text-center mt-4 transition-all duration-500 animate-in fade-in-0" role="alert">
                {errors.team_code}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
