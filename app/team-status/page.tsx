"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Search, Users, CheckCircle2, Clock, XCircle, ArrowLeft, User, Lightbulb, Tag, Mail, Phone, Building2 } from "lucide-react"
import { supabase, HackathonEntry } from "@/lib/supabase"

export default function TeamStatusPage() {
  const [teamCode, setTeamCode] = useState("")
  const [entryDetails, setEntryDetails] = useState<HackathonEntry | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!teamCode.trim()) {
      setError("Please enter your registration code")
      return
    }

    if (teamCode.length !== 6) {
      setError("Code must be 6 characters")
      return
    }

    if (!supabase) {
      setError("Database connection not available")
      return
    }

    setLoading(true)
    setError("")
    setSearched(true)

    try {
      const { data: entry, error: entryError } = await supabase
        .from('hackathon_entries')
        .select('*')
        .eq('team_code', teamCode.toUpperCase())
        .single()

      if (entryError || !entry) {
        setEntryDetails(null)
        setError("Registration not found. Please check the code and try again.")
        setLoading(false)
        return
      }

      setEntryDetails(entry as HackathonEntry)
    } catch (err) {
      console.error('Error:', err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bg: 'bg-green-100',
          border: 'border-green-200',
          label: 'Approved'
        }
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-vibe-red',
          bg: 'bg-vibe-red/10',
          border: 'border-vibe-red/30',
          label: 'Rejected'
        }
      case 'pending':
      default:
        return {
          icon: Clock,
          color: 'text-vibe-orange',
          bg: 'bg-vibe-orange/10',
          border: 'border-vibe-orange/30',
          label: 'Pending Review'
        }
    }
  }

  const isTeam = entryDetails?.entry_type === 'team'
  const members = entryDetails?.members || []
  const leader = members.find(m => m.is_leader)

  return (
    <div className="min-h-screen bg-vibe-cream relative">
      {/* Background Elements */}
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-vibe-mint/30 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-vibe-blush/30 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-vibe-teal/20 rounded-full blur-xl animate-float" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-vibe-dark/60 hover:text-vibe-teal transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Registration
        </Link>

        <div className="text-center mb-8">
          <Image
            src="/header.png"
            alt="Vibe-a-thon"
            width={300}
            height={80}
            className="mx-auto mb-4"
            priority
          />
          <h1 className="text-2xl font-bold text-vibe-dark mb-2">Registration Status Portal</h1>
          <p className="text-vibe-dark/60">Check your hackathon registration status</p>
        </div>

        <Card className="mb-8 border-2 border-vibe-teal/20 shadow-lg bg-white/80">
          <CardHeader>
            <CardTitle className="text-vibe-teal flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Your Registration
            </CardTitle>
            <CardDescription>
              Enter your 6-character registration code to view status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-3">
              <Input
                type="text"
                placeholder="e.g., ABC123"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="text-center text-xl tracking-[0.2em] font-bold uppercase flex-1 border-vibe-mint focus:border-vibe-teal"
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-vibe-teal hover:bg-vibe-teal/90 text-white px-6"
              >
                {loading ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </Button>
            </form>
            {error && (
              <p className="text-vibe-red text-sm mt-3 text-center">{error}</p>
            )}
          </CardContent>
        </Card>

        {searched && !loading && entryDetails && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
            <Card className={`border-2 ${getStatusConfig(entryDetails.status || 'pending').border} bg-white/80`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        isTeam ? 'bg-vibe-teal/20 text-vibe-teal' : 'bg-vibe-orange/20 text-vibe-orange'
                      }`}>
                        {isTeam ? '👥 Team Entry' : '👤 Individual Entry'}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-vibe-dark">
                      {isTeam ? entryDetails.team_name : leader?.full_name || 'Unknown'}
                    </h2>
                    <p className="text-vibe-dark/50 font-mono">Code: {entryDetails.team_code}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusConfig(entryDetails.status || 'pending').bg}`}>
                    {(() => {
                      const StatusIcon = getStatusConfig(entryDetails.status || 'pending').icon
                      return <StatusIcon className={`w-5 h-5 ${getStatusConfig(entryDetails.status || 'pending').color}`} />
                    })()}
                    <span className={`font-semibold ${getStatusConfig(entryDetails.status || 'pending').color}`}>
                      {getStatusConfig(entryDetails.status || 'pending').label}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg mb-6 bg-vibe-mint/20 border border-vibe-teal/20">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-vibe-teal" />
                    <span className="font-medium text-vibe-teal">
                      {members.length} {members.length === 1 ? 'Participant' : 'Participants'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-vibe-orange mt-1" />
                    <div>
                      <p className="font-semibold text-vibe-dark">Project Idea</p>
                      <p className="text-vibe-dark/70">{entryDetails.idea_title}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-vibe-teal mt-1" />
                    <div>
                      <p className="font-semibold text-vibe-dark">Category</p>
                      <p className="text-vibe-dark/70">{entryDetails.idea_category}</p>
                    </div>
                  </div>
                  <div className="bg-vibe-light/50 rounded-lg p-4">
                    <p className="font-semibold text-vibe-dark mb-2">Description</p>
                    <p className="text-vibe-dark/70 text-sm leading-relaxed">{entryDetails.idea_description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-vibe-mint/30 bg-white/80">
              <CardHeader>
                <CardTitle className="text-vibe-dark flex items-center gap-2">
                  <Users className="w-5 h-5 text-vibe-teal" />
                  {isTeam ? 'Team Members' : 'Participant Details'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {members.length > 0 ? (
                  <div className="space-y-4">
                    {members.map((member, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg transition-all ${
                          member.is_leader 
                            ? 'bg-vibe-orange/10 border border-vibe-orange/30' 
                            : 'bg-vibe-light/30'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            member.is_leader ? 'bg-vibe-orange text-white' : 'bg-vibe-mint text-vibe-teal'
                          }`}>
                            <User className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-vibe-dark">{member.full_name}</p>
                              {member.is_leader && (
                                <span className="text-xs bg-vibe-orange text-white px-2 py-0.5 rounded-full">
                                  {isTeam ? 'Team Leader' : 'Registered'}
                                </span>
                              )}
                            </div>
                            <div className="mt-2 space-y-1 text-sm text-vibe-dark/60">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-vibe-dark/40" />
                                <span className="truncate">{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-vibe-dark/40" />
                                <span>{member.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-vibe-dark/40" />
                                <span>{member.college}</span>
                              </div>
                              <div className="text-xs text-vibe-dark/50">
                                {member.department} • Semester {member.semester}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-vibe-dark/50 py-4">No participant details found</p>
                )}
              </CardContent>
            </Card>

            <div className="bg-vibe-mint/20 border border-vibe-teal/30 rounded-lg p-4 text-center">
              <p className="text-sm text-vibe-dark/70">
                🚀 Status updates will be reflected here. Check back for any announcements!
              </p>
            </div>
          </div>
        )}

        {searched && !loading && !entryDetails && !error && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-vibe-dark/20 mx-auto mb-4" />
            <p className="text-vibe-dark/50">No registration found with that code</p>
          </div>
        )}
      </div>
    </div>
  )
}
