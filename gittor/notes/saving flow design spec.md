1. in note mode, click "save to...". A selection menu opens, showing
    - Drobox and GitHub (showing only storage apps.)\
    each app will show existing accounts/configurations. Show detailed view once
    use click into the app.

2. clicking on an "app" to authorize, it opens up a new tab, and take you to
    the OAuth portal of that service.

3. when authorized, the flow takes you back to a dedicated integration page.
    the integration page udpates the localStorage of the app, which then updates
    the editor view via the storages' subscription.

4. The auth page
    - highlights the new configuration. "New" disappears after mouse over.

5. The user selects the account. (shouldn't be account that the user select. Should
be a backend/service.)
    - ask the user to close this page, and go back to the editor page.

5. The editor page now has the configuration for that integration listed, and the
user can click on the integration to save the particular note to.

6. the user then closes the "save-to" modal.

7. The "save-to" button dissapears, showing a badge with the name of the integration. (*to allow config of the integration see #8.)\
    **Note**: name in the format of: `dropbox:yangge1987@gmail.com`.

8. To change the name of this integration, right click, or click to go to the bindr view where you can config the bindr by clicking on the chevron that is right next to it.\
    **Note**: we show the short name of the bindr name when there is no other bindr with the same name. So it is only a display state in some sense. (Component checks all available bindrs)

## The questions I had:

Do we open a new tab for OAuth, or remain in the same tab?
: New tab, because open tab can be updated via `LocalStorage`

Do we open a new mini window or a new Tab?
: New window with

    ```javascript
    window.open("https://schusterlab.slack.com/apps/manage", "somename", "modal=yes");
    ```
    This is nice for a few reasons:
    1. new window shows the url of the OAuth portal. Compared with a mini modal, \
    this gives people a better sense of security.
    2. It allows us to transition to the OAuth redirect page of our app while keeping\
    the editor save-to modal view state.

How are notes saved (with Dropbox)?
: Notes are saved with Dropbox under an account. Sharing is **not** done via their parent folders.
Instead, sharing is done on the note themselves. **Each note saves the id of the account, as well as
the file id**
    - as soon as a note is associated with a *service*, the `uid` of that services is attached to the
    note, and the id of the note is changed to "\<service\>:\<uid\>". This way, there is only one version
    of each (dropbox) file in our database.

How are note account info saved (with Dropbox `uid`)?
: same as in dropbox's database. an array of account uid's are saved in an array.

What are the life-cycle stages of a note?
: Those are:
    - UPSERT_POST:
    - ADD_ACCOUNT_TO_POST: add a user account to a post.

        typically, a string of "dropbox:\<dropbox id\>" is added to the array in that post:
        ```json
        post: {
            users: [
                "id:<uuid-1>",
                "id:<uuid-2>",
                ...

            ]
        }
        ```

## Design Doc

view,

model



