import fs from 'node:fs';
import path from 'path';
import _ from "lodash";
import jsYaml from "js-yaml";
import parserYaml from "../parsers/parserYaml.js";
import parserJSON from "../parsers/parserJSON.js";
import parser from "../parsers/parser.js";

const logicFunc = (file1, file2) => {

    const result = [];

    const allKeys = _.uniq([...Object.keys(file1), ...Object.keys(file2)].sort());

    for (const item of allKeys) {
        if (file1[item] !== undefined && file2[item] === undefined) {
            result.push(`- ${item}: ${file1[item]}`)
        }
        if (file2[item] !== undefined && file1[item] === undefined) {
            result.push(`+ ${item}: ${file2[item]}`)
        }
        if (file1[item] === file2[item]) {
            result.push(`  ${item}: ${file1[item]}`)
        }
        if (file1[item] !== undefined && file2[item] !== undefined && file1[item] !== file2[item]) {
            result.push(`- ${item}: ${file1[item]}`);
            result.push(`+ ${item}: ${file2[item]}`)
        }
    }

    const text = `{\n${result.join('\n')}\n}`;
    return text;
}


const genDiff = (filepath1, filepath2) => {
    const file1 = parser(filepath1);
    const file2 = parser(filepath2);

    return logicFunc(file1, file2)
}

export default genDiff;
