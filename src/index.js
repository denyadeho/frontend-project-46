import path from 'path';
import fs from 'node:fs';
import parser from './parser.js';
import formatter from './formatters/index.js';

const genDiff = (data1, data2, formatName = 'stylish') => {
  const readedData1 = fs.readFileSync(data1, 'utf-8');
  const readedData2 = fs.readFileSync(data2, 'utf-8');
  const ext1 = path.parse(data1).ext.slice(1);
  const ext2 = path.parse(data2).ext.slice(1);
  const parsedData1 = parser(ext1, readedData1);
  const parsedData2 = parser(ext2, readedData2);
  return formatter(parsedData1, parsedData2, formatName);
};
export default genDiff;
