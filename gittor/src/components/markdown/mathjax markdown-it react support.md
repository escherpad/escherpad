## Why is this hard?

Markdown-it is async. We have to avoid having large segments of math rerendered
frequently. So we have to rely on reactjs's internal DOM diff patch.

so the Markdown component have to render react childs instead of using the unsafe
html insertion.

## Solution Outline

The full solution involves three parts:
1. an `markdown-it` `AST` to react element renderer.
2. a `markdown-it` math plugin that
    a. replaces all paragraphs with `<div class="paragraph"/>` to allow display 
        blocks in paragraphs
    b. a `math-jax` hanlder that renders the block whenever that react element
        is rendered. This can be done via a `MathJax` react component.

## Math Syntax Specification

take a look at the syntax here:

```yaml
inline: 
    - $[^\w]*$
    - \(...\)

display:
    - $$...$$
    - \[...\]
    - \begin{...} ... \end{...}
```

the following syntax all work:

reference: https://www.cs.princeton.edu/courses/archive/spr10/cos433/Latex/latex-guide.pdf

```javascript
var options = {
    inlineOpen: '$$',
    inlineClose: '$$',
    blockOpen: '$$$',
    blockClose: '$$$',
    renderingOptions: {},
    inlineRenderer: require('ascii2mathml')(this.rendererOptions),
    blockRenderer: require('ascii2mathml')(Object.assign({ display: 'block' },
                                                         this.renderingOptions))
}
```
reference: https://github.com/runarberg/markdown-it-math

