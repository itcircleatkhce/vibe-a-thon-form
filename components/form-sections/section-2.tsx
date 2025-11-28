"use client"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Code2, GitBranch, Wrench } from "lucide-react"

interface Section2Props {
  formData: {
    primary_skillset: string
    git_proficiency: string
    technologies: string[]
  }
  onChange: (field: string, value: string | string[]) => void
  errors: Record<string, string>
}

export function Section2Expertise({ formData, onChange, errors }: Section2Props) {
  const skillsets = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile Development",
    "Data Science & Analytics",
    "Machine Learning / AI",
    "DevOps & Cloud",
    "UI/UX Design",
    "Cybersecurity",
    "Game Development",
    "Blockchain Development",
    "Other"
  ]

  const technologies = [
    { id: "javascript", label: "JavaScript/TypeScript", icon: "📄" },
    { id: "html", label: "HTML", icon: "📝" },
    { id: "css", label: "CSS", icon: "📑" },
    { id: "python", label: "Python", icon: "🐍" },
    { id: "react", label: "React/Next.js", icon: "⚛️" },
    { id: "nodejs", label: "Node.js", icon: "🟢" },
    { id: "java", label: "Java", icon: "☕" },
    { id: "csharp", label: "C#/.NET", icon: "🕸" },
    { id: "go", label: "Go", icon: "💨" },
    { id: "rust", label: "Rust", icon: "🦀" },
    { id: "docker", label: "Docker/Kubernetes", icon: "🐳" },
    { id: "aws", label: "AWS/Cloud", icon: "☁️" },
    { id: "sql", label: "SQL/Databases", icon: "🗃️" },
    { id: "flutter", label: "Flutter/Dart", icon: "💙" },
    { id: "ml", label: "TensorFlow/PyTorch", icon: "🧠" },
    { id: "figma", label: "Figma/Design Tools", icon: "🎨" },
  ]

  const handleTechnologyToggle = (techId: string) => {
    const currentTech = formData.technologies || []
    if (currentTech.includes(techId)) {
      onChange("technologies", currentTech.filter(t => t !== techId))
    } else {
      onChange("technologies", [...currentTech, techId])
    }
  }

  return (
    <div className="space-y-8">
      {/* Primary Skillset */}
      <Card className="form-section group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-teal flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <Code2 className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
            Primary Skillset
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            What&apos;s your main area of expertise?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="primary_skillset" className="sr-only">
              Primary Skillset
            </Label>
            <Select
              value={formData.primary_skillset}
              onValueChange={(value) => onChange("primary_skillset", value)}
            >
              <SelectTrigger
                id="primary_skillset"
                aria-required="true"
                aria-invalid={!!errors.primary_skillset}
                aria-describedby={errors.primary_skillset ? "primary_skillset_error" : undefined}
                className={`
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-md hover:border-vibe-teal/50
                  ${errors.primary_skillset ? "border-vibe-red" : ""}
                `}
              >
                <SelectValue placeholder="Select your primary skillset" />
              </SelectTrigger>
              <SelectContent className="animate-in zoom-in-95 fade-in-0 duration-300">
                {skillsets.map((skill) => (
                  <SelectItem 
                    key={skill} 
                    value={skill}
                    className="transition-all duration-200 ease-out hover:translate-x-2 hover:bg-vibe-mint/20"
                  >
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.primary_skillset && (
              <p id="primary_skillset_error" className="text-sm text-vibe-red" role="alert">
                {errors.primary_skillset}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Git & GitHub Proficiency */}
      <Card className="form-section group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-red flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <GitBranch className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
            Git & GitHub Proficiency
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            How comfortable are you with version control?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset>
            <legend className="sr-only">Git and GitHub Proficiency Level</legend>
            <RadioGroup
              value={formData.git_proficiency}
              onValueChange={(value) => onChange("git_proficiency", value)}
              className="space-y-3"
              aria-required="true"
              aria-invalid={!!errors.git_proficiency}
              aria-describedby={errors.git_proficiency ? "git_proficiency_error" : undefined}
            >
              <div className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-vibe-mint/20 hover:shadow-sm border border-transparent hover:border-vibe-mint/30 group">
                <RadioGroupItem value="beginner" id="git-beginner" />
                <Label htmlFor="git-beginner" className="flex-1 cursor-pointer">
                  <span className="font-medium">Beginner</span>
                  <span className="block text-sm text-vibe-dark/60">
                    New to Git, learning basic commands
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-vibe-mint/20 hover:shadow-sm border border-transparent hover:border-vibe-mint/30 group">
                <RadioGroupItem value="intermediate" id="git-intermediate" />
                <Label htmlFor="git-intermediate" className="flex-1 cursor-pointer">
                  <span className="font-medium">Intermediate</span>
                  <span className="block text-sm text-vibe-dark/60">
                    Comfortable with branches, commits, PRs
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-vibe-mint/20 hover:shadow-sm border border-transparent hover:border-vibe-mint/30 group">
                <RadioGroupItem value="advanced" id="git-advanced" />
                <Label htmlFor="git-advanced" className="flex-1 cursor-pointer">
                  <span className="font-medium">Advanced</span>
                  <span className="block text-sm text-vibe-dark/60">
                    Expert in rebasing, CI/CD, Git workflows
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-vibe-mint/20 hover:shadow-sm border border-transparent hover:border-vibe-mint/30 group">
                <RadioGroupItem value="never-used" id="git-never" />
                <Label htmlFor="git-never" className="flex-1 cursor-pointer">
                  <span className="font-medium">Never Used</span>
                  <span className="block text-sm text-vibe-dark/60">
                    Haven&apos;t worked with Git yet
                  </span>
                </Label>
              </div>
            </RadioGroup>
            {errors.git_proficiency && (
              <p id="git_proficiency_error" className="text-sm text-vibe-red mt-2" role="alert">
                {errors.git_proficiency}
              </p>
            )}
          </fieldset>
        </CardContent>
      </Card>

      {/* Technologies/Tools Familiarity */}
      <Card className="form-section group/card hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-vibe-orange flex items-center gap-2 transition-all duration-500 group-hover/card:translate-x-2">
            <Wrench className="w-5 h-5 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12" aria-hidden="true" />
            Technologies & Tools
          </CardTitle>
          <CardDescription className="transition-all duration-500 delay-100 group-hover/card:translate-x-1">
            Select all the technologies you&apos;re familiar with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset>
            <legend className="sr-only">Select technologies you are familiar with</legend>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              role="group"
              aria-describedby={errors.technologies ? "technologies_error" : undefined}
            >
              {technologies.map((tech) => {
                const isSelected = formData.technologies?.includes(tech.id)
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => handleTechnologyToggle(tech.id)}
                    className={`
                      relative p-3 rounded-xl border-2 
                      transition-all duration-300 ease-out
                      flex items-center gap-2 text-left
                      group
                      ${isSelected
                        ? "border-vibe-teal bg-vibe-teal/20 text-vibe-dark shadow-lg scale-105"
                        : "border-vibe-light/80 bg-white/80 hover:border-vibe-mint/60"
                      }
                      hover:scale-105 hover:shadow-xl hover:bg-white
                      active:scale-95
                    `}
                    aria-pressed={isSelected}
                  >
                    <span className="text-lg transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                      {tech.icon}
                    </span>
                    <span className="text-sm font-medium transition-all duration-300 group-hover:font-semibold">
                      {tech.label}
                    </span>
                    
                    {/* Checkmark indicator */}
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-vibe-teal rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            {errors.technologies && (
              <p id="technologies_error" className="text-sm text-vibe-red mt-2" role="alert">
                {errors.technologies}
              </p>
            )}
          </fieldset>
        </CardContent>
      </Card>
    </div>
  )
}