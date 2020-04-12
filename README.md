# Storyline

## Setup

After cloning the project please install all packages:
```
npm i
```

# Documentation
*System Documentation can be found at the /docs root on the site.*
https://prj666.mystudentlab.ca:6915/docs

## Generating Documentation
### Alternatively you can regenerate and host the documentation yourself:
If you would like to recreate the system documentation using compodoc please run the following from the root project directory:
```
npx @compodoc/compodoc ./src -p ./tsconfig.json
```

## Building

#### Please note that the `build-prod` script will take longer but will produce the production ready version of the app.

- Run `npm run build` or `npm run build-prod` to build the app. The built app can be found in the `dist` directory.

## Development

After performing the steps under the Setup section, you may run `ng serve`.
#### Please note that this can be run with the `--prod` option to create producion ready builds (This make increase build times).

## Creating Pages

Please use the `ng g page pages/<PAGE_NAME>` command (short for generate). This will create a new angular page, with routing, inside of the pages directory

## Creating Services

Please use the `ng g service services/<SERVICE_NAME>` command (short for generate). This will create a new angular service inside of the services directory

## Creating Components

Please use the `ng g component components/<COMPONENT_NAME>` command (short for generate). This will create a new angular component inside of the components directory

## Deployment

In order to create and serve a production ready version of the app, please follow these steps.

- Run `npm i` to install/update any packages needed.
- Run `npm run build-prod` to create a production ready version of the app.
- Run `node server.js` to start an express server running the app.
