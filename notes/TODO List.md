# Two Main Tasks
0. add hand writing notes.
1. add dropbox folder view support.

# Todos

0. search render throttling to improve UX.\
    note: throttling is working perfectly. However searchQuery update interrups the
    enter and leave animation, making the UX very very bad.

    might want to batch the props that are applied to the list view. **not just** `post`.
    `postList` too.

1. figure out the best way to load all notes from dropbox.
1. save-on-write caching or cache all?
3. fix note saving, make sure final version is always saved.
4. [x] search bar Chinese input throttling
1. [x] add search
3. add binders to notes
1. [x] fix title box
2. [x] fix title box initialization bug
3. [x] add copy, paste, and cut handler to inlineEditable
1. [x] integrate with dropbox API to save all notes on dropbox.
4. [x] fix `luna-saga` select effect initial blockage
5. [x] get note title to rename on dropbox properly.
1. [x] add `localStorage` badge
2. [x] show folder/path for every note

problems?

4. be able to use the notebooks across devices (via dropbox backend)
1. can't save to GitHub repo yet.
2. what to do with tens of notes under root?
3. import from existing store.
5. view all notes under one dropbox account

file :
- change title
- change text
- sync with dropbox by diff-sync (client initiated)
- share with other people (via dropbox)


