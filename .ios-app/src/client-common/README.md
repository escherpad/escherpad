# Escherpad Client Common Modules

repo: https://github.com/escherpad/client-common

Use `git subtree` to push to and pull from this module inside `desktop-app` and `ios-app`. This way `create-react` 
tool chain can correctly transpile the files in this folder. 

`make pull` and `make push` inside `escherpat.git` repo will automatically update the copy of `client-common` inside
the `desktop-app` project folder.

`make push` pushes to the `desktop-app` branch. You can create a Pull Request from that branch after push. For more
control, we will update these tools in the future.

## Todo

- [ ] add `ios-app` and `web-app` to also include this copy.

