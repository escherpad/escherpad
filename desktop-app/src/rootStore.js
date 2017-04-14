import {Store, combineReducers} from "luna";
import Saga, {sagaConnect} from "luna-saga";

import ModalReducer from "../lib/ModalReducer";

const reducer = combineReducers({
    notices,
    session,
    editor,
    viewMode,
    // bindrs,
    postList,
    posts,
    accounts,
    // view states
    editorDropdown: ModalReducer('editor_dropdown'),
    editorDropdownMinor: ModalReducer('editor_dropdown_minor'),
    postSaveModal: ModalReducer('post_save_modal'),
    accountBrowser: ModalReducer('account_browser', accountBrowserReducer),
    editorConfigModal: ModalReducer('editor_config_modal')
});
