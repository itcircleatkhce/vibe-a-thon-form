"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { User, UserPlus, Trash2, Crown, AlertCircle } from "lucide-react"
import { TeamMember } from "@/lib/supabase"

const COLLEGES = [
  "Khwopa College of Engineering",
  "Khwopa Engineering College",
]

const DEPARTMENTS = [
  "Computer Engineering",
  "Electronics Engineering",
  "Civil Engineering",
  "Architecture",
  "Electrical Engineering",
  "Information Technology",
  "Software Engineering",
]

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

interface MembersSectionProps {
  members: TeamMember[]
  updateMember: (index: number, field: keyof TeamMember, value: string | boolean) => void
  addMember: () => void
  removeMember: (index: number) => void
  errors: Record<string, string>
  isTeam: boolean
}

export function MembersSection({ 
  members, 
  updateMember, 
  addMember, 
  removeMember, 
  errors, 
  isTeam 
}: MembersSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-vibe-dark">
          {isTeam ? "Team Members" : "Your Details"}
        </h2>
        <p className="text-vibe-dark/60">
          {isTeam 
            ? "Add all team members (2-4 people). Mark one person as team leader." 
            : "Fill in your personal information"}
        </p>
      </div>

      {/* Error alerts */}
      {(errors.members || errors.members_duplicate || errors.members_leader) && (
        <div className="p-4 bg-vibe-red/10 border border-vibe-red/30 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-vibe-red flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            {errors.members && <p className="text-vibe-red text-sm">{errors.members}</p>}
            {errors.members_duplicate && <p className="text-vibe-red text-sm">{errors.members_duplicate}</p>}
            {errors.members_leader && <p className="text-vibe-red text-sm">{errors.members_leader}</p>}
          </div>
        </div>
      )}

      {/* Member Cards */}
      <div className="space-y-4">
        {members.map((member, index) => (
          <Card key={index} className={`bg-white/80 border-vibe-mint/50 ${
            member.is_leader ? 'ring-2 ring-vibe-orange/50 border-vibe-orange' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-vibe-dark flex items-center gap-2 text-lg">
                  {member.is_leader ? (
                    <Crown className="w-5 h-5 text-vibe-orange" />
                  ) : (
                    <User className="w-5 h-5 text-vibe-teal" />
                  )}
                  {isTeam ? `Member ${index + 1}` : "Your Information"}
                  {member.is_leader && (
                    <span className="text-xs bg-vibe-orange text-white px-2 py-0.5 rounded-full">
                      Team Leader
                    </span>
                  )}
                </CardTitle>
                
                {isTeam && members.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMember(index)}
                    className="text-vibe-red hover:text-vibe-dark-red hover:bg-vibe-red/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label className="text-vibe-dark">
                    Full Name <span className="text-vibe-red">*</span>
                  </Label>
                  <Input
                    value={member.full_name}
                    onChange={(e) => updateMember(index, 'full_name', e.target.value)}
                    placeholder="Enter full name"
                    className={`bg-white border-vibe-mint text-vibe-dark placeholder:text-vibe-dark/40 ${
                      errors[`member_${index}_name`] || errors.full_name ? 'border-vibe-red' : ''
                    }`}
                  />
                  {(errors[`member_${index}_name`] || errors.full_name) && (
                    <p className="text-vibe-red text-xs">{errors[`member_${index}_name`] || errors.full_name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-vibe-dark">
                    Email <span className="text-vibe-red">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={member.email}
                    onChange={(e) => updateMember(index, 'email', e.target.value)}
                    placeholder="email@example.com"
                    className={`bg-white border-vibe-mint text-vibe-dark placeholder:text-vibe-dark/40 ${
                      errors[`member_${index}_email`] || errors.email ? 'border-vibe-red' : ''
                    }`}
                  />
                  {(errors[`member_${index}_email`] || errors.email) && (
                    <p className="text-vibe-red text-xs">{errors[`member_${index}_email`] || errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="text-vibe-dark">
                    Phone Number <span className="text-vibe-red">*</span>
                  </Label>
                  <Input
                    value={member.phone}
                    onChange={(e) => updateMember(index, 'phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98XXXXXXXX"
                    className={`bg-white border-vibe-mint text-vibe-dark placeholder:text-vibe-dark/40 ${
                      errors[`member_${index}_phone`] || errors.phone ? 'border-vibe-red' : ''
                    }`}
                  />
                  {(errors[`member_${index}_phone`] || errors.phone) && (
                    <p className="text-vibe-red text-xs">{errors[`member_${index}_phone`] || errors.phone}</p>
                  )}
                </div>

                {/* College */}
                <div className="space-y-2">
                  <Label className="text-vibe-dark">
                    College <span className="text-vibe-red">*</span>
                  </Label>
                  <Select
                    value={member.college}
                    onValueChange={(value) => updateMember(index, 'college', value)}
                  >
                    <SelectTrigger className={`bg-white border-vibe-mint text-vibe-dark ${
                      errors[`member_${index}_college`] || errors.college ? 'border-vibe-red' : ''
                    }`}>
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-vibe-mint">
                      {COLLEGES.map((college) => (
                        <SelectItem key={college} value={college} className="text-vibe-dark hover:bg-vibe-mint/20">
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(errors[`member_${index}_college`] || errors.college) && (
                    <p className="text-vibe-red text-xs">{errors[`member_${index}_college`] || errors.college}</p>
                  )}
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label className="text-vibe-dark">
                    Department <span className="text-vibe-red">*</span>
                  </Label>
                  <Select
                    value={member.department}
                    onValueChange={(value) => updateMember(index, 'department', value)}
                  >
                    <SelectTrigger className={`bg-white border-vibe-mint text-vibe-dark ${
                      errors[`member_${index}_department`] || errors.department ? 'border-vibe-red' : ''
                    }`}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-vibe-mint">
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept} className="text-vibe-dark hover:bg-vibe-mint/20">
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(errors[`member_${index}_department`] || errors.department) && (
                    <p className="text-vibe-red text-xs">{errors[`member_${index}_department`] || errors.department}</p>
                  )}
                </div>

                {/* Semester */}
                <div className="space-y-2">
                  <Label className="text-vibe-dark">
                    Semester <span className="text-vibe-red">*</span>
                  </Label>
                  <Select
                    value={member.semester}
                    onValueChange={(value) => updateMember(index, 'semester', value)}
                  >
                    <SelectTrigger className={`bg-white border-vibe-mint text-vibe-dark ${
                      errors[`member_${index}_semester`] || errors.semester ? 'border-vibe-red' : ''
                    }`}>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-vibe-mint">
                      {SEMESTERS.map((sem) => (
                        <SelectItem key={sem} value={sem} className="text-vibe-dark hover:bg-vibe-mint/20">
                          {sem} Semester
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(errors[`member_${index}_semester`] || errors.semester) && (
                    <p className="text-vibe-red text-xs">{errors[`member_${index}_semester`] || errors.semester}</p>
                  )}
                </div>
              </div>

              {/* Team Leader Checkbox (only for teams) */}
              {isTeam && (
                <div className="flex items-center space-x-2 pt-2 border-t border-vibe-mint/30">
                  <Checkbox
                    id={`leader_${index}`}
                    checked={member.is_leader}
                    onCheckedChange={(checked) => {
                      // If checking this one, uncheck others
                      if (checked) {
                        members.forEach((_, i) => {
                          if (i !== index) updateMember(i, 'is_leader', false)
                        })
                      }
                      updateMember(index, 'is_leader', checked === true)
                    }}
                    className="border-vibe-orange data-[state=checked]:bg-vibe-orange"
                  />
                  <Label htmlFor={`leader_${index}`} className="text-vibe-dark cursor-pointer">
                    Designate as Team Leader
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Member Button (only for teams with less than 4 members) */}
      {isTeam && members.length < 4 && (
        <Button
          type="button"
          variant="outline"
          onClick={addMember}
          className="w-full border-dashed border-vibe-teal/50 text-vibe-teal hover:bg-vibe-teal/10 hover:border-vibe-teal"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team Member ({members.length}/4)
        </Button>
      )}

      {isTeam && (
        <p className="text-center text-vibe-dark/50 text-sm">
          Teams must have 2-4 members. Currently: {members.length} member{members.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
