import generateDiffTree from './diffTree.js';

const genJson = (file1, file2) => {
  const diffTree = generateDiffTree(file1, file2);
  return JSON.stringify(diffTree);
};

export default genJson;
