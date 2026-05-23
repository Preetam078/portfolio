import { For } from 'solid-js'
import type { Project } from '../../types/portfolio'
import { Icon } from './Icon'
import type { IconName } from '../ui/iconPaths'

type ProjectGalleryProps = {
  projects: Project[]
}

const visualIcons: Record<Project['visual'], IconName> = {
  cinema: 'film',
  commerce: 'chart-up',
  tasks: 'workflow',
}

function projectIcon(title: string): IconName {
  if (title.includes('Paste')) return 'codepen'
  if (title.includes('White')) return 'monitor'
  if (title.includes('Chatbot')) return 'bot'
  if (title.includes('Widget')) return 'globe'
  if (title.includes('SEO')) return 'gauge'
  if (title.includes('Video')) return 'film'
  if (title.includes('Dashboard')) return 'monitor'
  if (title.includes('Component')) return 'component'
  if (title.includes('PR')) return 'badge-check'
  return 'folder'
}

function ProjectVisual(props: { visual: Project['visual']; title: string }) {
  return (
    <div class="project-visual" data-visual={props.visual} role="img" aria-label={`${props.title} placeholder preview`}>
      <div class="project-visual__chrome">
        <span />
        <span />
        <span />
      </div>
      <div class="project-visual__body">
        <div class="project-visual__metric" />
        <div class="project-visual__stack">
          <span />
          <span />
          <span />
        </div>
        <div class="project-visual__panel" />
      </div>
      <Icon class="absolute bottom-6 left-6 size-10 text-white/35" name={visualIcons[props.visual]} />
    </div>
  )
}

export default function ProjectGallery(props: ProjectGalleryProps) {
  return (
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <For each={props.projects}>
        {(project, index) => (
          <article
            class="glass-card reveal flex overflow-hidden rounded-xl border-zinc-800"
            style={{ 'transition-delay': `${index() * 70}ms` }}
          >
            <div class="flex min-h-full w-full flex-col">
              <div class="project-image-container h-44 w-full border-b border-zinc-800 bg-zinc-950">
                <ProjectVisual title={project.title} visual={project.visual} />
              </div>

              <div class="flex flex-1 flex-col p-6">
                <div class="mb-4 flex items-center justify-between gap-4">
                  <span class="inline-flex items-center gap-2 text-label-13-mono text-zinc-500">
                    <Icon class="size-4 text-zinc-300" name={projectIcon(project.title)} />
                    {project.type}
                  </span>
                  <span class="rounded-full border border-zinc-800 px-2.5 py-1 text-label-12 text-zinc-500">
                    {project.links?.length ? 'Open source' : 'Selected work'}
                  </span>
                </div>

                <h3 class="mb-3 text-heading-20 text-gradient-mono">{project.title}</h3>
                <p class="mb-5 text-copy-14 text-zinc-300">{project.value}</p>

                <div class="space-y-3 border-t border-zinc-800 pt-5">
                  <div>
                    <p class="mb-1 text-label-12-mono text-zinc-500">Impact</p>
                    <p class="text-copy-13 text-zinc-400">{project.whyItMattered}</p>
                  </div>
                </div>

                <ul class="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technical areas`}>
                  <For each={project.technicalAreas.slice(0, 4)}>
                    {area => <li class="rounded-full border border-zinc-800 bg-black/60 px-2.5 py-1 text-label-12 text-zinc-400">{area}</li>}
                  </For>
                </ul>

                <div class="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4">
                  <p class="text-label-13 text-zinc-500">{project.status}</p>
                  {project.links?.length ? (
                    <div class="flex flex-wrap gap-2">
                      <For each={project.links}>
                        {link => (
                          <a
                            class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-2.5 py-1 text-label-12 text-zinc-300 transition-colors hover:border-white hover:text-white"
                            href={link.href}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <Icon class="size-3.5" name={link.icon} />
                            {link.label}
                          </a>
                        )}
                      </For>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        )}
      </For>
    </div>
  )
}
