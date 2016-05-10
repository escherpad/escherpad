# Editor Config Modal

What needs to be in here?

## Example Mock Up

Settings for   | \<Note title\>
-------------- | ------------------
language/mode  | select


Global Editor Settings    |                        |
------------------------- | -----------------------
keybinding                | select
theme                     | select
line numbers              | toggle
line height               | input \<numbers\> **need validation**
font size                 | input \<numbers\> **need validation**
auto completion           | toggle/select? TBD

Markdown Specific  |                     |
------------------ | ------------------- |
emoji              | toggle
emoji shorthand    | toggle
table of content   | toggle
math deliminator   | input or toggle?
    inline         |
    display        |

## Options and type
### General
- keybindings::select
- languange/mode::select
- theme::select
- line numbers::toggle
- line height::input<number>
- font size::input<number>
- Auto Completion::toggle

### Markdown specific
- emoji::toggle
- emoji short hand::toggle
- table of content::toggle
- math deliminator::toggle
    - inline dlim::input<string>
    - display dlim::input<string>

## Design Spec

input type | comments
---------- | ---------
select     |
toggle     |
input      | number, date, etc.



Ps: this is sort of a standard information architecture practice.

Uhm... where do we save these settings?
