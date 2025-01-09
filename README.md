# hermes-site

Frontend for Project Hermes — a queue system for DCISM students, by DCISM students.

## Getting Started

Clone the repository:

```sh
git clone https://github.com/usc-cisco/hermes-site.git
```

### Set Up Development Environment

You can develop in two ways:

- [(Recommended) With Dev Containers](#develop-with-dev-containers)
- [Without Dev Containers](#develop-locally)

#### Which should I choose?

Use Dev Containers if you're on a UNIX-based system (macOS, Linux, WSL 2, etc.) for easier setup with pre-configured tools. On Windows without WSL, develop locally due to [this Vite issue](https://github.com/vitejs/vite/issues/16143).

## Develop with Dev Containers

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
  - [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Docker](https://docs.docker.com/engine/install/)

### Open the Project in VSCode

1. Open the Command Palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on macOS).
2. Run `Dev Containers: Reopen in Container`.

> [!NOTE]
> The initial build might take some time.

### Start the Development Server

Once ready, start the server:

```sh
npm run dev
```

### FAQs

1. **How do I stop the container?**

Exiting VSCode will stop the container. To remove all containers and clean up:

```sh
# Bash, ZSH, etc.
docker stop $(docker ps -qa)
docker rm $(docker ps -qa)
docker rmi -f $(docker images -qa)

# PowerShell
docker stop @(docker ps -qa)
docker rm @(docker ps -qa)
docker rmi -f @(docker images -qa)
```

2. **How can I return to my local environment?**

- Open the Command Palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on macOS).
- Run `Dev Containers: Reopen Folder Locally`.

## Develop Locally

### Prerequisites

- [Node.js](https://nodejs.org/en)

### Install Dependencies

```sh
npm install
```

### Start the Development Server

Once ready, start the server:

```sh
npm run dev
```

Edit files using your preferred editor.

---

For setup issues, contact Jan Carlo.
