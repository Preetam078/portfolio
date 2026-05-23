import { iconPaths, type IconName } from '../ui/iconPaths'

type IconProps = {
  name: IconName
  class?: string
  title?: string
}

export function Icon(props: IconProps) {
  return (
    <svg
      aria-hidden={props.title ? undefined : 'true'}
      class={props.class}
      fill="none"
      role={props.title ? 'img' : undefined}
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.8"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.title ? <title>{props.title}</title> : null}
      {iconPaths[props.name].map(path => (
        <path d={path} />
      ))}
    </svg>
  )
}
