import fs from "node:fs";

const parserJSON = (filepath) => {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}
export default parserJSON;
