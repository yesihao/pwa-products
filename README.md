# Requirement

This project requires [fish](http://www.fishshell.com/) and [yarn](https://yarnpkg.com/) to run scripts, and [eslint](https://eslint.org/)(The latest version is recommanded) to lint codes. Be sure you have installed them properly.

# Scripts

```bash
# To install dependencies.
yarn

# To start a dev server.
yarn start

# To build a distribution. Modes supported are: test, prod, stat
yarn build:[mode]

# To deploy a built distribution. Modes supported are: test, prod
yarn deploy:[mode]

# To publish a distribution. It's equivalent to run yarn build:[mode]; yarn deploy:[mode].
# Modes supported are: test, prod
yarn publish:[mode]

# To lint, and fix linting errors.
yarn lint
yarn lint:fix
```
