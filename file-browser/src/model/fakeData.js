/**
 * Created by chencha on 6/3/17.
 */

fakeAccounts = {
    id: "escher", // used internally in our app
    access_token: "justAnotherAccessToken", // OAuth token
    client_id: "my mac", // OAuth client_id
    /** view, read-only fields.
     * design of schema of this field is given by what the components require. */
    view: {
        email,
        name,
        username,
        user_id,
        etc,
    }
};

fakeFileSystem = {
    servce: uuid, // uuid of the service account, saved separately.
    fileType: [FILE, DIRECTORY, LINK],
    path: path,
    ext: [TXT, PNG, PDF, TEX, MD, OTHER],
    data: { // the minimum list of data that **need** to be saved back to the backend when mutated.
        file_path,// {parent_director}/{file_name}
        content: "<base64>", // GitHub uses base64
        source: "unicode text string", // dropbox uses text and raw binary
    },
    summary, // summary data (
    preview, // not saved, not OT.
    presence: { // all of the user interaction presence data are saved here.
    },
    view: { // data generated by our app, for viewing purposes.
        parent_director,
        file_name,
        file_ext,
        file_type: 'markdown'
    }
};
