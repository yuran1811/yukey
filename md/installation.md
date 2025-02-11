# Installation

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

- Build rust source

```bash
cd src-tauri
cargo build
```

- Local development

```bash
pnpm tauri dev
```

# Build the project

- Run this command to build the project

```bash
pnpm tauri build
```
