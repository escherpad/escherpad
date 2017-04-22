# Gittor Markdown Example:tada:

Gittor (Git-Editor) is a CommonMark spec-respecting markdown editor for GitHub and Dropbox. It is a free web-based editor that saves your notes locally in your browser's `LocalStorage`, that can be connected to your Dropbox, GitHub, and Google Drive accounts.

It is betten than exsting markdown editors because

1. [x] editor supports both <kbd>vim</kbd> and <kbd>emacs</kbd>,
2. [x] the preview is styled with **100%** fidelity to GitHub
3. [x] the synchronized scrolling is anchored by cursor. So what you are editing in preview is always going to be right next to where your cursor is in the editor.

The design of Gittor is taken from what I did for the WYSIWYG real-time collaborative notebook [Escherpad](http://escherpad.com), while the development is done such that I can kickass with react for the 2.0 version of Escherpad.

## About Me

My name is Ge Yang, I'm a fifth year physics graduate student at the University of Chicago. I am trying to build a new type of quantum computer in the lab with a single electron floating on the surface of super fluid helium.

## Part One: Standard Markdown Syntax

### Tables

A table can be made like this:

| inline style            | syntax             | comments    |
| ----------------------- | ------------------ | ----------- |
| *emphasis* (italic)     | *                  | no space after the first delimiter or before last |
| **bold**                | **                 | same as above |
| ~~strike through~~      | ~~                 | same |
| `inline code block`     | \` (back tick)     | usually the key <kbd>~</kbd> under your <kbd>esc</kbd> key. |
| <mark>highlight</mark>  | `<mark></mark>`    |  |
| <kbd>key</kbd>          | `<kbd></kbd>`      |  |
| [link]()                | `[text](link-url)` |  |


### horizontal line
To type horizontal line, do `---` or `***`.
for example:
```
---
```
gives you a horizontal line like below:

---
An alternative syntax is to use three `*` like `***`.



## Part Two: Advanced GitHub Flavored Markdown
### Task Lists
Have you ever opened up your notebook just want to write down some todos? In GitHub flavored markdown, you make todo lists by typing `- [ ]` or `- [x]` for completed items. For example:

```markdown
- [x] you can check off a list like this
- [ ] and have more items
    - [x] even sub lists.
```
gets you:
- [x] you can check off a list like this
- [ ] and have more items
    - [x] even sub lists.

#### Ordered Task Lists
It turned out that you can do this to ordered lists as well!
```markdown
1. [x] remember to leave the correct spacing
    1. [ ] and it works in sub lists as well.
```

1. [x] remember to leave the correct spacing
    1. [ ] and it works in sub list as well.

### Code Blocks

If you want to insert a block of code, you can use the  <code>```</code> mark (three backticks) to deliminate such a code block. An optional languange parameter after the opening backticks can be used to specify the languange for the syntax highlighting.

For example:

```
    ```python
    for i in range(10):
        print i; // we should all use python 3 syntax now!
    ```
```
 gives you:

```python
for i in range(10):
    print i; // we should all use python 3 syntax now!
```
### 绘文字 or Emoji:)

You can find a full list of supported emoji on [this cheat sheet](http://www.emoji-cheat-sheet.com)!

## Part Three: Other Goodies Not Available in GFM but supported on Gittor

These features are in fact part of CommonMark and available widely in various systems.
### References
When is the last time you see someone using a footnote in their blog[^foot-note-1]? To add footnotes, you just need to type `[^` and then the id of your footnote, followed by `]`. Now to write the content of the footnote, write: `[^id-of-your-footnote]: content of your footnote` anywhere you want.

[^foot-note-1]: here is a foot note

### Inline and Display Math
**Inline Math**\
To type inline math, use `$` to deliminate LaTeX. Remember to **not** leave empty space after the first deliminator or before the closing one.

**Display Math**\
To type display math, those equation blocks that seem to live between lines, do
$$
\sigma_x = \frac{\hbar}{2} \cdot \left(
                                    \begin{matrix}
                                        0 & i \\
                                        -i & 0
                                    \end{matrix}
                                \right)
$$
