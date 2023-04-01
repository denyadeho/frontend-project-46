#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from "../src/index.js";
const program = new Command();

program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format')

    .action((filepath1, filepath2, options) => {
        console.log(genDiff(filepath1, filepath2, options.format));
    });
program.parse();
