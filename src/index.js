import fs from 'node:fs';
import path from 'path';
import _ from "lodash";
import jsYaml from "js-yaml";
import parserYaml from "../parsers/parserYaml.js";
import parserJSON from "../parsers/parserJSON.js";
import parser from "../parsers/parser.js";
import funcPlain from "./formatters/plain.js";
import funcStylish from "./formatters/stylish.js";
import format from "./formatters/index.js";


const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
    const file1 = parser(filepath1);
    const file2 = parser(filepath2);
    return format(file1, file2, formatName);
}

// console.log(genDiff('../__fixtures__/file7.yml', '../__fixtures__/file8.yml', 'plain'))

export default genDiff;
