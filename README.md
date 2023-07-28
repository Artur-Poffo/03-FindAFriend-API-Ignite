<h1 align="center">
  <a href="#">Find A Friend API Ignite</a>
</h1>

<h3 align="center">
  API for pet adoption
</h3>

<h4 align="center"> 
	 Status: Finished
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#api-routes">API Routes</a> • 
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> • 
 <a href="#author">Author</a>
</p>


## About

Find A Friend API - Ignite's third challenge on the Node.js trail, enables the registration of organizations and pets for adoption

---

## Features

- [x] Register organization
- [x] Sign In with organization
  - [x] JWT Authentication
- [x] Register a pet in an organization
- [x] List all pets for adoption in a city
- [x] Filter one unique pet with ID
- [x] Filter pets by traits
- [x] Persist data in Postgres database with docker

---

## API Routes

- **_Organizations_**
  - **POST /orgs** - Register a new organization
  - **POST /sessions** - Sign in with organization and generate JWT
  - **PATCH /token/refresh** - Refresh token
- **_Pets_**
  - **GET /pets** - List all pets for adoption in a city or filter by params
  - **GET /pets/:id** - See a specific pet details with ID
  - **POST /pets** - Register a new pet in an organization **Require a valid Bearer Token in the req's header**

---

## How it works

### Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
In addition, it is good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/) and a REST client like [Insomnia](https://insomnia.rest/)

You will also need to have [Docker](https://www.docker.com/) installed to run the
postgres database with [Docker Compose](https://docs.docker.com/compose/)

**it is very important that before running the project you configure the environment variables as indicated in the file: .env.example**

#### Run the app

```bash
# Clone this repository
$ git clone https://github.com/Artur-Poffo/03-FindAFriend-API-Ignite.git

# Access the project folder cmd/terminal
$ cd 03-FindAFriend-API-Ignite

# install the dependencies
$ npm install

# Inicialize the database
# In the root directory after installing docker run:
$ docker compose up
# This command should create and start a container with Postgres database

# Then when you want to stop running docker run:
$ docker compose stop
# Or just press Ctrl+c

# With your database running and connected in .env file:
$ npx prisma migrate dev

# Run the application in development mode
$ npm run dev

# The server will start at port: 3333 - You can now test in Insomnia or another REST client: http://localhost:3333
```

#### Run tests

```bash
# Run unit tests
$ npm run test

# Run E2E tests
$ npm run test:e2e

# Run test coverage
$ npm run test:coverage
```

---

## Tech Stack

The following tools were used in the construction of the project:

- **Node.js**
- **TypeScript**
- **tsx**
- **tsup**
- **Fastify**
- **@Fastify/jwt**
- **@Fastify/cookie**
- **bcrypt**
- **zod**
- **prisma**
- **vitest**
- **supertest**

> See the file  [package.json](https://github.com/Artur-Poffo/03-FindAFriend-API-Ignite/blob/main/package.json)

---

## Author

- _**Artur Poffo - Developer**_

[![Linkedin Badge](https://img.shields.io/badge/-Artur-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/arturpoffo/)](https://www.linkedin.com/in/arturpoffo/)
[![Gmail Badge](https://img.shields.io/badge/-arturpoffop@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:arturpoffop@gmail.com)

---