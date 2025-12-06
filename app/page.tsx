import { NewHackathonForm } from "@/components/new-hackathon-form"
import { FloatingTechElements, ChibiMascot } from "@/components/chibi-mascot"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-vibe-cream">
      {/* Background Elements */}
      <FloatingTechElements />
      <div className="grid-background absolute inset-0 opacity-40" aria-hidden="true" />
      
    
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <header className="text-center mb-12">
          {/* Header Image - Full width on mobile, no margin */}
          <div className="w-full mb-6">
            <Image
              src="/header.png"
              alt="Vibe-a-thon"
              width={1920}
              height={400}
              className="w-full h-auto object-cover drop-shadow-lg"
              priority
            />
          </div>
          
          {/* Subtitle */}
          <div className="px-4 md:px-8">
            <p className="text-2xl md:text-2xl text-vibe-dark font-medium mb-2">
              Mini Hackathon Registration 🚀
            </p>
            <p className="text-vibe-dark/60 max-w-2xl mx-auto flex items-center justify-center gap-2">
              Form your team and build something amazing on December 7th!
           </p>
           
            {/* Team Status Link - More Visible */}
            <div className="mt-6 mb-4">
              <Link 
                href="/team-status"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-vibe-orange to-vibe-red hover:from-vibe-orange/90 hover:to-vibe-red/90 text-white rounded-xl text-base font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl shadow-vibe-orange/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Check Your Team Status
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-xs text-vibe-dark/50 mt-2">Already registered? Enter your team code to check status</p>
            </div>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mt-6" aria-hidden="true">
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-transparent to-vibe-teal" />
              <div className="w-3 h-3 rounded-full bg-vibe-teal" />
              <div className="w-32 h-1 rounded-full bg-gradient-to-r from-vibe-teal via-vibe-mint to-vibe-teal" />
              <div className="w-3 h-3 rounded-full bg-vibe-teal" />
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-transparent to-vibe-teal" />
            </div>
          </div>
        </header>

        {/* Registration Form */}
        <div className="px-4 md:px-8 pb-8">
          <NewHackathonForm />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-vibe-dark/50 pb-8 px-4 md:px-8">
          <p>
            Made with 🚀 for the Vibe-a-thon community
          </p>
          <p className="mt-2">
            Questions? Contact us at{" "}
            <a 
              href="mailto:itcirclekhec@gmail.com" 
              className="text-vibe-orange hover:underline"
            >
              itcirclekhec@gmail.com
            </a>
          </p>
        </footer>
      </div>
      
      {/* Bottom mascots */}
      <ChibiMascot 
        position="bottom-left" 
        imageSrc="/mascot1.png"
        alt="Cute tech mascot waving" 
        className="hidden md:block"
        animate={true}
      />
      <ChibiMascot 
        position="bottom-right" 
        imageSrc="/mascot2.png"
        alt="Cute tech mascot coding" 
        className="hidden md:block"
        animate={true}
      />
    </div>
  )
}
