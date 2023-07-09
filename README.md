# URL Shortener

## Installation
    Note: Requires Node.js v18.14.1 to run properly

```bash
$ npm install
```

## Running the app
1. create a file `config.yaml` in the root folder
2. copy all the context of `config.example.yaml` into the `config.yaml` file
3. change the configuration as you wish (like redis url)
4.  start the app
5. open `http://0.0.0.0:3000/docs/api/v1` in your browser for documentation
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
