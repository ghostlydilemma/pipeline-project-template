# Pipeline Project Template

## Docker Hub Setup:
1. Create an account on https://hub.docker.com
2. Set up an [account access token](https://hub.docker.com/settings/security) and copy it for later
3. Create both a frontend and backend repository on Docker Hub - these have to be public as you can only have one private repository per account
  <br/> This can be circumvented by creating two accounts that hold private repositories. The current setup assumes both is set up on one account though. 

## CI/CD Setup:
Set up the following environment variables:
* `DOCKER_DEPLOYMENT_USERNAME`: Just your Docker Hub username
* `DOCKER_DEPLOYMENT_SECRET`: Account access token created in the previous step (2.)

## NX Cloud Setup:
1. Run `npx nx g @nrwl/nx-cloud:init` and press the link at the end of the command
2. Setup your NX setup
3. Copy the token from the link you accessed

Set up the following Repository secrets:
* `NX_CLOUD_AUTH_TOKEN`: The token from step 3.

## Quick Start
* Install dependencies: `npm ci`
* If needed, set up the database (prisma/schema.prisma) 
* Generate database: `npx prisma migrate dev --name init`
* If you are using IntelliJ there are a couple of Run configurations that you can use

## Development
Use Run Configurations:

- For Development: Serve Monorepo
- For Testing: Test Monorepo
- For Linting: Lint Monorepo

## Technology List / Intended setup
* Backend: NestJS with Fastify
* Frontend: AngularJS
* Database, migration and OEM: Prisma
* CI/CD Pipeline: Github
