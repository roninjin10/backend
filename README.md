# Express.js with Babel 

This repo serves as the backend for the catalyst project.

The backend uses passport for authentication, express for the server, postgresql for the database, and sequelize for the ORM.

Make sure you read the FAQ for more details and info.

### Features:
- [Express.js](https://expressjs.com/) as the web framework.
- ES2017+ support with [Babel](https://babeljs.io/).
- Automatic polyfill requires based on environment with [babel-preset-env](https://github.com/babel/babel-preset-env).
- Linting with [ESLint](http://eslint.org/).
- Testing with [Jest](https://facebook.github.io/jest/).
- [Quick deployment guide](DEPLOYMENT.md) for Heroku, AWS Elastic Beanstalk, and App Engine.

## Getting started

# Install dependencies
npm install

# create database
sequelize db:create

# migrate database
sequelize db:migrate

# seed database
sequelize db:seed:all
```
Then you can begin development:


# npm
npm run dev
```

This will launch a [nodemon](https://nodemon.io/) process for automatic server restarts when your code changes.

### Testing

Testing is powered by [Jest](https://facebook.github.io/jest/). This project also uses [supertest](https://github.com/visionmedia/supertest) for demonstrating a simple routing smoke test suite. Feel free to remove supertest entirely if you don't wish to use it.

Start the test runner in watch mode with:

```sh

# npm
npm test
```

You can also generate coverage with:

# npm
npm test -- --coverage
```

### Linting

Linting is set up using [ESLint](http://eslint.org/). It uses ESLint's default [eslint:recommended](https://github.com/eslint/eslint/blob/master/conf/eslint.json) rules. Feel free to use your own rules and/or extend another popular linting config (e.g. [airbnb's](https://www.npmjs.com/package/eslint-config-airbnb) or [standard](https://github.com/feross/eslint-config-standard)).

Begin linting in watch mode with:


# npm
npm run lint
```

To begin linting and start the server simultaneously, edit the `package.json` like this:

```
"dev": "nodemon src/index.js --exec \"node -r dotenv/config -r babel-register\" | npm run lint"
```

## FAQ

**Where is all the configuration for ESLint, Jest and Babel?**

In `package.json`. Feel free to extract them in separate respective config files if you like.

**Why are you using `babel-register` instead of `babel-node`?**

`babel-node` contains a small "trap", it loads Babel's [polyfill](https://babeljs.io/docs/usage/polyfill/) by default. This means that if you use something that needs to be polyfilled, it'll work just fine in development (because `babel-node` polyfills it automatically) but it'll break in production because it needs to be explicitely included in Babel's CLI which handles the final build.

In order to avoid such confusions, `babel-register` is a more sensible approach in keeping the development and production runtimes equal. By using [babel-preset-env](https://github.com/babel/babel-preset-env) only code that's not supported by the running environment is transpiled and any polyfills required are automatically inserted.

