import { onCleanup, onMount } from 'solid-js'

export default function PageEffects() {
  onMount(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.12,
      },
    )

    revealElements.forEach(element => observer.observe(element))
    onCleanup(() => observer.disconnect())
  })

  return null
}
