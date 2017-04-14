/** Created by ge on 2/25/17. */
import React from "react";

export default function GitHubMath(props) {
  "use strict";
  let mode = props.mode || "inline";
  return <img className={`math math-${mode}`} alt={props.alt}
              src={`https://render.githubusercontent.com/render/math?math=${
                props.alt.replace(/\+/g, '%2B')
                  .replace(/\\/g, '%5C')
                  .replace(/\{/g, '%7B')
                  .replace(/}/g, '%7D')
                  .replace(/&/g, '%26amp%3B')
                  .replace(/=/g, '%3D')
                  .replace(/\n/g, '%0A')
                  .replace(/\s/g, '')
                }&mode=${mode}`}/>
}
