"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, User, CheckCircle2 } from "lucide-react"

interface EntryTypeSelectionProps {
  value: string
  onChange: (type: 'team' | 'individual') => void
  error?: string
}

export function EntryTypeSelection({ value, onChange, error }: EntryTypeSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-vibe-dark">How do you want to participate?</h2>
        <p className="text-vibe-dark/60">Choose your registration type to get started</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Team Registration */}
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
            value === 'team'
              ? 'bg-gradient-to-br from-vibe-teal/20 to-vibe-mint/30 border-vibe-teal ring-2 ring-vibe-teal/50'
              : 'bg-white/80 border-vibe-mint/50 hover:border-vibe-teal/50'
          }`}
          onClick={() => onChange('team')}
        >
          <CardHeader className="text-center pb-2">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
              value === 'team' ? 'bg-vibe-teal' : 'bg-vibe-mint/50'
            }`}>
              <Users className={`w-8 h-8 ${value === 'team' ? 'text-white' : 'text-vibe-teal'}`} />
            </div>
            <CardTitle className={`text-xl ${value === 'team' ? 'text-vibe-teal' : 'text-vibe-dark'}`}>
              Team Registration
            </CardTitle>
            <CardDescription className={value === 'team' ? 'text-vibe-dark/70' : 'text-vibe-dark/50'}>
              Register with your team (2-4 members)
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className={`space-y-2 text-sm ${value === 'team' ? 'text-vibe-dark/80' : 'text-vibe-dark/60'}`}>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vibe-teal" />
                Add all team members at once
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vibe-teal" />
                Submit your project idea together
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vibe-teal" />
                Get a unique team code
              </li>
            </ul>
            {value === 'team' && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1 text-vibe-teal text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Selected
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Individual Registration */}
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
            value === 'individual'
              ? 'bg-gradient-to-br from-vibe-orange/20 to-vibe-blush/30 border-vibe-orange ring-2 ring-vibe-orange/50'
              : 'bg-white/80 border-vibe-mint/50 hover:border-vibe-orange/50'
          }`}
          onClick={() => onChange('individual')}
        >
          <CardHeader className="text-center pb-2">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
              value === 'individual' ? 'bg-vibe-orange' : 'bg-vibe-blush/50'
            }`}>
              <User className={`w-8 h-8 ${value === 'individual' ? 'text-white' : 'text-vibe-orange'}`} />
            </div>
            <CardTitle className={`text-xl ${value === 'individual' ? 'text-vibe-orange' : 'text-vibe-dark'}`}>
              Individual Registration
            </CardTitle>
            <CardDescription className={value === 'individual' ? 'text-vibe-dark/70' : 'text-vibe-dark/50'}>
              Register solo, we&apos;ll help find you a team
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className={`space-y-2 text-sm ${value === 'individual' ? 'text-vibe-dark/80' : 'text-vibe-dark/60'}`}>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vibe-orange" />
                Register with your own details
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vibe-orange" />
                Pitch your project idea
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vibe-orange" />
                Get matched with other individuals
              </li>
            </ul>
            {value === 'individual' && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1 text-vibe-orange text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Selected
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {error && (
        <p className="text-vibe-red text-sm text-center">{error}</p>
      )}
    </div>
  )
}
