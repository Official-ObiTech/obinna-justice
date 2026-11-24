# Obinna Justice | Portfolio

Personal portfolio built with Next.js, Tailwind CSS and Three.js. It installs like an app (PWA) and works offline.

- **Home page:** Hero (interactive 3D background) → About → Skills (3D carousel) → Projects → Contact.
- **Project pages** (`/projects/<slug>`): what the project does, its tech stack, screenshots and a **live preview** that opens the real site inside the portfolio.

## Editing your content

All text, links and projects live in **`app/data.ts`**, so you shouldn't need to touch the components.

| What | Where in `app/data.ts` |
| --- | --- |
| Name, role, tagline, email, phone, location, CV | `site` |
| Social media links | `socials` |
| About-me paragraphs and quick facts | `about`, `facts` |
| Work experience | `experience` |
| Skills carousel and skill groups | `skills` (icons are in `/public/skills`), `skillGroups` |
| Projects | `projects` |

### CV download

The “Download CV” buttons (menu, hero, About and Contact) serve `public/Justice-Obinna-CV.pdf`. To update your CV, replace that file, or add a new PDF to `/public` and point `site.resume` at it.

### Your photo

Your photo is `public/me.jpg`, shown in the About section and as the round menu logo. To change it, replace that file with another square photo (800×800 works well). Set `site.photo` to `""` to show your initials instead.

### Colours, themes and font

The site has a dark theme (the default) and a light theme, switched with the floating sun/moon button in the bottom-right corner. A visitor’s choice is remembered. Both themes’ colours are at the top of `app/globals.css`; the accent is blue (`--accent` for text and icons, `--accent-strong` for filled buttons). To start in light mode instead, change `DEFAULT_THEME` in `app/components/theme.ts`. The font is Inter, loaded in `app/layout.tsx`.

## Running locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Before deploying, check everything builds:

```bash
pnpm lint
pnpm build
```

## PWA (installable app)

- `app/manifest.ts`: app name, colours, icons and install screenshots
- `public/sw.js`: the service worker. It caches pages as they’re visited so they work offline, and shows `public/offline.html` for pages that haven’t been saved yet. Bump `VERSION` at the top after big changes to clear old caches.
- `public/icons/` and `app/apple-icon.png`: app icons

The service worker only runs in production builds (`pnpm build && pnpm start`) and on HTTPS (or localhost). Visitors on Chrome, Edge and Android see an **Install app** button in the menu; on iPhone they can use Share → Add to Home Screen.

## Deploying

The easiest option is [Vercel](https://vercel.com/new): push this folder to a GitHub repository, import it on Vercel, and click Deploy. No settings needed.

If you use a custom domain, set the `NEXT_PUBLIC_SITE_URL` environment variable (e.g. `https://obinnajustice.com`) so link previews and the sitemap point to the right address.
