# Escherpad

A direct neural link to your past, your team, and the world

The most intuitive and beautiful notebook you will ever use, a marriage between org-mode, Evernote, Jupyter notebook and Mathematica. 

A CS student's wet dream, and a designer's best friend.

It all starts here.

## To Develop
### Commit Logs

We use convention commit log standard. Please take a look here: [conventional-changelog-standard](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md)

**Important**: 

Use `make pull` and `make push` instead of `git pull` and `git push` for now. We use `git subtree` to 
manage shared modules to get around `create-react-app` and `react-native`'s problem with transpiling
source files outside their own project folder.

Code share between application project folders are in `../escherpad/client-common.git` repository. Each
project folder has it's own copy of these common asset. Committing in parent repo uploads all copies to
this repository. To pull the most up-to-date copy of the `client-common` module, use

```bash
make pull-desktop-client-common
# or
make pull # which pulls both parent repo *and* client-common inside desktop-app
```

Please refer to README files in each project folder. There are detailed instructions on what to do. 

To share the `client-common` folder with app projects, we use `git subtree`. Details on this tool can be found
[here (atlassian)]. Please take a look at the link and understand `git subtree` before development.

[here (atlassian)]:https://www.atlassian.com/blog/git/alternatives-to-git-submodule-git-subtree

- [desktop-app](desktop-app): repo contains code for the electron-based desktop app.
- [ios-app](ios-app): repo contains code for escherpad iOS app
- [client-common](client-common): repo contains common js code for the client apps.
- [browser-plugin](browser-plugin): repo contains the react-native code for browser plugins
