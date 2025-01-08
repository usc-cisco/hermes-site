# hermes-site

Frontend for Project Hermes - a queue system for DCISM students, by DCISM students.

## Prerequisites

Ensure the following are installed:

- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
  - [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Docker](https://docs.docker.com/engine/install/)

## Getting Started

### 1. Clone the Repository

Clone the project to your local machine.

```sh
git clone https://github.com/usc-cisco/hermes-site.git
```

### 2. Open the Project

Open the project in Visual Studio Code:

1. Open the Command Palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on macOS).
2. Run `Dev Containers: Reopen in Container`.

> [!NOTE]
> The initial build may take some time.

### 3. Start the Development Server

Once the environment is ready, start the development server:

```sh
yarn dev
```

## FAQ

1. **Does this work with WSL?**

Yes, read this [article](https://code.visualstudio.com/blogs/2020/07/01/containers-wsl).

TL;DR: Windows users may need Docker Desktop, which detects WSL 2 if installed and can use it as the backend. The WSL integration is optional. The key is having Docker installed, regardless of WSL.

2. **How can I close the container?**

Exiting VSCode will automatically close the container and save resources. To further clean up artifacts, run these commands:

```sh
# Stop and remove all containers
docker stop $(docker ps -qa)
docker rm $(docker ps -qa)

# Remove all local images
# Warning: This will remove images locally, and you'll need to re-pull the images if needed
docker rmi $(docker images -qa)
```

3. **How can I return to my local environment?**

- Open the Command Palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on macOS).
- Run `Dev Containers: Reopen Folder Locally`.

For setup issues, contact Jan Carlo.
