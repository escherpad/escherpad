// @flow

export function accountKey(client_id : string, access_token : string, service_type : string) : AccountT {
    const uuidGenerator = require('uuid/v4');
    return {
        $key: uuidGenerator(),
        client_id: client_id,
        access_token: access_token,
        service_type: service_type,
        view: {
            user_id: null,
            username: null,
            email: null,
            name: null
        }
    }
}