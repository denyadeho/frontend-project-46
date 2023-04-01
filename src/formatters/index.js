import funcPlain from "./plain.js";
import funcStylish from "./stylish.js";
import funcJSON from "./json.js";
const format = (file1, file2, format) => {
    if (format === 'plain') {
        return funcPlain(file1, file2);
    }
    if (format === 'json') {
        return JSON.stringify(funcJSON(file1, file2));
    }
    return funcStylish(file1, file2);
}
export default format;
