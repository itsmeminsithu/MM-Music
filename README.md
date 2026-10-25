# MM Music

React + Vite music player UI with Home, Search, and Library views, trending
and Myanmar playlists, and an AI DJ that builds a playlist from the
catalogue. Playback in the present code is simulated: progress advances on
a timer (`App.tsx`, "Mock Audio Player Logic") and there is no audio
element or streaming source. The catalogue itself is mock data
(`musicApi.ts`): international hits plus Myanmar songs, with playlists
derived from that list. The AI DJ (`gemini.ts`) uses the Gemini API to pick
songs from the mock catalogue by mood; it does not fetch real tracks.

## Repository status — build is blocked

This checkout is incomplete and does not build. `App.tsx` imports
components and a service path that are not in the repository:

- Missing: `components/Layout`, `components/Home`, `components/PlayerBar`,
  `components/AiDj`
- Missing: `services/musicApi` — the file exists at the repo root as
  `musicApi.ts`, not under `services/`, so the import does not resolve

What is present: `App.tsx`, `index.tsx`, `index.html`, `types.ts`,
`musicApi.ts` (root), `mockFbApi.ts` (root, unused by `App.tsx`),
`gemini.ts`, `package.json`, `vite.config.ts`, `tsconfig.json`,
`metadata.json`.

Until the missing components are restored (and the `musicApi` import path
reconciled with the file's actual location), `npm run build` fails on
unresolvable imports and there is no working preview. This PR does not
invent replacements for them, and no preview is claimed.

## Tech stack

React 19, TypeScript, Vite 6, Tailwind CSS (via CDN in `index.html`),
`lucide-react`, Google Gemini API (`@google/genai`).

## Project structure (as checked in)

```txt
MM-Music/
├── App.tsx              # HOME / SEARCH / LIBRARY views, simulated player
├── index.tsx            # React entry point
├── index.html           # Page shell (title: MM Music)
├── types.ts             # Song, Playlist, player types
├── musicApi.ts          # Mock catalogue: trending, playlists, search
├── mockFbApi.ts         # Present at root; not imported by App.tsx
├── gemini.ts            # AI playlist and caption helpers
├── package.json         # dev / build / preview scripts
├── vite.config.ts       # base: '/MM-Music/' (for project Pages)
├── tsconfig.json
└── metadata.json
```

## Run locally (once the missing files are restored)

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

`npm run build` builds for production; `npm run preview` previews the
production build locally.

## Live preview (GitHub Pages — blocked, not live)

Preview route, once the build works: Vite build deployed to Pages.
`vite.config.ts` already sets `base: '/MM-Music/'` for the project site
at `https://itsmeminsithu.github.io/MM-Music/`. After merge and after the
missing files are restored, a Pages build workflow must be added manually
via the GitHub web UI (workflow files cannot be pushed through the Muse
GitHub App — they return 403), and Pages is not live until a workflow run
succeeds and the URL actually loads. No mock or screenshot page has been
added as a substitute.

## License

MIT License. See [`LICENSE`](./LICENSE).
