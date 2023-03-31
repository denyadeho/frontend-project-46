import funcPlain from "./plain.js";
import funcStylish from "./stylish.js";

const format = (file1, file2, format) => {
    if (format === 'plain') {
        return funcPlain(file1, file2);
    }
    return funcStylish(file1, file2);
}

export default format;
