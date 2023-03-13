#!/usr/bin/env node

import { program } from 'commander';

const command = () => {
    console.log('Hello, World!');
};


program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>' , 'output format')
    .action(command)
    .parse(process.argv);
