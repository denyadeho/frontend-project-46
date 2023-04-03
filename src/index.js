import parser from '../parsers/parser.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  return format(file1, file2, formatName);
};
export default genDiff;
