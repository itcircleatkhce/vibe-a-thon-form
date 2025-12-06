"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Sparkles } from "lucide-react"

interface TeamInfoSectionProps {
  teamName: string
  onChange: (name: string) => void
  error?: string
}

export function TeamInfoSection({ teamName, onChange, error }: TeamInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-vibe-dark">Name Your Team</h2>
        <p className="text-vibe-dark/60">Choose a creative name that represents your team</p>
      </div>

      <Card className="bg-white/80 border-vibe-mint/50">
        <CardHeader>
          <CardTitle className="text-vibe-teal flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Details
          </CardTitle>
          <CardDescription className="text-vibe-dark/60">
            This name will be displayed on the leaderboard and certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team_name" className="text-vibe-dark">
                Team Name <span className="text-vibe-red">*</span>
              </Label>
              <Input
                id="team_name"
                value={teamName}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your team name (e.g., Code Crushers)"
                className={`bg-white border-vibe-mint text-vibe-dark placeholder:text-vibe-dark/40 ${
                  error ? 'border-vibe-red' : 'focus:border-vibe-teal'
                }`}
                maxLength={50}
              />
              {error && <p className="text-vibe-red text-sm">{error}</p>}
              <p className="text-xs text-vibe-dark/50">{teamName.length}/50 characters</p>
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-vibe-mint/20 rounded-lg border border-vibe-teal/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-vibe-teal mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-vibe-teal">Tips for a great team name:</p>
                  <ul className="mt-2 text-xs text-vibe-dark/70 space-y-1">
                    <li>• Keep it short and memorable</li>
                    <li>• Avoid special characters</li>
                    <li>• Make it relevant to your project or skills</li>
                    <li>• Be creative and have fun!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
