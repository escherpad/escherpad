# Gittor Markdown Example:tada:

## Part One: Standard Markdown Syntax

### Tables

A table can be made like this:
inline style            | syntax             | comments
----------------------- | ------------------ | -----------
*emphasis* (italic)     | *                  | no space after the first delimiter or before last
**bold**                | **                 | same as above
~~strike through~~      | ~~                 | same
`inline code block`     | \` (back tick)     | usually the key <kbd>~</kbd> under your <kbd>esc</kbd> key.
<mark>highlight</mark>  | `<mark></mark>`    |
<kbd>key</kbd>          | `<kbd></kbd>`      |
[link]()                | `[text](link-url)` |


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
It turned out that you can do this to ordered list as well!
```markdown
1. [x] remember to leave the correct spacing
    1. [ ] and it works in sub list as well.
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

## Other Goodies Not Available in GFM but supported on Gittor

These features are in fact part of CommonMark and available widely in various systems.
### References
When is the last time you see someone using[^foot-note-1]? Footnotes, or references is an important part of scientific writing.

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

<!--### Table of contents-->
<!--To add table of contents, use the following syntax: -->
<!--```markdown-->
<!--@[toc](title of this table of content session)-->
<!--```-->

<!--and this should render something allong the line of: **note that it has to start with a new line**-->

<!--@[toc](table of contents)-->
