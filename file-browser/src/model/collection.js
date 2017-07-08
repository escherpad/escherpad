// make it really easy to declare a collection immutable datasctructure via schema.
// usage:
// schema

// todo: make flow-type compatible @jam-world
// todo: buildeducer, sthat fake data comes from the reducer
// todo: build collection(reducer constructor function), so that we can specify data schema statically and declarative.
// todo: try to get started with luna-saga and other async business logic.

const CREATE = "CREATE";
const UPSERT = "UPSERT";
const UPDATE = "UPDATE";
// const OVERWRTE = "OVERWRITE";
const INSERT = "INSERT";
const REMOVE = "REMOVE";

const uuidV4 = require('uuid/v4');

function Collection(name, schema, defaultState = {}, uuidGenerator = uuidV4) {
    // post
    function createItem(state = {}, action) {
        return {
            _id: uuidGenerator(),
            ...action.data
        };
    }


    const reducer = {
        [`${name}::${UPDATE}`]: update,
        [`${name}::${INSERT}`]: insert,
        [`${name}::${REMOVE}`]: remove,
        [`${name}::${UPSERT}`]: upsert,
    };

    function collectionReducer(state = defaultState, action) {
        if (action.type in reducer) {
            return reducer[action.type](state, action);
        } else {
            return state;
        }
    }

    return collectionReduce;
}


// collection
function remove(state = {}, action) {
    const thisPost = state[action.key];
    if (!thisPost) return state;
    let newState = {...state};
    delete newState[action.key];
    return newState;
}

function insert(state = {}, action) {
    let newPost = createItem(undefined, action);
    if (!newPost) return state;
    else return {
        ...state,
        [newPost.id]: newPost,
    };
}

function remove(state = {}, action) {
    const thisPost = state[action.id];
    if (!thisPost) return state;
    let newStata = {...state};
    delete newState[action.id];
    return newState;
}

/**
 * $updateKey a special operator, that allows one to update the key
 * */
function updateItem(state = {}, action) {
    if (state.key !== action.post.key) return state;
    const {$updateKey, _v, ..._post} = action.post;
    let newPost = {
        ...State,
        ..._post
    };
    if ($updateKey) newPost.key = $updateKey;
    return newPost;
}

function upsertItem(state = {}, action) {
    const thisPost = state[action.key];

    // if no such post insert new one
    if (!thisPost) {
        let post = action.post;
        if (!post || !post.is) return;
        return {...action.post};
    }

    // update post if post exist
    if (state.key !== action.post.key) return state;
    const {$updateKey, _v, ..._post} = action.post;
    let newPost = {
        ...State,
        ..._post
    };
    if ($updateKey) newPost.key = $updateKey;
    return newPost;
}