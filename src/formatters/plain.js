import _ from 'lodash';
import generateDiffTree from './diffTree.js';

const makePlain = (node, parent = '') => {
  const {
    name, value, oldValue, status,
  } = node;

  const getPath = (key) => (parent ? `${parent}.${key}` : key);
  const checkType = (file) => {
    if (typeof file === 'string') {
      return `'${file}'`;
    }
    if (_.isObject(file)) {
      return '[complex value]';
    }
    return file;
  };

  if (status === 'deeped') {
    return value.map((item) => makePlain(item, getPath(name))).join('\n');
  }
  if (status === 'added') {
    return `Property '${getPath(name)}' was added with value: ${checkType(value)}`;
  }
  if (status === 'deleted') {
    return `Property '${getPath(name)}' was removed`;
  }
  if (status === 'unchanged') {
    return '';
  }
  if (status === 'updated') {
    return `Property '${getPath(name)}' was updated. From ${checkType(oldValue)} to ${checkType(value)}`;
  }

  return '';
};

const plain = (file1, file2) => {
  const diffTree = generateDiffTree(file1, file2);
  const diffPlain = diffTree.map((item) => makePlain(item));
  return diffPlain.join('\n').replace(/^\s*[\r\n]/gm, '').trim();
};

export default plain;
