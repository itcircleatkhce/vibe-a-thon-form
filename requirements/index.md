---
layout: home

hero:
  name: "Vibe-a-thon"
  text: "Developer Workshop Setup"
  tagline: "Complete environment setup guide for modern web development. Get ready to build amazing projects with professional-grade tools."
  image:
    src: assets/requirements_mascot.png
    alt: Vibe-a-thon Workshop Mascot
  actions:
    - theme: brand
      text: Begin Setup →
      link: /setup-overview
    - theme: alt
      text: View Quick Reference
      link: /quick-reference

---

<style>
/* Page-specific overrides for professional home layout */
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #A7372D 0%, #FF914D 100%);
}

/* Clean, professional layout with grid background */
.VPHome {
  position: relative;
  background: linear-gradient(135deg, #F6EBD7 0%, #FEFCF7 100%);
}

.VPHome::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(167, 55, 45, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(167, 55, 45, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(255, 145, 77, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 145, 77, 0.06) 1px, transparent 1px);
  background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
  background-position: 0 0, 0 0, 40px 40px, 40px 40px;
  pointer-events: none;
  z-index: 0;
}

.VPHome > * {
  position: relative;
  z-index: 1;
}

/* Hero section improvements - Fix text/image overlap */
.VPHero {
  padding: 80px 24px 60px !important;
}

.VPHero .container {
  max-width: 1200px !important;
  margin: 0 auto !important;
  display: grid !important;
  grid-template-columns: 1fr 650px !important;
  gap: 4rem !important;
  align-items: center !important;
}

.VPHero .main {
  max-width: none !important;
  text-align: left !important;
  margin: 0 !important;
}

.VPHero .image {
  justify-self: end !important;
}

.VPHero .VPImage {
  max-width: 650px !important;
  width: 650px !important;
  height: auto !important;
  animation: mascotFloat 8s ease-in-out infinite, mascotGlow 6s ease-in-out infinite alternate !important;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.VPHero .VPImage:hover {
  transform: translate(0px, 0px) scale(1.02) rotate(0.5deg) !important;
  animation-play-state: paused !important;
}

.VPHero .name {
  font-size: 4rem !important;
  line-height: 1 !important;
  letter-spacing: -0.02em !important;
  margin-bottom: 0.5rem !important;
  white-space: nowrap !important;
}

.VPHero .text {
  font-size: 1.5rem !important;
  line-height: 1.4 !important;
  color: var(--vp-c-text-1) !important;
  margin-bottom: 1rem !important;
  font-weight: 600 !important;
}

.VPHero .tagline {
  font-size: 1.1rem !important;
  line-height: 1.6 !important;
  color: var(--vp-c-text-2) !important;
  max-width: 600px !important;
  margin: 0 auto 2.5rem !important;
}

/* Action buttons with better spacing */
.VPHero .actions {
  gap: 1rem !important;
  margin-top: 2.5rem !important;
}

.VPButton {
  padding: 12px 32px !important;
  font-size: 1rem !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  letter-spacing: 0.01em !important;
}

/* Features section improvements */
.VPFeatures {
  padding: 80px 24px !important;
  background: rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(10px) !important;
}

.VPFeatures .container {
  max-width: 1200px !important;
}

/* --- Force Features in One Row (Polished Layout) --- */

/* Desktop: Always 3 columns */
.VPFeatures .items {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 2rem !important;
  align-items: stretch !important;
  justify-items: stretch !important;
}

/* Equal-height, polished feature cards */
.VPFeature {
  background: rgba(255, 255, 255, 0.8) !important;
  border: 1px solid rgba(167, 55, 45, 0.1) !important;
  border-radius: 16px !important;
  padding: 2rem !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 20px rgba(167, 55, 45, 0.05) !important;

  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}

.VPFeature:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 20px 40px rgba(167, 55, 45, 0.12) !important;
  border-color: rgba(167, 55, 45, 0.2) !important;
  background: rgba(255, 255, 255, 0.95) !important;
}

.VPFeature .icon {
  font-size: 3rem !important;
  margin-bottom: 1.5rem !important;
  display: block !important;
}

.VPFeature .title {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: var(--vp-c-brand-1) !important;
  margin-bottom: 1rem !important;
  line-height: 1.3 !important;
}

.VPFeature .details {
  color: var(--vp-c-text-2) !important;
  line-height: 1.6 !important;
  font-size: 0.95rem !important;

  margin-top: auto !important; /* pushes content evenly */
}

/* --- RESPONSIVE BREAKPOINTS --- */

/* Medium screens → 2 columns */
@media (max-width: 1100px) {
  .VPFeatures .items {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

/* Mobile screens → 1 column */
@media (max-width: 700px) {
  .VPFeatures .items {
    grid-template-columns: 1fr !important;
  }
}

/* Extra small phones spacing */
@media (max-width: 480px) {
  .VPFeature {
    padding: 1.25rem !important;
  }
}

/* Responsive hero improvements */
@media (max-width: 960px) {
  .VPHero .container {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
    text-align: center !important;
  }
  
  .VPHero .main {
    text-align: center !important;
    order: 2 !important;
  }
  
  .VPHero .image {
    order: 1 !important;
    justify-self: center !important;
  }
  
  .VPHero .VPImage {
    max-width: 500px !important;
    width: 500px !important;
  }
}

@media (max-width: 768px) {
  .VPHero {
    padding: 60px 20px 40px !important;
  }
  
  .VPHero .name {
    font-size: 2.8rem !important;
    white-space: nowrap !important;
  }
  
  .VPHero .text {
    font-size: 1.25rem !important;
  }
  
  .VPHero .tagline {
    font-size: 1rem !important;
  }
  
  .VPFeatures {
    padding: 60px 20px !important;
  }
  
  .VPFeature {
    padding: 1.5rem !important;
  }
}

@media (max-width: 480px) {
  .VPHero .actions {
    flex-direction: column !important;
    align-items: center !important;
  }
  
  .VPButton {
    width: 100% !important;
    max-width: 280px !important;
  }
}

/* ===== MASCOT ANIMATIONS ===== */

/* Gentle floating animation */
@keyframes mascotFloat {
  0%, 100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  25% {
    transform: translate(0px, -3px) rotate(0.3deg);
  }
  50% {
    transform: translate(0px, -2px) rotate(0deg);
  }
  75% {
    transform: translate(0px, -4px) rotate(-0.3deg);
  }
}

/* Subtle glow/pulse effect */
@keyframes mascotGlow {
  0% {
    filter: drop-shadow(0 0 8px rgba(255, 145, 77, 0.15));
  }
  100% {
    filter: drop-shadow(0 0 12px rgba(167, 55, 45, 0.2));
  }
}

/* Breathing animation for additional life */
@keyframes mascotBreathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.008);
  }
}

/* Welcome wave animation (plays once on load) */
@keyframes mascotWave {
  0% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(2deg);
  }
  30% {
    transform: rotate(-1deg);
  }
  45% {
    transform: rotate(1.5deg);
  }
  60% {
    transform: rotate(-0.5deg);
  }
  75% {
    transform: rotate(0.5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* Enhanced mascot container for better animation performance */
.VPHero .image {
  justify-self: end !important;
  perspective: 1000px !important;
}

/* Add welcome animation that plays once */
.VPHero .VPImage {
  animation: 
    mascotFloat 8s ease-in-out infinite,
    mascotGlow 6s ease-in-out infinite alternate,
    mascotWave 3s ease-in-out 0.8s !important;
  transform-origin: center center !important;
  position: relative !important;
}

/* Pause floating animation on hover for better UX */
.VPHero .image:hover .VPImage {
  animation: 
    mascotGlow 6s ease-in-out infinite alternate,
    mascotBreathe 4s ease-in-out infinite !important;
}

/* Reduce animations on mobile for performance */
@media (max-width: 768px) {
  .VPHero .VPImage {
    animation: mascotFloat 8s ease-in-out infinite !important;
  }
  
  .VPHero .VPImage:hover {
    transform: translate(0px, 0px) scale(1.02) !important;
  }
  
  .VPHero .image:hover .VPImage {
    animation: mascotFloat 8s ease-in-out infinite !important;
  }
}

/* Respect user preferences for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .VPHero .VPImage {
    animation: none !important;
  }
  
  .VPHero .VPImage:hover {
    transform: translate(0px, 0px) scale(1.02) !important;
  }
}
</style>
