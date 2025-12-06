"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, User, Clock, CheckCircle, XCircle, Download, LogOut, Eye, RefreshCw, Shield } from "lucide-react"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface TeamMember {
  full_name: string
  email: string
  phone: string
  college: string
  department: string
  semester: string
  is_leader: boolean
}

interface HackathonEntry {
  id: string
  entry_type: 'team' | 'individual'
  team_name: string | null
  team_code: string | null
  idea_title: string
  idea_description: string
  idea_category: string
  members: TeamMember[]
  status: string
  created_at: string
}

const ADMIN_PASSWORD = "vibeathon2025"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [entries, setEntries] = useState<HackathonEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const saved = sessionStorage.getItem("adminAuth")
    if (saved === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("adminAuth", "true")
      setError("")
    } else {
      setError("Invalid password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("adminAuth")
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("hackathon_entries")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) setEntries(data)
      if (error) console.error("Error fetching:", error)
    } catch (err) {
      console.error("Error fetching data:", err)
    }
    setLoading(false)
  }

  const updateStatus = async (entryId: string, newStatus: string) => {
    const { error } = await supabase
      .from("hackathon_entries")
      .update({ status: newStatus })
      .eq("id", entryId)

    if (!error) {
      setEntries(entries.map(e => e.id === entryId ? { ...e, status: newStatus } : e))
    }
  }

  const getFilteredEntries = () => {
    if (activeTab === "teams") return entries.filter(e => e.entry_type === "team")
    if (activeTab === "individuals") return entries.filter(e => e.entry_type === "individual")
    return entries
  }

  const filteredEntries = getFilteredEntries()

  const totalEntries = entries.length
  const teamEntries = entries.filter(e => e.entry_type === "team").length
  const individualEntries = entries.filter(e => e.entry_type === "individual").length
  const totalParticipants = entries.reduce((acc, e) => acc + e.members.length, 0)
  const pendingCount = entries.filter(e => !e.status || e.status === "pending").length

  const exportCSV = () => {
    const headers = ["Type", "Team Name", "Team Code", "Idea Title", "Category", "Status", "Members", "Leader", "Created At"]
    const rows = entries.map(e => {
      const leader = e.members.find(m => m.is_leader)
      return [
        e.entry_type,
        e.team_name || "N/A",
        e.team_code || "N/A",
        `"${e.idea_title}"`,
        e.idea_category,
        e.status || "pending",
        e.members.length,
        leader ? leader.full_name : "N/A",
        new Date(e.created_at).toLocaleString()
      ]
    })
    
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "hackathon_entries.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportDetailedCSV = () => {
    const headers = ["Entry Type", "Team Name", "Team Code", "Member Name", "Email", "Phone", "College", "Department", "Semester", "Is Leader", "Idea Title", "Category", "Status"]
    const rows: string[][] = []
    
    entries.forEach(e => {
      e.members.forEach(m => {
        rows.push([
          e.entry_type,
          e.team_name || "N/A",
          e.team_code || "N/A",
          m.full_name,
          m.email,
          m.phone,
          m.college,
          m.department,
          m.semester,
          m.is_leader ? "Yes" : "No",
          `"${e.idea_title}"`,
          e.idea_category,
          e.status || "pending"
        ])
      })
    })
    
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "hackathon_participants.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vibe-cream p-4">
        <Card className="w-full max-w-md bg-white/80 border-vibe-mint">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-vibe-teal/20 rounded-full flex items-center justify-center mb-2">
              <Shield className="w-6 h-6 text-vibe-teal" />
            </div>
            <CardTitle className="text-2xl text-vibe-dark">Admin Login</CardTitle>
            <CardDescription className="text-vibe-dark/60">
              Enter password to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-vibe-dark">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-vibe-mint text-vibe-dark"
                  placeholder="Enter admin password"
                />
              </div>
              {error && <p className="text-vibe-red text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-vibe-teal hover:bg-vibe-teal/90 text-white">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vibe-cream p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-vibe-dark flex items-center gap-2">
              <Shield className="w-8 h-8 text-vibe-teal" />
              Hackathon Admin
            </h1>
            <p className="text-vibe-dark/60">Manage registrations and participants</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchData} className="border-vibe-mint text-vibe-dark hover:bg-vibe-mint/20">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleLogout} className="border-vibe-mint text-vibe-dark hover:bg-vibe-mint/20">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-white/80 border-vibe-mint">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-vibe-teal/20 rounded-lg">
                <Users className="w-5 h-5 text-vibe-teal" />
              </div>
              <div>
                <p className="text-2xl font-bold text-vibe-dark">{totalEntries}</p>
                <p className="text-xs text-vibe-dark/60">Total Entries</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-vibe-mint">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-vibe-teal/20 rounded-lg">
                <Users className="w-5 h-5 text-vibe-teal" />
              </div>
              <div>
                <p className="text-2xl font-bold text-vibe-dark">{teamEntries}</p>
                <p className="text-xs text-vibe-dark/60">Teams</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-vibe-mint">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-vibe-orange/20 rounded-lg">
                <User className="w-5 h-5 text-vibe-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-vibe-dark">{individualEntries}</p>
                <p className="text-xs text-vibe-dark/60">Individuals</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-vibe-mint">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-vibe-mint/50 rounded-lg">
                <User className="w-5 h-5 text-vibe-teal" />
              </div>
              <div>
                <p className="text-2xl font-bold text-vibe-dark">{totalParticipants}</p>
                <p className="text-xs text-vibe-dark/60">Participants</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-vibe-mint">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-vibe-blush/50 rounded-lg">
                <Clock className="w-5 h-5 text-vibe-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-vibe-dark">{pendingCount}</p>
                <p className="text-xs text-vibe-dark/60">Pending</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button onClick={exportCSV} variant="outline" className="border-vibe-teal text-vibe-teal hover:bg-vibe-teal/10">
            <Download className="w-4 h-4 mr-2" />
            Export Summary
          </Button>
          <Button onClick={exportDetailedCSV} variant="outline" className="border-vibe-orange text-vibe-orange hover:bg-vibe-orange/10">
            <Download className="w-4 h-4 mr-2" />
            Export Detailed
          </Button>
        </div>

        <Card className="bg-white/80 border-vibe-mint">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-vibe-dark">Registrations</CardTitle>
                <TabsList className="bg-vibe-light">
                  <TabsTrigger value="all" className="data-[state=active]:bg-vibe-teal data-[state=active]:text-white">
                    All ({totalEntries})
                  </TabsTrigger>
                  <TabsTrigger value="teams" className="data-[state=active]:bg-vibe-teal data-[state=active]:text-white">
                    Teams ({teamEntries})
                  </TabsTrigger>
                  <TabsTrigger value="individuals" className="data-[state=active]:bg-vibe-teal data-[state=active]:text-white">
                    Individuals ({individualEntries})
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value={activeTab} className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-vibe-mint/50">
                        <TableHead className="text-vibe-dark">Type</TableHead>
                        <TableHead className="text-vibe-dark">Name/Team</TableHead>
                        <TableHead className="text-vibe-dark">Code</TableHead>
                        <TableHead className="text-vibe-dark">Idea</TableHead>
                        <TableHead className="text-vibe-dark">Members</TableHead>
                        <TableHead className="text-vibe-dark">Status</TableHead>
                        <TableHead className="text-vibe-dark">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map((entry) => (
                        <>
                          <TableRow key={entry.id} className="border-vibe-mint/30 hover:bg-vibe-mint/10">
                            <TableCell>
                              <Badge variant={entry.entry_type === 'team' ? 'default' : 'secondary'}
                                className={entry.entry_type === 'team' 
                                  ? 'bg-vibe-teal text-white' 
                                  : 'bg-vibe-orange text-white'}>
                                {entry.entry_type === 'team' ? (
                                  <><Users className="w-3 h-3 mr-1" /> Team</>
                                ) : (
                                  <><User className="w-3 h-3 mr-1" /> Solo</>
                                )}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-vibe-dark font-medium">
                              {entry.entry_type === 'team' 
                                ? entry.team_name 
                                : entry.members[0]?.full_name || 'N/A'}
                            </TableCell>
                            <TableCell className="font-mono text-vibe-teal">
                              {entry.team_code || '-'}
                            </TableCell>
                            <TableCell className="text-vibe-dark max-w-[200px] truncate">
                              {entry.idea_title}
                            </TableCell>
                            <TableCell className="text-vibe-dark">
                              {entry.members.length}
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                entry.status === 'approved' ? 'bg-green-500 text-white' :
                                entry.status === 'rejected' ? 'bg-vibe-red text-white' :
                                'bg-vibe-blush text-vibe-dark'
                              }>
                                {entry.status || 'pending'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}
                                  className="text-vibe-teal hover:bg-vibe-teal/10"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => updateStatus(entry.id, 'approved')}
                                  className="text-green-600 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => updateStatus(entry.id, 'rejected')}
                                  className="text-vibe-red hover:bg-vibe-red/10"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          
                          {selectedEntry === entry.id && (
                            <TableRow className="bg-vibe-light/50">
                              <TableCell colSpan={7}>
                                <div className="p-4 space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold text-vibe-dark mb-2">Project Details</h4>
                                      <p className="text-sm text-vibe-dark/60"><strong>Category:</strong> {entry.idea_category}</p>
                                      <p className="text-sm text-vibe-dark/60 mt-2"><strong>Description:</strong></p>
                                      <p className="text-sm text-vibe-dark/80 mt-1">{entry.idea_description}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-vibe-dark mb-2">Members ({entry.members.length})</h4>
                                      <div className="space-y-2">
                                        {entry.members.map((member, idx) => (
                                          <div key={idx} className={`p-2 rounded text-sm ${member.is_leader ? 'bg-vibe-orange/10 border border-vibe-orange/30' : 'bg-white'}`}>
                                            <p className="font-medium text-vibe-dark">
                                              {member.full_name}
                                              {member.is_leader && <Badge className="ml-2 bg-vibe-orange text-white text-xs">Leader</Badge>}
                                            </p>
                                            <p className="text-vibe-dark/60 text-xs">{member.email} • {member.phone}</p>
                                            <p className="text-vibe-dark/60 text-xs">{member.college} • {member.department} • {member.semester}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {filteredEntries.length === 0 && (
                  <div className="text-center py-12 text-vibe-dark/50">
                    No entries found
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
