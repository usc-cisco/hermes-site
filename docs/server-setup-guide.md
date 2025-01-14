# Server Setup Guide

Before running the `deploy.yml` workflow, ensure that the server is properly set up. Without completing this setup, the workflow will not work as expected.

## Step 1: SSH into the DCISM Server

SSH into the server using the instructions provided at `admin.dcism.org`.

## Step 2: Clone the Repository

Clone the repository to the subdomain:

```bash
git clone https://github.com/usc-cisco/hermes-site.git
cd hermes-site
```

> [!NOTE]
> Make sure to replace {{ QUEUE_SUBDOMAIN }} with the actual subdomain.

## Step 3: Install Dependencies

Install the necessary dependencies using Bun:

```bash
npm ci
```

## Step 4: Build the app

Create a production build of the app

```bash
npm run build
```

## Step 5: Move the build files into the project root

The files are, by default, stored in `dist/`, so move them to the project root
to prevent having to go to `/dist` on the URL.

```bash
rsync -arz --delete ./dist/ ~/queue.dcism.org/
```

Once this setup is complete, you can proceed with the `deploy.yml` workflow.
