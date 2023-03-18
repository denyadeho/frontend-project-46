#!/usr/bin/env node
import fs from 'node:fs';
import path from 'path';
import _ from "lodash";
import { program } from 'commander';

const command = () => {
    console.log('Hello, World!');
};
const gendiff = (filepath1, filepath2) => {

    const file1 = fs.readFileSync(filepath1, 'utf-8');
    const JSONfile1 = JSON.parse(file1);
    const file2 = fs.readFileSync(filepath2, 'utf-8');
    const JSONfile2 = JSON.parse(file2);

    const result = [];

    const allKeys = _.uniq([...Object.keys(JSONfile1), ...Object.keys(JSONfile2)].sort());

    for (const item of allKeys) {
        if (JSONfile1[item] !== undefined && JSONfile2[item] === undefined) {
            result.push(`- ${item}: ${JSONfile1[item]}`)
        }
        if (JSONfile2[item] !== undefined && JSONfile1[item] === undefined) {
            result.push(`+ ${item}: ${JSONfile2[item]}`)
        }
        if (JSONfile1[item] === JSONfile2[item]) {
            result.push(`  ${item}: ${JSONfile1[item]}`)
        }
        if (JSONfile1[item] !== undefined && JSONfile2[item] !== undefined && JSONfile1[item] !== JSONfile2[item]) {
            result.push(`- ${item}: ${JSONfile1[item]}`);
            result.push(`+ ${item}: ${JSONfile2[item]}`)
        }
    }

    const text = `{\n${result.join('\n')}\n}`;
    return text;
}

console.log(gendiff('file1.json', 'file2.json'))

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>' , 'output format')
    .action(command)
    .parse(process.argv);
