import { For, createSignal, onCleanup, onMount } from 'solid-js'
import type { NavigationItem } from '../../types/portfolio'
import { Icon } from './Icon'

type NavigationProps = {
  initials: string
  items: NavigationItem[]
  contactHref: '#contact'
}

const getHash = (href: string) => href.replace('#', '')

export default function Navigation(props: NavigationProps) {
  const [activeId, setActiveId] = createSignal(getHash(props.items[0]?.href ?? '#home'))
  const [isMenuOpen, setIsMenuOpen] = createSignal(false)
  const [isScrolled, setIsScrolled] = createSignal(false)

  let sections: HTMLElement[] = []
  let experienceTimeline: HTMLElement | undefined
  let progressBarFill: HTMLDivElement | undefined
  let sectionObserver: IntersectionObserver | undefined
  let programmaticScroll = false
  let scrollFrame = 0
  let scrollTimer: ReturnType<typeof window.setTimeout> | undefined
  let lastScrolledState = false

  const navItems = () => [...props.items, { label: "Let's Talk", href: props.contactHref }]

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (progressBarFill) {
      const nextProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      progressBarFill.style.width = `${nextProgress}%`
    }
  }

  const updateExperienceProgress = () => {
    if (!experienceTimeline) return

    const rect = experienceTimeline.getBoundingClientRect()
    const startAnchor = window.innerHeight * 0.65
    const endAnchor = window.innerHeight * 0.25
    const scrollableDistance = rect.height + startAnchor - endAnchor
    const rawProgress = (startAnchor - rect.top) / scrollableDistance
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1)
    experienceTimeline.style.setProperty('--experience-progress', clampedProgress.toFixed(3))
  }

  const syncActiveSection = () => {
    const triggerLine = window.innerHeight * 0.3
    const nextActive = sections.find(section => {
      const rect = section.getBoundingClientRect()
      return rect.top <= triggerLine && rect.bottom >= triggerLine
    })

    if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
      setActiveId(sections.at(-1)?.id ?? activeId())
      return
    }

    if (nextActive) {
      setActiveId(nextActive.id)
    }
  }

  const handleScroll = () => {
    if (scrollFrame) return

    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0
      syncScrollState()
    })
  }

  const syncScrollState = () => {
    const nextScrolledState = window.scrollY > 50
    if (nextScrolledState !== lastScrolledState) {
      lastScrolledState = nextScrolledState
      setIsScrolled(nextScrolledState)
    }
    updateProgress()
    updateExperienceProgress()
  }

  const handleNavClick = (event: MouseEvent, href: string) => {
    if (!href.startsWith('#')) return

    event.preventDefault()
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return

    programmaticScroll = true
    setActiveId(getHash(href))
    setIsMenuOpen(false)

    const headerOffset = 82
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ behavior: 'smooth', top })

    window.clearTimeout(scrollTimer)
    scrollTimer = window.setTimeout(() => {
      programmaticScroll = false
      syncActiveSection()
    }, 900)
  }

  onMount(() => {
    sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    experienceTimeline = document.querySelector<HTMLElement>('.experience-timeline') ?? undefined
    progressBarFill = document.querySelector<HTMLDivElement>('[data-progress-bar-fill]') ?? undefined

    sectionObserver = new IntersectionObserver(
      entries => {
        if (programmaticScroll) return

        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]?.target instanceof HTMLElement) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0,
      },
    )

    sections.forEach(section => sectionObserver?.observe(section))
    syncActiveSection()
    syncScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })

    onCleanup(() => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(scrollFrame)
      window.clearTimeout(scrollTimer)
      sectionObserver?.disconnect()
    })
  })

  return (
    <>
      <div class="fixed left-1/2 top-0 z-[60] h-0.5 w-full max-w-[1440px] -translate-x-1/2 bg-zinc-900/70">
        <div
          data-progress-bar-fill
          class="h-full rounded-r-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        />
      </div>

      <div class="pointer-events-none fixed left-1/2 top-2 z-50 flex w-full max-w-[1440px] -translate-x-1/2 justify-center px-4">
        <nav
          aria-label="Primary navigation"
          class="glass-nav pointer-events-auto relative w-full rounded-full shadow-sm transition-all duration-300 md:w-auto"
          classList={{
            'bg-black/45 shadow-lg': isScrolled(),
            'bg-white/5': !isScrolled(),
          }}
        >
          <div class="px-5 md:px-10">
            <div class="flex h-14 items-center justify-between md:gap-20">
              <a class="flex-shrink-0 font-mono text-2xl font-bold text-white" href="#home" onClick={event => handleNavClick(event, '#home')}>
                {props.initials}
              </a>

              <div class="hidden items-center gap-2 md:flex">
                <For each={props.items}>
                  {item => (
                    <a
                      class="desktop-nav-link text-sm font-medium text-zinc-400"
                      classList={{ active: activeId() === getHash(item.href) }}
                      href={item.href}
                      onClick={event => handleNavClick(event, item.href)}
                    >
                      {item.label}
                    </a>
                  )}
                </For>
                <div class="pl-4">
                  <a
                    class="aurora-btn contact-btn inline-block rounded-full px-5 py-2 font-mono text-sm font-medium transition-all"
                    classList={{ active: activeId() === 'contact' }}
                    href={props.contactHref}
                    onClick={event => handleNavClick(event, props.contactHref)}
                  >
                    <span class="aurora-text">Let's Talk</span>
                  </a>
                </div>
              </div>

              <button
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen()}
                class="inline-flex size-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
                onClick={() => setIsMenuOpen(value => !value)}
                type="button"
              >
                <span class="sr-only">Open main menu</span>
                <Icon class="size-5" name={isMenuOpen() ? 'x' : 'menu'} />
              </button>
            </div>
          </div>

          <div
            class="absolute left-0 right-0 top-full mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-black/95 shadow-2xl backdrop-blur-xl md:hidden"
            classList={{ hidden: !isMenuOpen() }}
            id="mobile-menu"
          >
            <div class="space-y-2 px-4 py-4">
              <For each={navItems()}>
                {item => (
                  <a
                    class="mobile-link block rounded-xl px-4 py-3 font-mono text-base font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                    classList={{ active: activeId() === getHash(item.href) }}
                    href={item.href}
                    onClick={event => handleNavClick(event, item.href)}
                  >
                    {item.label}
                  </a>
                )}
              </For>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
