"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lightbulb, Rocket, Target } from "lucide-react"

interface Section3Props {
  formData: {
    why_join: string
    problem_solution: string
    shipping_experience: string
  }
  onChange: (field: string, value: string) => void
  errors: Record<string, string>
}

export function Section3Analytical({ formData, onChange, errors }: Section3Props) {
  return (
    <div className="space-y-8">
      {/* Why Join */}
      <Card className="form-section group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-teal flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <Target className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
            Why Vibe-a-thon?
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            Tell us what excites you about joining this bootcamp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="why_join" className="text-vibe-dark">
              Why do you want to join the Vibe-a-thon bootcamp? <span className="text-vibe-red" aria-hidden="true">*</span>
            </Label>
            <Textarea
              id="why_join"
              name="why_join"
              placeholder="Share your motivation, goals, and what you hope to learn or achieve..."
              value={formData.why_join}
              onChange={(e) => onChange("why_join", e.target.value)}
              className={`
                min-h-[150px] transition-all duration-300 ease-out
                hover:scale-[1.01] hover:shadow-md hover:border-vibe-teal/50
                focus:scale-[1.01] focus:shadow-md focus:border-vibe-teal
                ${errors.why_join ? "border-vibe-red animate-shake" : ""}
              `}
              aria-required="true"
              aria-invalid={!!errors.why_join}
              aria-describedby={errors.why_join ? "why_join_error" : "why_join_hint"}
            />
            <p id="why_join_hint" className="text-sm text-vibe-dark/60 transition-all duration-300 group-hover/card:opacity-100">
              Minimum 50 characters. Be specific about your interests and expectations.
            </p>
            {errors.why_join && (
              <p id="why_join_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                {errors.why_join}
              </p>
            )}
            <p className={`text-xs text-right transition-all duration-300 ${
              formData.why_join?.length > 0 ? "text-vibe-teal font-medium" : "text-vibe-dark/50"
            }`}>
              {formData.why_join?.length || 0} characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Experience */}
      <Card className="form-section group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-orange flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <Rocket className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
            Product Shipping Experience
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            Have you ever launched or shipped a product/project?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset>
            <legend className="sr-only">Do you have product shipping experience?</legend>
            <RadioGroup
              value={formData.shipping_experience}
              onValueChange={(value) => onChange("shipping_experience", value)}
              className="space-y-3"
              aria-required="true"
              aria-invalid={!!errors.shipping_experience}
              aria-describedby={errors.shipping_experience ? "shipping_experience_error" : undefined}
            >
              <div className="flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:bg-vibe-mint/20 hover:shadow-sm border border-transparent hover:border-vibe-mint/30 group">
                <RadioGroupItem value="yes-multiple" id="ship-multiple" />
                <Label htmlFor="ship-multiple" className="flex-1 cursor-pointer">
                  <span className="font-medium">Yes, multiple projects! 🚀</span>
                  <span className="block text-sm text-vibe-dark/60">
                    I&apos;ve shipped several products or side projects
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:bg-vibe-mint/20 hover:shadow-sm border border-transparent hover:border-vibe-mint/30 group">
                <RadioGroupItem value="yes-one" id="ship-one" />
                <Label htmlFor="ship-one" className="flex-1 cursor-pointer">
                  <span className="font-medium">Yes, one project 🎯</span>
                  <span className="block text-sm text-vibe-dark/60">
                    I&apos;ve launched at least one project to users
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:bg-vibe-mint/20 hover:shadow-sm border border-transparent hover:border-vibe-mint/30 group">
                <RadioGroupItem value="in-progress" id="ship-progress" />
                <Label htmlFor="ship-progress" className="flex-1 cursor-pointer">
                  <span className="font-medium">Working on it 🔨</span>
                  <span className="block text-sm text-vibe-dark/60">
                    Currently building something to ship
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:bg-vibe-mint/20 hover:shadow-sm border border-transparent hover:border-vibe-mint/30 group">
                <RadioGroupItem value="not-yet" id="ship-no" />
                <Label htmlFor="ship-no" className="flex-1 cursor-pointer">
                  <span className="font-medium">Not yet 🌱</span>
                  <span className="block text-sm text-vibe-dark/60">
                    Haven&apos;t shipped anything but excited to learn!
                  </span>
                </Label>
              </div>
            </RadioGroup>
            {errors.shipping_experience && (
              <p id="shipping_experience_error" className="text-sm text-vibe-red mt-2 transition-all duration-500 animate-in fade-in-0" role="alert">
                {errors.shipping_experience}
              </p>
            )}
          </fieldset>
        </CardContent>
      </Card>

      {/* Problem & Solution */}
      <Card className="form-section group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-red flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <Lightbulb className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
            Problem-Solving Mindset
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            Describe about any real event mentioning real dates and names
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="problem_solution" className="text-vibe-dark">
              Did you ever complete a shipment product and how you were stuck or how did you overcome <span className="text-vibe-red" aria-hidden="true">*</span>
            </Label>
            <Textarea
              id="problem_solution"
              name="problem_solution"
              placeholder="In about 100 words"
              value={formData.problem_solution}
              onChange={(e) => onChange("problem_solution", e.target.value)}
              className={`
                min-h-[180px] transition-all duration-300 ease-out
                hover:scale-[1.01] hover:shadow-md hover:border-vibe-teal/50
                focus:scale-[1.01] focus:shadow-md focus:border-vibe-teal
                ${errors.problem_solution ? "border-vibe-red animate-shake" : ""}
              `}
              aria-required="true"
              aria-invalid={!!errors.problem_solution}
              aria-describedby={errors.problem_solution ? "problem_solution_error" : "problem_solution_hint"}
            />
            <p id="problem_solution_hint" className="text-sm text-vibe-dark/60 transition-all duration-300 group-hover/card:opacity-100">
              Describe both the problem and your proposed tech solution. We want to see your creative thinking!
            </p>
            {errors.problem_solution && (
              <p id="problem_solution_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                {errors.problem_solution}
              </p>
            )}
            <p className={`text-xs text-right transition-all duration-300 ${
              formData.problem_solution?.length > 0 ? "text-vibe-teal font-medium" : "text-vibe-dark/50"
            }`}>
              {formData.problem_solution?.length || 0} characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Encouragement Note */}
      <Card className="bg-gradient-to-br from-vibe-mint/20 to-vibe-teal/10 border-vibe-teal/30 group/card hover:shadow-lg transition-all duration-500">
        <CardContent className="pt-6">
          <div className="text-center space-y-2 transition-all duration-500 group-hover/card:scale-105">
            <p className="text-lg font-medium text-vibe-dark transition-all duration-300 group-hover/card:text-vibe-teal">
              ✨ You&apos;re almost there! ✨
            </p>
            <p className="text-sm text-vibe-dark/70 transition-all duration-300 group-hover/card:text-vibe-dark/80">
              Review your answers and submit your registration. We can&apos;t wait to have you at Vibe-a-thon!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}