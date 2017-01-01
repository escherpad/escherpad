## Todos

1. [ ] show list of folders from dropbox in search view.
    - Gittor
    - interview preps
0. [x] do NOT download search result in root folder.
1. [work in progress] create new note with the same extension, accountKey and path as current note
    1. [x] add `mimeType` field to posts
    2. [ ] add `mimeType` update to `UPDATE_POST` hook.
    3. [ ] add `mimeType` handling to editor dropdown
    4. [ ] add popup to notify the change of `mimeType`.
        1. 'MIMETYPE_UPDATE_INQUIRE'
        2. 'MIMETYPE_UPDATE_CONFIRM'
    5. [ ] make `TitleBar` title change dispatch **only** on entry and blur.
    
2. make it easy to switch to a different note in profile view.
    - [ ] profile view `<ListPanel/>` vs `<Editor/>` dual view (save in viewMode object?)
3. fast-click messes up all scroll events:
    1. save to backend folder view is not scrollable at all
    2. posts focus on EditorView upon touch start, which then changes the focus
4. AceEditor does not work on mobile
    1. arrow key does not move cursor around 【switch to textarea instead?]
5. dropbox preview for Office docs does not work on mobile.

### done

0. [x] create post => add account to post, update post key

## TODOs
2. [todo] standardize the architecture of text editor, make it pluggable and standardized
1. [bug] fix editor modal selection
1. [bug] have note change `uuid` to dropbox id when ADD_ACCOUNT_TO_POST
2. [bug] lingering unsaved modification due to limitation of `saga`
3. [feature] highlight the note that is currently open in the editor.
3. add infinite scroll to the postList
4. reminder: deal with the corner cases where `maxLength` has already gone up. 
    ```
    collapse only when existing items are not inside the maxLength?
    ```
5. add modal for note deletion
6. in that modal, link the deletion to dropbox backend with an option.
7. [feature] add dropbox global results in a separate list in `postList`

## done
3. [x] fix file saving to dropbox bug. where post uuid is supplanted by dropbox id
1. [x] fix create post and upload post bug after working through the process quite a number of times. 
1. [x] the keystroke response in the editors is a bit slow. Investigate cause and fix it.

    note: turned out that using `@debounce(4)` with the editor change events complete fixed 
    the problem! The rendering takes about 78 ms. If two of these are triggered in between
    the onChange handler and the onCursorChange handler of the AceEditor, it blocks the
    execution of the editor. This 156 ms is enough and quite obvious between keystrokes.

### Editor Enhancement Ideas

- todo item management (batch update multiple todo strings, move todo items) 
- customizable tags, highlight particular keywords

1. [ ] Batch action on updating all notes associated: like update todo item in comments when the item is updated in master todo file.
1. [ ] can't save to GitHub repo yet.
2. [ ] what to do with tens of notes under root?
3. [ ] import from existing store.

file :
- change title
- change text
- sync with dropbox by diff-sync (client initiated)
- share with other people (via dropbox)

## Finished Tasks
1. [x] add hand writing notes.

## Finished TODOs

3. [x] use parentFolder for path to avoid confusion with file path.
4. [x] make the folder tags much shorter.
5. [x] use parent folder name as back button
6. [x] make all folder name short.
7. [x] make it possible to click on the badges to go to folder (set: `postList.accountKey` and `.path`)
    - [x] add trigger on `POSTLIST_GO_TO_FOLDER`
8. [x] add handler for action: `POSTLIST_GO_TO_FOLDER`: post list filtering, and download list of notes from dropbox

3. [x] add binders to notes
4. [x] be able to use the notebooks across devices (via dropbox backend)
5. [x] view all notes under one dropbox account

1. [done] figure out the best way to load all notes from dropbox.
    best way to load all notes, is by searching with extensions `.md` `.ink` etc. 
    
1. [done] question: save-on-write caching or cache all? [Answer: cache for now.]
1. [x] add dropbox folder view support.
0. [x] search render throttling to improve UX.\
    note: throttling is working perfectly. However searchQuery update interrupts the
    enter and leave animation, making the UX very very bad.

    might want to batch the props that are applied to the list view. **not just** `post`.
    `postList` too.
    
3. [x] fix note saving, make sure final version is always saved.
4. [x] search bar Chinese input throttling
1. [x] add search
1. [x] fix title box
2. [x] fix title box initialization bug
3. [x] add copy, paste, and cut handler to inlineEditable
1. [x] integrate with dropbox API to save all notes on dropbox.
4. [x] fix `luna-saga` select effect initial blockage
5. [x] get note title to rename on dropbox properly.
1. [x] add `localStorage` badge
2. [x] show folder/path for every note
2. [x] fix rendering when no post exist.
