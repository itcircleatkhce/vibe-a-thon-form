"use client"

import { useState, useEffect } from "react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Lock, Users, Eye, EyeOff, RefreshCw, Download, LogOut } from "lucide-react"

// Set your admin password here (in production, use environment variable)
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "vibeathon2025"

interface Registration {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string
  college: string
  department: string
  semester: string
  coding_experience: string
  preferred_tools: string[]
  interest_areas: string[]
  team_preference: string
  project_idea: string
  expectations: string
  availability: string
  dietary_restrictions: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)

  // Check session storage for existing auth
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch registrations when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin_authenticated", "true")
      setError("")
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_authenticated")
    setRegistrations([])
    setPassword("")
  }

  const fetchRegistrations = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setError("Supabase is not configured")
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching registrations:", error)
        setError("Failed to fetch registrations: " + error.message)
      } else {
        setRegistrations(data || [])
      }
    } catch (err) {
      console.error("Error:", err)
      setError("An error occurred while fetching data")
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (registrations.length === 0) return

    const headers = [
      "ID", "Created At", "Full Name", "Email", "Phone", "College", 
      "Department", "Semester", "Coding Experience", "Preferred Tools",
      "Interest Areas", "Team Preference", "Project Idea", "Expectations",
      "Availability", "Dietary Restrictions"
    ]

    const csvContent = [
      headers.join(","),
      ...registrations.map(r => [
        r.id,
        new Date(r.created_at).toLocaleString(),
        `"${r.full_name}"`,
        r.email,
        r.phone,
        `"${r.college}"`,
        `"${r.department}"`,
        r.semester,
        r.coding_experience,
        `"${(r.preferred_tools || []).join("; ")}"`,
        `"${(r.interest_areas || []).join("; ")}"`,
        r.team_preference,
        `"${(r.project_idea || "").replace(/"/g, '""')}"`,
        `"${(r.expectations || "").replace(/"/g, '""')}"`,
        r.availability,
        `"${r.dietary_restrictions || ""}"`
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `vibe-a-thon-registrations-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vibe-cream to-vibe-mint/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-vibe-teal/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-vibe-teal" />
            </div>
            <CardTitle className="text-2xl text-vibe-dark">Admin Access</CardTitle>
            <CardDescription>Enter password to view registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-vibe-dark/50 hover:text-vibe-dark"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && (
                <p className="text-sm text-vibe-red">{error}</p>
              )}
              <Button type="submit" className="w-full bg-vibe-teal hover:bg-vibe-teal/90">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-vibe-cream to-vibe-mint/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-vibe-mint/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-vibe-teal" />
            <h1 className="text-xl font-bold text-vibe-dark">Vibe-a-thon Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRegistrations}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              disabled={registrations.length === 0}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-vibe-red border-vibe-red/30 hover:bg-vibe-red/10"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-vibe-teal/20 rounded-full">
                  <Users className="w-6 h-6 text-vibe-teal" />
                </div>
                <div>
                  <p className="text-sm text-vibe-dark/60">Total Registrations</p>
                  <p className="text-3xl font-bold text-vibe-dark">{registrations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-vibe-mint/30 rounded-full">
                  <Users className="w-6 h-6 text-vibe-teal" />
                </div>
                <div>
                  <p className="text-sm text-vibe-dark/60">Khwopa Engineering College</p>
                  <p className="text-3xl font-bold text-vibe-dark">
                    {registrations.filter(r => r.college === "Khwopa Engineering College").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-vibe-blush/30 rounded-full">
                  <Users className="w-6 h-6 text-vibe-red" />
                </div>
                <div>
                  <p className="text-sm text-vibe-dark/60">Khwopa College of Engineering</p>
                  <p className="text-3xl font-bold text-vibe-dark">
                    {registrations.filter(r => r.college === "Khwopa College of Engineering").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-vibe-red/10 border border-vibe-red/30 rounded-lg text-vibe-red">
            {error}
          </div>
        )}

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Registrations</CardTitle>
            <CardDescription>Click on a row to view full details</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-vibe-teal mb-4" />
                <p className="text-vibe-dark/60">Loading registrations...</p>
              </div>
            ) : registrations.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-vibe-dark/30 mb-4" />
                <p className="text-vibe-dark/60">No registrations yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-vibe-mint/30">
                      <th className="text-left py-3 px-4 font-medium text-vibe-dark/70">#</th>
                      <th className="text-left py-3 px-4 font-medium text-vibe-dark/70">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-vibe-dark/70">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-vibe-dark/70">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-vibe-dark/70">College</th>
                      <th className="text-left py-3 px-4 font-medium text-vibe-dark/70">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-vibe-dark/70">Semester</th>
                      <th className="text-left py-3 px-4 font-medium text-vibe-dark/70">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, index) => (
                      <tr
                        key={reg.id}
                        onClick={() => setSelectedRegistration(reg)}
                        className="border-b border-vibe-mint/20 hover:bg-vibe-mint/10 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 text-vibe-dark/60">{index + 1}</td>
                        <td className="py-3 px-4 font-medium text-vibe-dark">{reg.full_name}</td>
                        <td className="py-3 px-4 text-vibe-dark/80">{reg.email}</td>
                        <td className="py-3 px-4 text-vibe-dark/80">{reg.phone}</td>
                        <td className="py-3 px-4 text-vibe-dark/80">{reg.college}</td>
                        <td className="py-3 px-4 text-vibe-dark/80">{reg.department}</td>
                        <td className="py-3 px-4 text-vibe-dark/80">{reg.semester}</td>
                        <td className="py-3 px-4 text-vibe-dark/60">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Modal */}
        {selectedRegistration && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedRegistration(null)}
          >
            <Card
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-vibe-dark">{selectedRegistration.full_name}</CardTitle>
                  <CardDescription>Registration Details</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRegistration(null)}
                >
                  ✕
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-vibe-dark/60">Email</p>
                    <p className="font-medium">{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-vibe-dark/60">Phone</p>
                    <p className="font-medium">{selectedRegistration.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-vibe-dark/60">College</p>
                    <p className="font-medium">{selectedRegistration.college}</p>
                  </div>
                  <div>
                    <p className="text-sm text-vibe-dark/60">Department</p>
                    <p className="font-medium">{selectedRegistration.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-vibe-dark/60">Semester</p>
                    <p className="font-medium">{selectedRegistration.semester}</p>
                  </div>
                  <div>
                    <p className="text-sm text-vibe-dark/60">Coding Experience</p>
                    <p className="font-medium">{selectedRegistration.coding_experience || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-vibe-dark/60">Team Preference</p>
                    <p className="font-medium">{selectedRegistration.team_preference || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-vibe-dark/60">Availability</p>
                    <p className="font-medium">{selectedRegistration.availability || "N/A"}</p>
                  </div>
                </div>

                {selectedRegistration.preferred_tools?.length > 0 && (
                  <div>
                    <p className="text-sm text-vibe-dark/60 mb-2">Preferred Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegistration.preferred_tools.map((tool) => (
                        <span key={tool} className="px-2 py-1 bg-vibe-mint/30 rounded text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRegistration.interest_areas?.length > 0 && (
                  <div>
                    <p className="text-sm text-vibe-dark/60 mb-2">Interest Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegistration.interest_areas.map((area) => (
                        <span key={area} className="px-2 py-1 bg-vibe-blush/30 rounded text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRegistration.project_idea && (
                  <div>
                    <p className="text-sm text-vibe-dark/60 mb-1">Project Idea</p>
                    <p className="text-vibe-dark bg-vibe-cream/50 p-3 rounded">
                      {selectedRegistration.project_idea}
                    </p>
                  </div>
                )}

                {selectedRegistration.expectations && (
                  <div>
                    <p className="text-sm text-vibe-dark/60 mb-1">Expectations</p>
                    <p className="text-vibe-dark bg-vibe-cream/50 p-3 rounded">
                      {selectedRegistration.expectations}
                    </p>
                  </div>
                )}

                {selectedRegistration.dietary_restrictions && (
                  <div>
                    <p className="text-sm text-vibe-dark/60 mb-1">Dietary Restrictions</p>
                    <p className="font-medium">{selectedRegistration.dietary_restrictions}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-vibe-mint/30 text-sm text-vibe-dark/50">
                  Registered on: {new Date(selectedRegistration.created_at).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
