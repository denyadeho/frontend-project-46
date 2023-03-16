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
console.log(JSONfile1);

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>' , 'output format')
    .action(command)
    .parse(process.argv);
