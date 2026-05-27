export type SocialLink = {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'twitter' | 'codepen'
  isPlaceholder?: boolean
}

export type NavigationItem = {
  label: string
  href: `#${string}`
}

export type CtaLink = {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  icon?: SocialLink['icon'] | 'arrow-right'
  isPlaceholder?: boolean
}

export type HeroContent = {
  eyebrow: string
  name: string
  role: string
  headline: string
  summary: string
  trustSignals: string[]
  ctas: CtaLink[]
}

export type Stat = {
  value: string
  label: string
  detail?: string
}

export type AboutContent = {
  heading: string
  body: string
  strengths: string[]
  portrait: {
    alt: string
    initials: string
  }
}

export type ProofSnapshotContent = {
  heading: string
  summary: string
  points: Stat[]
}

export type ProjectVisual = 'commerce' | 'cinema' | 'tasks'

export type Project = {
  title: string
  type: string
  value: string
  whyItMattered: string
  role: string
  technicalAreas: string[]
  status: string
  links?: Array<{
    label: string
    href: string
    icon: 'github' | 'external'
  }>
  visual: ProjectVisual
}

export type CapabilityBlock = {
  title: string
  description: string
}

export type Experience = {
  company: string
  companyLogo?:string
  domain: string
  role: string
  dates: string
  achievements: string[]
  stack: string[]
  relatedWork: string[]
}

export type SkillCategory = {
  title: string
  skills: string[]
}

export type ProofLink = {
  label: string
  description: string
  href?: string
  status: string
}

export type EducationContent = {
  degree: string
  institution: string
  gpa: string
  dates: string
  location: string
}

export type ContactContent = {
  eyebrow: string
  heading: string
  summary: string
  email: string
  linkedin: string
  location: string
  availability: string
  ctas: CtaLink[]
}

export type ArchitectureContent = {
  imageUrl: string
  title: string
  description: string
}


export type Architecture = {
  headline: string
  frontend: ArchitectureContent[],
  backend: ArchitectureContent[],
}

export type PortfolioContent = {
  site: {
    name: string
    initials: string
    title: string
    description: string
    author: string
  }
  navigation: NavigationItem[]
  socials: SocialLink[]
  hero: HeroContent
  about: AboutContent
  proofSnapshot: ProofSnapshotContent
  projects: Project[]
  strengths: CapabilityBlock[]
  experience: Experience[]
  skills: SkillCategory[]
  proofLinks: ProofLink[]
  education: EducationContent
  contact: ContactContent,
  architecture: Architecture
}
