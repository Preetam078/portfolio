import '../.astro/types.d.ts'

interface ImportMetaEnv {
  readonly PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
