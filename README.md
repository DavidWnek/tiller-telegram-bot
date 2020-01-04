
## Getting started

```sh
# Clone the project
git clone git@github.com:caxy/express-api-starter-kit.git
cd express-api-starter-kit

# Make it your own
rm -rf .git && git init && yarn init
cp .env.example .env

# Install dependencies
yarn install

```
Then you can begin development:

```sh
yarn dev
```

This will launch a [nodemon](https://nodemon.io/) process for automatic server restarts when your code changes.

### Testing

Testing is powered by [Jest](https://facebook.github.io/jest/). This project also uses [supertest](https://github.com/visionmedia/supertest) for demonstrating a simple routing smoke test suite. Feel free to remove supertest entirely if you don't wish to use it.

Start the test runner in watch mode with:

```sh
yarn test

```

You can also generate coverage with:

```sh
yarn test --coverage

```

### Linting

Linting is set up using [ESLint](http://eslint.org/). It uses ESLint's default [eslint:recommended](https://github.com/eslint/eslint/blob/master/conf/eslint.json) rules. Feel free to use your own rules and/or extend another popular linting config (e.g. [airbnb's](https://www.npmjs.com/package/eslint-config-airbnb) or [standard](https://github.com/feross/eslint-config-standard)).

Begin linting in watch mode with:

```sh
yarn run lint

```

To begin linting and start the server simultaneously, edit the `package.json` like this:

```
"dev": "nodemon src/index.js --exec \"node -r dotenv/config -r babel-register\" | npm run lint"
```

### Environmental variables in development

The project uses [dotenv](https://www.npmjs.com/package/dotenv) for setting environmental variables during development. Simply copy `.env.example`, rename it to `.env` and add your env vars as you see fit. 

It is **strongly** recommended **never** to check in your .env file to version control. It should only include environment-specific values such as database passwords or API keys used in development. Your production env variables should be different and be set differently depending on your hosting solution. `dotenv` is only for development.

### Deployment

Deployment is specific to hosting platform/provider but generally:

```sh
yarn build

```

##PM2

A common tool we use for deploying and running node processes is [PM2](http://pm2.keymetrics.io/). 

It used a ecosystem.config.js file to start single or multiple processes in different modes for load balancing.

Copy the .dist as a starting place, any .env variables created should be added here. 
####NOTE. Do not include any Private credentials in the .dist.

```sh
cp ecosystem.config.js.dist ecosystem.config.js

```

To start the server, ensure pm2 is installed properly, then run:

```sh
yarn deploy
```

This will install latest packages, build the project, and reload the config in pm2.
This command is safe to use with Jenkins deployments.

