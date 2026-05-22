import { AuroraText } from './components/ui/aurora-text'
import { InteractiveGridPattern } from './components/ui/interactive-grid-pattern'
import {
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavBody,
    NavItems,
    Navbar,
    NavbarButton,
} from './components/ui/resizable-navbar'
import { type ReactNode, useState } from 'react'
import './App.css'

type PatternSectionProps = {
    children: ReactNode
    className?: string
    id?: string
    variant: 'dots' | 'grid' | 'plain'
}

const projects = [
    {
        title: 'Realtime product canvas',
        type: 'Interaction design',
        detail: 'A focused editor surface with precise motion, shortcut-first controls, and zero visual drift.',
    },
    {
        title: 'Portfolio systems',
        type: 'Frontend engineering',
        detail: 'Fast builds, resilient layouts, and expressive details that still respect the render budget.',
    },
    {
        title: 'Decision dashboards',
        type: 'Product UI',
        detail: 'Dense data flows turned into calm screens for scanning, comparing, and acting quickly.',
    },
]

const experience = [
    {
        role: 'Frontend developer',
        period: 'Now',
        summary: 'Building polished web interfaces where performance and feel are designed together.',
    },
    {
        role: 'Product collaborator',
        period: 'Recent',
        summary: 'Turning loose product ideas into shipped interaction systems and reusable UI foundations.',
    },
    {
        role: 'Experimenter',
        period: 'Always',
        summary: 'Exploring motion, rendering, and visual systems that make portfolio work memorable.',
    },
]

const skills = [
    'Astro',
    'React',
    'TypeScript',
    'Motion',
    'Tailwind CSS',
    'Design systems',
    'Accessibility',
    'Performance',
]

const navItems = [
    { name: 'Projects', link: '#projects' },
    { name: 'Experience', link: '#experience' },
    { name: 'Skills', link: '#skills' },
]

function PatternSection({ children, className = '', id, variant }: PatternSectionProps) {
    return (
        <section className={`pattern-band pattern-band--${variant} ${className}`} id={id}>
            <div className="portfolio-frame">{children}</div>
        </section>
    )
}

function PortfolioNavbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <Navbar className="portfolio-navbar !fixed top-4 px-4 sm:px-6">
            <NavBody className="portfolio-navbar__body max-w-[68rem] border border-white/10">
                <a className="portfolio-navbar__brand" href="#top">
                    Rohit
                </a>
                <NavItems className="portfolio-navbar__items" items={navItems} />
                <NavbarButton className="portfolio-navbar__button" href="#contact" variant="dark">
                    Contact
                </NavbarButton>
            </NavBody>

            <MobileNav className="portfolio-navbar__mobile">
                <MobileNavHeader>
                    <a className="portfolio-navbar__brand" href="#top">
                        Rohit
                    </a>
                    <MobileNavToggle isOpen={menuOpen} onClick={() => setMenuOpen(open => !open)} />
                </MobileNavHeader>
                <MobileNavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
                    {navItems.map(item => (
                        <a href={item.link} key={item.name} onClick={() => setMenuOpen(false)}>
                            {item.name}
                        </a>
                    ))}
                    <NavbarButton
                        className="portfolio-navbar__mobile-button"
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        variant="dark"
                    >
                        Contact
                    </NavbarButton>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    )
}

function App() {
    return (
        <main className="portfolio-page">
            <PortfolioNavbar />
            <PatternSection className="hero-band" variant="plain">
                <InteractiveGridPattern
                    className="hero-grid"
                    height={64}
                    squares={[24, 16]}
                    squaresClassName="hero-grid__square"
                    width={64}
                />
                <div className="hero-copy" id="top">
                    <p className="section-kicker">Frontend portfolio</p>
                    <h1>
                        <AuroraText>I build web interfaces that stay fast.</AuroraText>
                    </h1>
                    <p>
                        A portfolio for thoughtful products: clean systems, cinematic interactions, and frontend
                        work that earns its motion.
                    </p>
                </div>
            </PatternSection>

            <div className="display-shell">
                <PatternSection className="display-section" id="projects" variant="grid">
                    <div className="section-heading">
                        <p className="section-kicker">Selected projects</p>
                        <h2>Work that makes interaction feel direct.</h2>
                    </div>
                    <div className="project-grid">
                        {projects.map(project => (
                            <article className="project-card" key={project.title}>
                                <span>{project.type}</span>
                                <h3>{project.title}</h3>
                                <p>{project.detail}</p>
                            </article>
                        ))}
                    </div>
                </PatternSection>

                <PatternSection className="display-section" id="experience" variant="dots">
                    <div className="split-section">
                        <div className="section-heading">
                            <p className="section-kicker">Experience</p>
                            <h2>Working where design intent meets implementation detail.</h2>
                        </div>
                        <div className="timeline">
                            {experience.map(item => (
                                <article key={item.role}>
                                    <span>{item.period}</span>
                                    <h3>{item.role}</h3>
                                    <p>{item.summary}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </PatternSection>

                <PatternSection className="display-section" id="skills" variant="grid">
                    <div className="split-section split-section--skills">
                        <div className="section-heading">
                            <p className="section-kicker">Skills</p>
                            <h2>Modern frontend tools, used with restraint.</h2>
                        </div>
                        <div className="skill-grid">
                            {skills.map(skill => (
                                <span key={skill}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </PatternSection>

                <PatternSection className="contact-section" id="contact" variant="dots">
                    <div className="contact-copy">
                        <p className="section-kicker">Contact</p>
                        <h2>Bring the ambitious brief. I&apos;ll bring the sharp implementation.</h2>
                        <a href="mailto:hello@example.com">hello@example.com</a>
                    </div>
                </PatternSection>
            </div>
        </main>
    )
}

export default App
