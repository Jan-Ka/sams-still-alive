<div align="center">
  <a href="https://jan-ka.github.io/sams-still-alive/">
    <img src="doc/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3>Sam's Still Alive</h3>

  <p>
    Have SpeechSynthesis sing a Song for you while computer-generated music plays in the Background.
  </p>

  <p>
    <a href="https://jan-ka.github.io/sams-still-alive/">Demo</a>
    ·
    <a href="https://github.com/Jan-Ka/sams-still-alive/issues">Report Bug</a>
    ·
    <a href="https://github.com/Jan-Ka/sams-still-alive/issues">Request Feature</a>
  </p>
</div>

## About

[![Sam's Still Alive][product-screenshot]](https://jan-ka.github.io/sams-still-alive/)

Anyone still remembering [Microsoft Sam](https://en.wikipedia.org/wiki/Microsoft_text-to-speech_voices)? This site will probably be broken on any browser running on Windows 2000, XP, or Vista — where you'd have heard the real one. Your (hopefully) current OS provides plenty of replacement voices to try.

The music is generated from a MIDI file mangled to be playable through [Tone.js](https://tonejs.github.io/) — no samples, all output synthesised in code. The voice is timed off the same MIDI file, fed through the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). A fun little experiment.

## Built with

- [SvelteKit](https://svelte.dev/docs/kit/) 2 + [Svelte](https://svelte.dev/) 5
- [Vite](https://vite.dev/) 8 + [`@sveltejs/adapter-static`](https://svelte.dev/docs/kit/adapter-static) (deployed to GitHub Pages)
- [Tone.js](https://tonejs.github.io/) for synthesis
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for the voice

## Develop

Prerequisites: `node`, `pnpm`, [`go-task`](https://taskfile.dev/), and [`op`](https://developer.1password.com/docs/cli/) (1Password CLI, used by `setup:secrets` if you keep secrets in 1Password).

```sh
task setup    # check tools, materialise .env from .env.1password, install deps
task dev      # Vite dev server
```

Other useful tasks:

```sh
task build       # static production build → ./build
task preview     # preview the production build
task check       # svelte-check (TS + Svelte types)
task updateMidi  # regenerate src/lib/still_alive_lyrics.midi.json from dev/ inputs
task --list      # everything else
```

Run `task` (or `task default`) to list all available tasks.

## Release

```sh
# 1. bump version in package.json on main, commit, push
# 2. tag — preconditions check clean tree, branch, and version match
task release:patch    # or release:minor / release:major
```

Pushing the tag triggers `.github/workflows/release.yml`, which builds and deploys to GitHub Pages.

## License

MIT — see `LICENSE.md`.

## Acknowledgments

- `Still Alive` — words and music by [Jonathan Coulton](https://www.jonathancoulton.com/), originally for *Portal* by Valve
- MIDI sequenced by Andrew Coccimiglio
- README structure inspired by [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

[product-screenshot]: doc/app_screenshot.png
