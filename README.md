# Astro + Solid Starter

Minimal starter with Astro, SolidJS, Bun, and Tailwind CSS.

## Commands

```sh
bun run dev
bun run build
bun run preview
bun run lint
```

## Analytics

This portfolio supports Cloudflare Web Analytics through an optional public environment variable:

```sh
PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your_cloudflare_site_token
```

Create a free Cloudflare Web Analytics site, copy the site token from the JS snippet, and add it as a Vercel environment variable for Production. If the variable is not set, no analytics script is rendered.
