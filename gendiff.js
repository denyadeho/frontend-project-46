#!/usr/bin/env node
import fs from 'node:fs';
import path from 'path';
import _ from "lodash";
import { program } from 'commander';

const command = () => {
    console.log('Hello, World!');
};
const file1 = fs.readFileSync('file1.json', 'utf-8');
const JSONfile1 = JSON.parse(file1);
const file2 = fs.readFileSync('file2.json', 'utf-8');
const JSONfile2 = JSON.parse(file2);
console.log(Object.entries(JSONfile1))
console.log(Object.entries(JSONfile2))
const result = [];
Object.entries(JSONfile1).forEach(([key1, value1]) => {
    const a = Object.entries(JSONfile2).map(([key2, value2], index) => {
        if (key1 === key2) {
            if (value1 === value2) {
                return `  ${key1}: ${value1}`
            } else {
                return `+ ${key2}: ${value2}`
            }
        }
        if (index === Object.entries(JSONfile2).length - 1) {
            return `- ${key1}: ${value1}`
        }
        if (!JSONfile1.hasOwnProperty(key2)) {
            return `+ ${key2}: ${value2}`
        }
    })
    result.push(a);
});
const arr = result.flat();
const uniqArr = _.uniq(arr);
console.log(uniqArr);


program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>' , 'output format')
    .action(command)
    .parse(process.argv);
