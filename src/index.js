import path from 'path';
import parser from './parser.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const ext1 = path.parse(filepath1).ext;
  const ext2 = path.parse(filepath2).ext;
  const file1 = parser(ext1, filepath1);
  const file2 = parser(ext2, filepath2);
  return formatter(file1, file2, formatName);
};
export default genDiff;
