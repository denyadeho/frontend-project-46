import plain from './plain.js';
import stylish from './stylish.js';
import generateDiffTree from '../diffTree.js';

const formatter = (file1, file2, form) => {
  const diffTree = generateDiffTree(file1, file2);
  if (form === 'plain') {
    return plain(diffTree);
  }
  if (form === 'json') {
    return JSON.stringify(diffTree);
  }
  return stylish(diffTree);
};
export default formatter;
