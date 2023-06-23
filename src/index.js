import path from 'path';
import fs from 'node:fs';
import parser from './parser.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const readedFile1 = fs.readFileSync(filepath1, 'utf-8');
  const readedFile2 = fs.readFileSync(filepath2, 'utf-8');
  const ext1 = path.parse(filepath1).ext.slice(1);
  const ext2 = path.parse(filepath2).ext.slice(1);
  const file1 = parser(ext1, readedFile1);
  const file2 = parser(ext2, readedFile2);
  return formatter(file1, file2, formatName);
};
export default genDiff;
