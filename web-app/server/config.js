/** Created by ge on 12/8/17. */
import {} from "dotenv/config";

const NODE_ENV = process.env.NODE_ENV || 'dev';
const PUBLIC_DIR = process.env.PUBLIC_DIR || "../web-build";
const PORT = process.env.PORT || 3001;

export {
    NODE_ENV, PUBLIC_DIR, PORT
}
