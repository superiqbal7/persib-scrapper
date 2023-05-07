# Persib-Scrapper

## Getting Started

### Prerequisites

- Docker
- Node JS
- NPM
- Git


### Installation

Clone the repository

```bash
git clone git@github.com:superiqbal7/persib-scrapper.git
```

Change directory to the project root

```bash
cd persib-scrapper
```
create environment variable file from example file

```bash
cp .env.example .env
```
Start the app

```bash
npm install
npm run start
```

Docker will handle the rest. From spinning up the containers to installing the dependencies and running the app. sometimes it might take a while to install the dependencies. So be patient. Wait for the message in terminal to display the following message:

```
 webpack compiled successfully
```
This means the app is ready to be used.

The app REST API will be available at http://localhost:5051/api/v1/scrapper
