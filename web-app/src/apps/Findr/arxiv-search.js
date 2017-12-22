/** Created by ge on 12/20/17. */
import {search} from "../../lib/arxiv/index";

const search_query = {
    all: "electrons on helium",
};

function _search() {
    search(search_query, function (err, results) {
        // console.log('Found ' + results.items.length + ' results out of ' + results.total);
        // console.log(results.items[0].title);
        // console.log(results.items[0].authors[0].name);
        console.log(results);
    });

}

export {_search};
