<div align="center">

<img src=".github/assets/icon.png" width="128" alt="Nova Terminal icon">

# Nova Terminal

**A native macOS terminal that feels alive.**

GPU rendered. Written in pure Rust. Beautiful by default.

[![Latest release](https://img.shields.io/github/v/release/victoragudo/nova-terminal?label=release&color=7c4dff)](https://github.com/victoragudo/nova-terminal/releases/latest)
![Platform](https://img.shields.io/badge/platform-macOS%20·%20Apple%20Silicon-2f6bff)
![Made with Rust](https://img.shields.io/badge/made%20with-Rust-ff4fa3)

<br>

<img src=".github/assets/hero.png" width="920" alt="Nova Terminal main window">

</div>

<br>

## Why Nova

Most terminals look the same. Nova puts your shell inside a living cosmic scene, and adds the tools you use every day: a file explorer, git, and a rich preview panel. Everything runs in one small native app.

## Features

- **Cosmic background**: a real FBM nebula computed on the GPU with Metal, plus stars and shooting stars. It pauses when the window is not active.
- **Seven themes**: four dark, three light. Switch with `Cmd+Shift+L` or from Settings.
- **File explorer**: git status per file, create, rename, copy, move, delete, and run scripts from the context menu.
- **Preview panel**: markdown, syntax highlighted code, diffs, images, SVG, PDF, hex and archives. `Cmd+F` searches inside every text preview with highlights.
- **Git panel**: see changed files, resize it, write a commit, push and pull. Click a file to see its diff.
- **Pinned tabs**: star a tab and it stays in the dock as a favorite, even after you close the app. One click reopens it.
- **Terminal niceties**: `Cmd+click` opens links, mouse text selection, `Ctrl+Tab` cycles tabs, macOS native line and word navigation, hold `Cmd+Q` to quit.
- **Session restore**: tabs, sizes, theme and layout come back exactly as you left them.

## Themes

<div align="center">
<img src=".github/assets/themes.gif" width="920" alt="Nova Terminal themes">
</div>

| Theme | Family | Personality |
| --- | --- | --- |
| Nova Dark | Dark | Violet cosmos, the original look |
| Nova Light | Light | Clean white with violet accents |
| Enana Blanca | Dark | Cold blue silver, like a white dwarf star |
| Kilonova | Dark | Molten gold and crimson, the only warm dark |
| Andromeda | Dark | Deep galaxy blue with a golden core |
| Solar | Light | Warm paper and sun gold, no effects, it is daytime |
| Aurora | Light | Glacial boreal light with emerald and orchid |

## Performance

Nova is designed to stay out of your CPU:

- The animated background lives in its own small view. The heavy UI tree only redraws when something real changes.
- The terminal core is never locked during paint. Each frame copies the visible grid once and releases it.
- The nebula is a Metal compute kernel at half resolution, with a CPU fallback.
- Animations pause completely when the window loses focus.
- One small download, about 9 MB.

## Tech stack

| Layer | Technology |
| --- | --- |
| Language | 100 percent Rust |
| UI framework | [GPUI](https://github.com/zed-industries/zed), the Metal based framework behind Zed |
| Terminal core | [alacritty_terminal](https://crates.io/crates/alacritty_terminal) |
| Highlighting | syntect |
| Markdown | pulldown-cmark |
| Fonts | JetBrains Mono and Space Grotesk, embedded in the binary |

## Engine

Two crates with a strict split:

- `nova-engine` owns the PTY, the terminal state and the color palette. It has zero UI dependencies and only hands owned snapshots to the UI.
- `nova` is the GPUI app: window, themes, explorer, previews, git and settings.

Each tab is fully independent: one PTY, one terminal, one background IO thread.

## Install

1. Download the latest `.dmg` from [Releases](https://github.com/victoragudo/nova-terminal/releases/latest).
2. Open it and drag **Nova** into **Applications**.
3. If macOS warns you on first launch, right click the app and choose **Open**.

Requires an Apple Silicon Mac.

## Feedback

This repository hosts the official releases. Bug reports and ideas are welcome in [Issues](https://github.com/victoragudo/nova-terminal/issues).
