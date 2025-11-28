"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Clock, Mail, Phone, Calendar } from "lucide-react"

interface Section1Props {
  formData: {
    full_name: string
    email: string
    phone: string
    college: string
    department: string
    semester: string
  }
  onChange: (field: string, value: string) => void
  errors: Record<string, string>
}

export function Section1Registration({ formData, onChange, errors }: Section1Props) {
  const departments = [
    "Computer Science & Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Data Science",
    "Artificial Intelligence & ML",
    "Other"
  ]

  const semesters = [
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
    "7th Semester",
    "8th Semester"
  ]

  return (
    <div className="space-y-8">
      {/* Event Info Card */}
      <Card className="bg-gradient-to-br from-vibe-mint/20 to-vibe-teal/10 border-vibe-teal/30 group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-teal flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <Calendar className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
            Event Details
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            Join us for an exciting journey into tech!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-[1.02] group">
            <Clock className="w-5 h-5 text-vibe-teal mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <div>
              <p className="font-medium text-vibe-dark">Timing</p>
              <p className="text-sm text-vibe-dark/70">November 29th - December 6th, 2025</p>
              <p className="text-sm text-vibe-dark/70">online and physical session (on holidays)</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-[1.02] group">
            <MapPin className="w-5 h-5 text-vibe-red mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <div>
              <p className="font-medium text-vibe-dark">Venue</p>
              <p className="text-sm text-vibe-dark/70">Khwopa College of Engineering</p>
              <p className="text-sm text-vibe-dark/70">Hall 3</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-[1.02] group">
            <Mail className="w-5 h-5 text-vibe-orange mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <div>
              <p className="font-medium text-vibe-dark">Contact</p>
              <p className="text-sm text-vibe-dark/70">itcirclekhec@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/50 hover:scale-[1.02] group">
            <Phone className="w-5 h-5 text-vibe-maroon mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <div>
              <p className="font-medium text-vibe-dark">Phone</p>
              <p className="text-sm text-vibe-dark/70">+977 9869195454, 9861495924</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topics Covered */}
      <Card className="border-vibe-blush/50 group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-red transition-all duration-500 group-hover/card:translate-x-2">
            Topics & Mediums
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["Git/Github", "Prompt Generation", "AI/ML", "Supabase", "Rest API", "UI/UX Design", "Vercel Deployment", "Mini Hackathon"].map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 bg-vibe-mint/30 text-vibe-dark rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 hover:bg-vibe-mint/50 hover:shadow-md cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Form */}
      <Card className="form-section group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-dark transition-all duration-500 group-hover/card:translate-x-2">
            Personal Information
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            Please fill in your details to register
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-vibe-dark">
                Full Name <span className="text-vibe-red" aria-hidden="true">*</span>
              </Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={(e) => onChange("full_name", e.target.value)}
                aria-required="true"
                aria-invalid={!!errors.full_name}
                aria-describedby={errors.full_name ? "full_name_error" : undefined}
                className={`
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                  focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                  ${errors.full_name ? "border-vibe-red animate-shake" : ""}
                `}
              />
              {errors.full_name && (
                <p id="full_name_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                  {errors.full_name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-vibe-dark">
                Email Address <span className="text-vibe-red" aria-hidden="true">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => onChange("email", e.target.value)}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email_error" : undefined}
                className={`
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                  focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                  ${errors.email ? "border-vibe-red animate-shake" : ""}
                `}
              />
              {errors.email && (
                <p id="email_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-vibe-dark">
                Phone Number <span className="text-vibe-red" aria-hidden="true">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+977 98XXXXXXXX"
                value={formData.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone_error" : undefined}
                className={`
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                  focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                  ${errors.phone ? "border-vibe-red animate-shake" : ""}
                `}
              />
              {errors.phone && (
                <p id="phone_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* College */}
            <div className="space-y-2">
              <Label htmlFor="college" className="text-vibe-dark">
                College/University <span className="text-vibe-red" aria-hidden="true">*</span>
              </Label>
              <Input
                id="college"
                name="college"
                type="text"
                placeholder="Enter your college name"
                value={formData.college}
                onChange={(e) => onChange("college", e.target.value)}
                aria-required="true"
                aria-invalid={!!errors.college}
                aria-describedby={errors.college ? "college_error" : undefined}
                className={`
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                  focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                  ${errors.college ? "border-vibe-red animate-shake" : ""}
                `}
              />
              {errors.college && (
                <p id="college_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                  {errors.college}
                </p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-vibe-dark">
                Department <span className="text-vibe-red" aria-hidden="true">*</span>
              </Label>
              <Select
                value={formData.department}
                onValueChange={(value) => onChange("department", value)}
              >
                <SelectTrigger
                  id="department"
                  aria-required="true"
                  aria-invalid={!!errors.department}
                  aria-describedby={errors.department ? "department_error" : undefined}
                  className={`
                    transition-all duration-300 ease-out
                    hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                    focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                    ${errors.department ? "border-vibe-red animate-shake" : ""}
                  `}
                >
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent className="animate-in zoom-in-95 fade-in-0 duration-300">
                  {departments.map((dept) => (
                    <SelectItem 
                      key={dept} 
                      value={dept}
                      className="transition-all duration-200 ease-out hover:translate-x-2 hover:bg-vibe-mint/20"
                    >
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p id="department_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                  {errors.department}
                </p>
              )}
            </div>

            {/* Semester */}
            <div className="space-y-2">
              <Label htmlFor="semester" className="text-vibe-dark">
                Semester <span className="text-vibe-red" aria-hidden="true">*</span>
              </Label>
              <Select
                value={formData.semester}
                onValueChange={(value) => onChange("semester", value)}
              >
                <SelectTrigger
                  id="semester"
                  aria-required="true"
                  aria-invalid={!!errors.semester}
                  aria-describedby={errors.semester ? "semester_error" : undefined}
                  className={`
                    transition-all duration-300 ease-out
                    hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                    focus:scale-[1.02] focus:shadow-md focus:border-vibe-teal
                    ${errors.semester ? "border-vibe-red animate-shake" : ""}
                  `}
                >
                  <SelectValue placeholder="Select your semester" />
                </SelectTrigger>
                <SelectContent className="animate-in zoom-in-95 fade-in-0 duration-300">
                  {semesters.map((sem) => (
                    <SelectItem 
                      key={sem} 
                      value={sem}
                      className="transition-all duration-200 ease-out hover:translate-x-2 hover:bg-vibe-mint/20"
                    >
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.semester && (
                <p id="semester_error" className="text-sm text-vibe-red transition-all duration-500 animate-in fade-in-0" role="alert">
                  {errors.semester}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}