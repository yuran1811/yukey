<h1 align="center">yukey</h1>
<p align="center" style="font-size:16px"><strong>A minimal, blazing fast Tauri application record the key you're typing.</strong></p>
<p align="center">  
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png" width="400" />
</p>

<p align="center">
  <img alt="Stars" src="https://badgen.net/github/stars/yuran1811/yukey">
  <img alt="Forks" src="https://badgen.net/github/forks/yuran1811/yukey">
  <img alt="Issues" src="https://badgen.net/github/issues/yuran1811/yukey">
  <img alt="Commits" src="https://badgen.net/github/commits/yuran1811/yukey">
  <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/yuran1811/yukey">
</p>

<div align="center"><a href="https://github.com/yuran1811/yukey/releases" target="_blank">Releases</a></div>

## Introduction

`yukey` is an open source keystroke visualizer that enables you to share your **keystroke** and **mouse click actions** for presenting, recording, or collaborating with others.

## Features

- [x] Record the key you're typing
- [x] Record the mouse button you've clicked
- [x] Pin/Unpin the app to/from the top of the screen
- [x] Minmize to tray
- [x] Theme UI changing
- [x] Setting panel

## Tech Stack

<img src="https://skill-icons-livid.vercel.app/icons?i=tauri,react,tailwindcss,ts&gap=60" height="36" />

## Screenshots

<div style="display:flex;gap:12px;justify-content:center">
    <img src="./public/screenshots/normal.png" style="width:45%;max-width:380px">
    <img src="./public/screenshots/active.png" style="width:45%;max-width:380px">
</div>

## Installation

Download the latest [release](https://github.com/yuran1811/yukey/releases)

## Development

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed or downloaded on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [Rust](https://www.rust-lang.org/tools/install)

**Cloning the Repository**

```bash
git clone https://github.com/yuran1811/yukey.git
cd yukey
```

**Installation**

- Enable `pnpm` to build and run the project

```bash
corepack enable pnpm
```

Install the project dependencies:

```bash
pnpm install
```

**Running the Project**

```bash
pnpm tauri dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

See more about [developing](./md/dev.md)

## References

- **Thanks a lot to the following projects**: [hudy9x/keyreader](https://github.com/hudy9x/keyreader)
- More info about [the project](./md)

## License

[BSD 3-Clause](https://opensource.org/licenses/BSD-3-Clause)

`yukey` has been freely available for Linux, MacOS and Windows since 2025.
