import fs from 'node:fs';
import path from 'path';
import _ from "lodash";
import jsYaml from "js-yaml";
import parserYaml from "../parsers/parserYaml.js";
import parserJSON from "../parsers/parserJSON.js";
import parser from "../parsers/parser.js";
const getTextForPush = (key, value, deepLVL, sign, isSetSign = true) => {
    return `${' '.repeat(deepLVL * 4)}${isSetSign ? sign : ''} ${key}: ${value}`
}
const logicFunc = (file1, file2, deepLVL = 0, isSetSign = true) => {

    const result = [];

    const allKeys = _.uniq([...Object.keys(file1), ...Object.keys(file2)].sort());

    for (const item of allKeys) {
        if (_.isObject(file1[item]) || _.isObject(file2[item])) {
            if (_.isObject(file1[item]) && _.isObject(file2[item])) {
                const deepResult = logicFunc(file1[item], file2[item], deepLVL + 1);
                    result.push(getTextForPush(item, deepResult, deepLVL, ''));
            }
            if (_.isObject(file1[item]) && !_.isObject(file2[item])) {
                const deepResult = logicFunc(file1[item], {}, deepLVL + 1, false);
                    result.push(getTextForPush(item, deepResult, deepLVL, '-', isSetSign));
                if (file2[item] !== undefined) {
                    result.push(getTextForPush(item, file2[item], deepLVL, '+', isSetSign))
                }
            }
            if (!_.isObject(file1[item]) && _.isObject(file2[item])) {
                const deepResult = logicFunc({}, file2[item], deepLVL + 1, false);
                if (file1[item] !== undefined) {
                    result.push(getTextForPush(item, file1[item], deepLVL, '-'))
                }
                    result.push(getTextForPush(item, deepResult, deepLVL, '+', isSetSign))
            }
        }

        else {
        if (file1[item] !== undefined && file2[item] === undefined) {
            result.push(getTextForPush(item, file1[item], deepLVL, '-', isSetSign))
        }
        if (file2[item] !== undefined && file1[item] === undefined) {
            result.push(getTextForPush(item, file2[item], deepLVL, '+', isSetSign))
        }
        if (file1[item] === file2[item]) {
            result.push(getTextForPush(item, file1[item], deepLVL, ' ', isSetSign))
        }
        if (file1[item] !== undefined && file2[item] !== undefined && file1[item] !== file2[item]) {
            result.push(getTextForPush(item, file1[item], deepLVL, '-', isSetSign))
            result.push(getTextForPush(item, file2[item], deepLVL, '+', isSetSign))
        }

        }
    }
    const text = `{\n${result.join('\n')}\n${' '.repeat(deepLVL * 4)}}`;
    return text;
}

const genDiff = (filepath1, filepath2) => {
    const file1 = parser(filepath1);
    const file2 = parser(filepath2);

    return logicFunc(file1, file2)
}

console.log(genDiff('../__fixtures__/file5.json', '../__fixtures__/file6.json'))

export default genDiff;
