# MM Music

A music player UI in React + Vite, laid out along the lines of the streaming apps people already know — sidebar, home feed, playlists, player bar at the bottom.

## Status

Two things to know before you clone this:

1. **It does not build.** `App.tsx` imports `components/Layout`, `components/Home`, `components/PlayerBar`, `components/AiDj` and `services/musicApi`. None of those are in this repo, so the build fails on the first import.
2. **Playback is simulated.** There is no audio element and no audio file. Pressing play runs a timer that moves the progress bar — see the "Mocking audio behavior" block in `App.tsx`. This was a UI exercise, not a working player.

What is in the repo: the `App.tsx` shell, `index.tsx`, `types.ts`, a few loose service files at the root (`musicApi.ts`, `mockFbApi.ts`, `gemini.ts`) that are not wired up to the paths `App.tsx` expects, plus Vite and TypeScript config.

## Run it (once the missing files are back)

```
npm install
npm run dev
```

## Stack

React 19, TypeScript, Vite 6, lucide-react.

## Licence

MIT — see `LICENSE`. Copyright (c) 2025 Min SiThu.
