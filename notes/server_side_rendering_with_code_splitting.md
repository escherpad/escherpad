# Server-side Rendering with Code Splitting

> How to stop the "flash of death"

## Two different routes

There are two ways to prevent the "flash" from happening. 
1. Load the needed chunks synchronously, *after* bootstrap and before rendering.

    This requires the server to be aware of the `id` of the chunk during serving. This method is used by `@lyft/universal-async-component` library. It requires `webpack`. 
    
2. Alternatively, you can use a client-side `asyncBootstraper` to postpone the rendering of the `<Root/>` component until the async bundles are all loaded. This is the approach taken by the `react-async-component` library. 

    The pros of this method are:
    1. your app `index.js` on the client side has control of the initial rendering. You *don't* have to do this in the `index.html` template by setting a script loading sequence.
    2. You don't have to interact with webpack. The script name does not need to be `chunk.id` aware.
    
So after a bit of research, I decide to take the second route.

**Initial thought**: should probably switch to the universal async component instead.
**Afterward**: no the `react-async-compoent` library is perfect.

## References:

- **`react-async-component`**: https://github.com/ctrlplusb/react-async-component
- **`@lyft/universal-async-component`**: https://github.com/lyft/universal-async-component
- https://github.com/ReactTraining/react-router/blob/d64ed0150b41df02b083f090b6682261c819a91e/packages/react-router-dom/docs/guides/code-splitting.md#code-splitting--server-rendering
- **Another in-depth blog post:** https://blog.emilecantin.com/web/react/javascript/2017/05/16/ssr-react-router-4-webpack-code-split.html#loading-all-necessary-chunks-before-the-initial-client-side-render
- **Basic Server-side Rendering:** https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/server-rendering.md
