"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lightbulb, Sparkles } from "lucide-react"

const IDEA_CATEGORIES = [
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile App" },
  { value: "ai-ml", label: "AI / Machine Learning" },
  { value: "iot", label: "IoT / Hardware" },
  { value: "blockchain", label: "Blockchain / Web3" },
  { value: "game", label: "Game Development" },
  { value: "social", label: "Social Impact" },
  { value: "fintech", label: "FinTech" },
  { value: "health", label: "HealthTech" },
  { value: "education", label: "EdTech" },
  { value: "other", label: "Other" },
]

interface IdeaSectionProps {
  ideaTitle: string
  ideaDescription: string
  ideaCategory: string
  onChange: (field: string, value: string) => void
  errors: Record<string, string>
}

export function IdeaSection({ 
  ideaTitle, 
  ideaDescription, 
  ideaCategory, 
  onChange, 
  errors 
}: IdeaSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-vibe-dark">Your Project Idea</h2>
        <p className="text-vibe-dark/60">Tell us about what you plan to build</p>
      </div>

      <Card className="bg-white/80 border-vibe-mint/50">
        <CardHeader>
          <CardTitle className="text-vibe-teal flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Project Details
          </CardTitle>
          <CardDescription className="text-vibe-dark/60">
            Don&apos;t worry if your idea isn&apos;t final - you can pivot during the hackathon!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Idea Title */}
          <div className="space-y-2">
            <Label className="text-vibe-dark">
              Project Title <span className="text-vibe-red">*</span>
            </Label>
            <Input
              value={ideaTitle}
              onChange={(e) => onChange('idea_title', e.target.value)}
              placeholder="Enter a catchy title for your project"
              className={`bg-white border-vibe-mint text-vibe-dark placeholder:text-vibe-dark/40 ${
                errors.idea_title ? 'border-vibe-red' : 'focus:border-vibe-teal'
              }`}
              maxLength={100}
            />
            {errors.idea_title && <p className="text-vibe-red text-sm">{errors.idea_title}</p>}
            <p className="text-xs text-vibe-dark/50">{ideaTitle.length}/100 characters</p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-vibe-dark">
              Category <span className="text-vibe-red">*</span>
            </Label>
            <Select value={ideaCategory} onValueChange={(value) => onChange('idea_category', value)}>
              <SelectTrigger className={`bg-white border-vibe-mint text-vibe-dark ${
                errors.idea_category ? 'border-vibe-red' : ''
              }`}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-vibe-mint">
                {IDEA_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="text-vibe-dark hover:bg-vibe-mint/20">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.idea_category && <p className="text-vibe-red text-sm">{errors.idea_category}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-vibe-dark">
              Project Description <span className="text-vibe-red">*</span>
            </Label>
            <Textarea
              value={ideaDescription}
              onChange={(e) => onChange('idea_description', e.target.value)}
              placeholder="Describe your project idea. What problem does it solve? Who is it for? What technologies will you use?"
              className={`bg-white border-vibe-mint text-vibe-dark placeholder:text-vibe-dark/40 min-h-[150px] ${
                errors.idea_description ? 'border-vibe-red' : 'focus:border-vibe-teal'
              }`}
              maxLength={1000}
            />
            {errors.idea_description && <p className="text-vibe-red text-sm">{errors.idea_description}</p>}
            <p className={`text-xs ${ideaDescription.length < 50 ? 'text-vibe-orange' : 'text-vibe-dark/50'}`}>
              {ideaDescription.length}/1000 characters (minimum 50)
            </p>
          </div>

          {/* Tips */}
          <div className="p-4 bg-vibe-mint/20 rounded-lg border border-vibe-teal/30">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-vibe-teal mt-0.5" />
              <div>
                <p className="text-sm font-medium text-vibe-teal">Tips for a great project idea:</p>
                <ul className="mt-2 text-xs text-vibe-dark/70 space-y-1">
                  <li>• Clearly define the problem you&apos;re solving</li>
                  <li>• Identify your target users</li>
                  <li>• Think about what makes your solution unique</li>
                  <li>• Consider feasibility within the hackathon timeframe</li>
                  <li>• It&apos;s okay to start simple and iterate!</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
