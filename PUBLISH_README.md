# Publish Readme
## How to publish electron app
    ``` sh
    yarn electron-pack
    ```
---
## Tools
    - [electron-builder](https://github.com/electron-userland/electron-builder)
### Install
    ``` sh
    yarn add electron-builder --dev
    ```
    Or
    *WARNING*: Yarn is [preferred](https://github.com/electron-userland/electron-builder/issues/1147#issuecomment-276284477), in fact.
    ``` sh
    npm install electron-builder --dev
    ```
## Configuration
    Create-react-app (CRA) is conflict with current version(19.13.0) of electron-builder. Hence, Some modification for package.json is needed. ([Reference](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3))
### Dependency
    ``` sh
    npm install electron-builder wait-on concurrently --dev
    npm install --save electron-is-dev
    ```

### Add to package.json
    - Wait CRA runs the React app on localhost:3000 before starting Electron.
    ```
    "electron-dev": "concurrently \"BROWSER=none yarn start\" \"wait-on http://localhost:3000 && electron .\""
    ```
    - Add the “build” property to package.json and point electron-builder to the correct folders.
    ``` json
    "build": {
        "appId": "com.example.electron-cra",
        "files": [
            "build/**/*",
            "node_modules/**/*"
        ],
        "directories":{
            "buildResources": "assets"
        }
    }
    ```
    - Add the “electron-pack” npm script.
    ``` json
    "electron-pack": "build --em.main=build/electron.js"
    ```
    - Add pre-command that build the React app before packaging the Electron app.
    ```
    "preelectron-pack": "yarn build"
    ```    


