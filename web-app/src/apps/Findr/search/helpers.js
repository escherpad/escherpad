//@flow
import * as gsearch from "gsearch";
import type {TQueryResult, TSimpleQuery, TSimpleResult} from "./types";
import {RESULT_TYPES} from "./types";

/* helpers */
export async function googleAutoComplete(query: TSimpleQuery): Promise<TQueryResult> {
    let data;
    try {
        data = await new Promise((resolve, reject) => {
            //todo: need to fix gsearch bug when query is empty ""
            if (!query.text) return reject({
                message: "empty query causes `gsearch` to throw <!DOCTYPE html>"
            });
            else gsearch.suggest(query.text, (error, data, res) => {
                if (error) reject(error); else resolve(data);
            });
        });
    } catch (e) {
        throw e;
    }
    return {
        items: data.map((i: TSimpleResult) => ({type: RESULT_TYPES.google_autocomplete, text: i}))
    };
}


// export async function arxivSimple(query: TSimpleQuery): Promise<Array<TComplexQuery>> {
//     let data;
// }

// function test() {
//     googleAutoComplete({text: "a"}).then((r) => {
//         console.log(r);
//     }).catch((err) => {
//         console.warn(err.message);
//     })
// }
//
// test();
