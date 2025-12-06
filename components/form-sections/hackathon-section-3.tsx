"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Shield, Award, AlertTriangle, Clock, Users } from "lucide-react"

interface Section3Props {
  formData: {
    terms_accepted: boolean
  }
  onChange: (field: string, value: boolean) => void
  errors: Record<string, string>
  teamAction: 'create' | 'join' | ''
  teamName: string
}

export function Section3Terms({ formData, onChange, errors, teamAction, teamName }: Section3Props) {
  return (
    <div className="space-y-8">
      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-vibe-mint/20 to-vibe-teal/10 border-vibe-teal/30 group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-teal flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <Award className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
            Almost There!
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            Review the terms and complete your registration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-white/50 rounded-lg">
            <p className="text-sm text-vibe-dark/80">
              {teamAction === 'create' ? (
                <>You are <strong className="text-vibe-teal">creating</strong> team <strong className="text-vibe-red">&quot;{teamName}&quot;</strong>. After registration, you&apos;ll receive a team code to share with your teammates.</>
              ) : (
                <>You are <strong className="text-vibe-orange">joining</strong> an existing team. Make sure you have the correct team code from your team leader.</>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="form-section group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-dark flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <FileText className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110" aria-hidden="true" />
            Terms & Conditions
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            Please read and accept the hackathon rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Event Rules */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-vibe-light/50 transition-all duration-300 hover:bg-vibe-light">
              <Clock className="w-5 h-5 text-vibe-teal mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-vibe-dark">Event Timing</p>
                <p className="text-sm text-vibe-dark/70">
                                Late arrivals may face penalties or disqualification.
                </p>
              </div>
            </div>


            <div className="flex items-start gap-3 p-3 rounded-lg bg-vibe-light/50 transition-all duration-300 hover:bg-vibe-light">
              <Shield className="w-5 h-5 text-vibe-maroon mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-vibe-dark">Code of Conduct</p>
                <p className="text-sm text-vibe-dark/70">
                  All participants must maintain respectful behavior. Harassment, discrimination, 
                  or any form of misconduct will result in immediate disqualification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-vibe-light/50 transition-all duration-300 hover:bg-vibe-light">
              <Award className="w-5 h-5 text-vibe-red mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-vibe-dark">Judging & Prizes</p>
                <p className="text-sm text-vibe-dark/70">
                  Projects will be judged on innovation, execution, and presentation. 
                  The organizers&apos; decision on winners is final and binding.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-vibe-blush/30 transition-all duration-300 hover:bg-vibe-blush/50">
              <AlertTriangle className="w-5 h-5 text-vibe-red mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-vibe-dark">Important Notes</p>
                <ul className="text-sm text-vibe-dark/70 list-disc list-inside space-y-1 mt-1">
                  <li>All code must be written during the hackathon</li>
                  <li>Use of AI tools (like GitHub Copilot, ChatGPT) is allowed and encouraged</li>
                  <li>Pre-existing code or templates are not allowed</li>
                  <li>Participants must bring their own laptops</li>
                  <li>TEA AND BISCUITS will be provided adequately</li>
                  <li>By registering, you consent to photographs being taken for promotional purposes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accept Terms Checkbox */}
          <div className={`
            flex items-start space-x-3 p-4 rounded-xl border-2 transition-all duration-300
            ${formData.terms_accepted 
              ? 'border-vibe-teal bg-vibe-teal/10' 
              : errors.terms_accepted 
                ? 'border-vibe-red bg-vibe-red/5' 
                : 'border-vibe-light hover:border-vibe-teal/50'
            }
          `}>
            <Checkbox
              id="terms_accepted"
              checked={formData.terms_accepted}
              onCheckedChange={(checked) => onChange("terms_accepted", checked === true)}
              aria-required="true"
              aria-invalid={!!errors.terms_accepted}
              className="mt-0.5"
            />
            <Label htmlFor="terms_accepted" className="flex-1 cursor-pointer">
              <span className="font-medium text-vibe-dark">
                I accept the terms and conditions <span className="text-vibe-red" aria-hidden="true">*</span>
              </span>
              <span className="block text-sm text-vibe-dark/60 mt-1">
                By checking this box, I confirm that I have read and agree to the hackathon rules, 
                code of conduct, and understand that violation may result in disqualification.
              </span>
            </Label>
          </div>
          {errors.terms_accepted && (
            <p className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
              {errors.terms_accepted}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Final Encouragement */}
      <Card className="bg-gradient-to-br from-vibe-orange/10 to-vibe-red/5 border-vibe-orange/30 group/card hover:shadow-lg transition-all duration-500">
        <CardContent className="pt-6">
          <div className="text-center space-y-2 transition-all duration-500 group-hover/card:scale-105">
            <p className="text-lg font-medium text-vibe-dark transition-all duration-300 group-hover/card:text-vibe-red">
              🚀 Ready to hack? 🚀
            </p>
            <p className="text-sm text-vibe-dark/70 transition-all duration-300 group-hover/card:text-vibe-dark/80">
              Click &quot;Complete Registration&quot; below to secure your spot at the Vibe-a-thon Mini Hackathon!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
