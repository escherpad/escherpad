# Escherpad Web App

This app is hosted at `https://escherpad.com/`

## Deployment

First compile the code 
```
npm run buld:src
npm run buld:server
```
Then when you launch, you can run
```
npm run start:production
```
This launches a production server at port 3001 by default[^1]. The `nginx` server is configured to proxy this to port `80`.

[^1]: You can't really run `sudo PORT=80 npm run start:production` on linux b/c the npm and node might not exist in super user.

## Usage

### Install Packages

```sh
npm install
```

### To run

```sh
npm start
```
then go to http://localhost:3000 for the demo.

### Using StyleGuidist
StyleGuidist is awesome. You can fire up the styleguidist server to see the list of components under src/components.

> Go visit localhost:6060 for the server

### Using flow 

You need flow-type to shim modules. Usage of flow type syntax see documentation [here](https://flow.org/en/docs/frameworks/react/#adding-types-to-react-functional-components-a-classtoc-idtoc-adding-types-to-react-functional-components-hreftoc-adding-types-to-react-functional-componentsa).


### Todo List


