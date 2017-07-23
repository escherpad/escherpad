import React from "react";

// dev only
import JSONPretty from 'react-json-pretty';


export default function Escherpad(props) {
    return (
        <JSONPretty json={props}/>
    );
}
