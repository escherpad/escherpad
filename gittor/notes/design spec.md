## Store Schema
**data model**
- session: active user session
- users: collection of all users including the current user.
- posts: local and server-synced documents
- accounts: all of the backend accounts the user has
- ~~bindrs: post collections~~

**view model**
- file browser store
    - files: not synced with server.
    - folders: not synced with server


## Design Spec
data `stream$` is a valid input to a component.

components:
- `file browser` (`backendId`, [backends])
    - type: GitHub, Jupyter etc.
- `post-view` (`postId`, [posts])
    - state: `type`,
- markdown-post (three views, preview is part of the editor)
-

## Design Goal
- Able to use without a backend. Just open up the url, and start typing.
- To view your notes, click on button to the left corner.
    Shows list of notes available locally.
- Click on note to select to edit.
- What was open last time gets shown in zen-mode by default.
- identifying post before syncing with backend
- backend saved: per document, via ID, normalized in accounts collection.
- posts list: loaded from local and server.
- for Jupyter and GitHub, the file browser hooks up to the backend of the document

