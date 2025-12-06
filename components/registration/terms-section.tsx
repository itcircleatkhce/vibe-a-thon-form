"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileText, Shield, Award, AlertTriangle, Clock, Users, User, Sparkles } from "lucide-react"
import { NewHackathonFormData } from "@/lib/supabase"

interface TermsSectionProps {
  formData: NewHackathonFormData
  accepted: boolean
  onChange: (accepted: boolean) => void
  error?: string
}

export function TermsSection({ formData, accepted, onChange, error }: TermsSectionProps) {
  const isTeam = formData.entry_type === 'team'
  const memberCount = formData.members.length
  const leader = formData.members.find(m => m.is_leader)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-vibe-dark">Review & Submit</h2>
        <p className="text-vibe-dark/60">Almost there! Review your registration and accept the terms</p>
      </div>

      {/* Registration Summary */}
      <Card className="bg-gradient-to-br from-vibe-teal/20 to-vibe-mint/30 border-vibe-teal/30">
        <CardHeader>
          <CardTitle className="text-vibe-teal flex items-center gap-2">
            {isTeam ? <Users className="w-5 h-5" /> : <User className="w-5 h-5" />}
            Registration Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-vibe-dark/60 text-sm">Registration Type</p>
              <p className="text-vibe-dark font-medium">
                {isTeam ? 'Team Registration' : 'Individual Registration'}
              </p>
            </div>

            {isTeam && (
              <div className="space-y-2">
                <p className="text-vibe-dark/60 text-sm">Team Name</p>
                <p className="text-vibe-dark font-medium">{formData.team_name}</p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-vibe-dark/60 text-sm">{isTeam ? 'Team Size' : 'Participant'}</p>
              <p className="text-vibe-dark font-medium">
                {isTeam ? `${memberCount} members` : formData.members[0]?.full_name}
              </p>
            </div>

            {isTeam && leader && (
              <div className="space-y-2">
                <p className="text-vibe-dark/60 text-sm">Team Leader</p>
                <p className="text-vibe-dark font-medium">{leader.full_name}</p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-vibe-dark/60 text-sm">Project Title</p>
              <p className="text-vibe-dark font-medium">{formData.idea_title}</p>
            </div>

            <div className="space-y-2">
              <p className="text-vibe-dark/60 text-sm">Category</p>
              <p className="text-vibe-dark font-medium capitalize">{formData.idea_category?.replace('-', ' / ')}</p>
            </div>
          </div>

          {/* Team Members List */}
          {isTeam && (
            <div className="pt-4 border-t border-vibe-teal/30">
              <p className="text-vibe-dark/60 text-sm mb-2">Team Members</p>
              <div className="grid gap-2">
                {formData.members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded">
                    <span className="text-vibe-dark">
                      {member.full_name}
                      {member.is_leader && (
                        <span className="ml-2 text-xs bg-vibe-orange text-white px-1.5 py-0.5 rounded">Leader</span>
                      )}
                    </span>
                    <span className="text-vibe-dark/60 text-sm">{member.email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="bg-white/80 border-vibe-mint/50">
        <CardHeader>
          <CardTitle className="text-vibe-dark flex items-center gap-2">
            <FileText className="w-5 h-5 text-vibe-teal" />
            Terms & Conditions
          </CardTitle>
          <CardDescription className="text-vibe-dark/60">
            Please read and accept the hackathon rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rules */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-vibe-light/50">
              <Clock className="w-5 h-5 text-vibe-teal mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-vibe-dark">Event Timing</p>
                <p className="text-sm text-vibe-dark/60">
                  Be present at the venue on time. Late arrivals may face penalties.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-vibe-light/50">
              <Shield className="w-5 h-5 text-vibe-teal mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-vibe-dark">Code of Conduct</p>
                <p className="text-sm text-vibe-dark/60">
                  Maintain respectful behavior. Harassment or misconduct results in disqualification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-vibe-light/50">
              <Award className="w-5 h-5 text-vibe-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-vibe-dark">Judging & Prizes</p>
                <p className="text-sm text-vibe-dark/60">
                  Projects judged on innovation, execution, and presentation. Decisions are final.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-vibe-red/10 border border-vibe-red/30">
              <AlertTriangle className="w-5 h-5 text-vibe-red mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-vibe-dark">Important Notes</p>
                <ul className="text-sm text-vibe-dark/60 list-disc list-inside space-y-1 mt-1">
                  <li>All code must be written during the hackathon</li>
                  <li>AI tools (GitHub Copilot, ChatGPT) are allowed</li>
                  <li>Pre-existing code/templates are not allowed</li>
                  <li>Bring your own laptop</li>
                  <li>Tea and snacks will be provided</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-vibe-light/50">
              <Sparkles className="w-5 h-5 text-vibe-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-vibe-dark">What&apos;s Provided</p>
                <p className="text-sm text-vibe-dark/60">
                  WiFi, power outlets, tea, coffee, and snacks throughout the event!
                </p>
              </div>
            </div>
          </div>

          {/* Accept Checkbox */}
          <div className={`
            flex items-start space-x-3 p-4 rounded-xl border-2 transition-all duration-300
            ${accepted 
              ? 'border-vibe-teal bg-vibe-teal/10' 
              : error 
                ? 'border-vibe-red bg-vibe-red/10' 
                : 'border-vibe-mint hover:border-vibe-teal/50'
            }
          `}>
            <Checkbox
              id="terms_accepted"
              checked={accepted}
              onCheckedChange={(checked) => onChange(checked === true)}
              className="mt-0.5 border-vibe-teal data-[state=checked]:bg-vibe-teal"
            />
            <Label htmlFor="terms_accepted" className="flex-1 cursor-pointer">
              <span className="font-medium text-vibe-dark">
                I accept the terms and conditions <span className="text-vibe-red">*</span>
              </span>
              <span className="block text-sm text-vibe-dark/60 mt-1">
                By checking this box, I confirm that I have read and agree to the hackathon rules, 
                code of conduct, and understand that violation may result in disqualification.
              </span>
            </Label>
          </div>
          {error && (
            <p className="text-sm text-vibe-red">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Final Encouragement */}
      <Card className="bg-gradient-to-br from-vibe-orange/20 to-vibe-blush/30 border-vibe-orange/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-xl font-medium text-vibe-dark">
              🚀 Ready to build something amazing? 🚀
            </p>
            <p className="text-sm text-vibe-dark/70">
              Click &quot;Complete Registration&quot; to secure your spot at Vibe-a-thon!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
