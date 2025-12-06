"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy, Users, User, PartyPopper, Search } from "lucide-react"
import { useState } from "react"

interface SuccessScreenProps {
  entryType: 'team' | 'individual'
  teamName: string
  teamCode: string
  message: string
  onReset: () => void
}

export function SuccessScreen({ entryType, teamName, teamCode, message, onReset }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false)

  const copyTeamCode = () => {
    if (teamCode) {
      navigator.clipboard.writeText(teamCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-vibe-teal/20 to-vibe-mint/30 border-vibe-teal/30 overflow-hidden">
        {/* Celebration header */}
        <div className="relative bg-gradient-to-r from-vibe-teal to-vibe-orange p-8 text-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-4 text-4xl">🎉</div>
            <div className="absolute top-4 right-8 text-3xl">✨</div>
            <div className="absolute bottom-2 left-8 text-3xl">🚀</div>
            <div className="absolute bottom-4 right-4 text-4xl">🎊</div>
          </div>
          <div className="relative">
            <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Registration Successful!</h1>
            <p className="text-white/80">{message}</p>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Entry Type Info */}
          <div className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-lg">
            {entryType === 'team' ? (
              <>
                <Users className="w-6 h-6 text-vibe-teal" />
                <div>
                  <p className="text-vibe-dark/60 text-sm">Team Registration</p>
                  <p className="text-vibe-dark font-semibold text-lg">{teamName}</p>
                </div>
              </>
            ) : (
              <>
                <User className="w-6 h-6 text-vibe-orange" />
                <div>
                  <p className="text-vibe-dark/60 text-sm">Individual Registration</p>
                  <p className="text-vibe-dark font-semibold">You&apos;ll be matched with a team!</p>
                </div>
              </>
            )}
          </div>

          {/* Team Code (for teams only) */}
          {entryType === 'team' && teamCode && (
            <Card className="bg-vibe-mint/30 border-vibe-teal/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-vibe-teal text-center">Your Team Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl font-mono font-bold text-vibe-teal tracking-widest bg-white/50 px-6 py-3 rounded-lg">
                    {teamCode}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyTeamCode}
                    className="border-vibe-teal text-vibe-teal hover:bg-vibe-teal/10"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-center text-vibe-dark/60 text-sm mt-3">
                  Save this code! You&apos;ll need it to check your team status.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <div className="space-y-3">
            <h3 className="text-vibe-dark font-semibold flex items-center gap-2">
              <PartyPopper className="w-5 h-5 text-vibe-orange" />
              What&apos;s Next?
            </h3>
            <ul className="space-y-2 text-vibe-dark/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-vibe-teal font-bold">1.</span>
                Check your email for confirmation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-vibe-teal font-bold">2.</span>
                {entryType === 'team' 
                  ? "Share the team code with your team members"
                  : "We'll notify you when you're matched with a team"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-vibe-teal font-bold">3.</span>
                Join our Discord server for updates
              </li>
              <li className="flex items-start gap-2">
                <span className="text-vibe-teal font-bold">4.</span>
                Start brainstorming your project!
              </li>
            </ul>
          </div>

          {/* Check Status Link */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-vibe-mint">
            <Button
              asChild
              className="flex-1 bg-vibe-teal hover:bg-vibe-teal/90 text-white"
            >
              <a href="/team-status">
                <Search className="w-4 h-4 mr-2" />
                Check Team Status
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={onReset}
              className="flex-1 border-vibe-mint text-vibe-dark hover:bg-vibe-mint/20"
            >
              Register Another Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
