import _ from 'lodash';
import generateDiffTree from './diffTree.js';

const indentString = (depth) => ' '.repeat((depth * 4) - 2);

const formatValue = (value, depth) => {
  if (_.isObject(value)) {
    const indent = indentString(depth);
    const nestedIndent = indentString(depth + 1);
    const lines = Object.entries(value)
      .map(([key, val]) => `${nestedIndent}  ${key}: ${formatValue(val, depth + 1)}`);
    return `{\n${lines.join('\n')}\n${indent}  }`;
  }
  return value;
};

const makeStylish = (node, depth) => {
  const {
    name, value, oldValue, status,
  } = node;
  const indent = indentString(depth);

  if (status === 'deeped') {
    const nestedChanges = value.map((item) => makeStylish(item, depth + 1));
    const nestedChangesString = nestedChanges.join('\n');
    return `${indent}  ${name}: {\n${nestedChangesString}\n${indent}  }`;
  }
  if (status === 'added') {
    return `${indent}+ ${name}: ${formatValue(value, depth)}`;
  }
  if (status === 'deleted') {
    return `${indent}- ${name}: ${formatValue(value, depth)}`;
  }
  if (status === 'unchanged') {
    return `${indent}  ${name}: ${formatValue(value, depth)}`;
  }
  if (status === 'updated') {
    const oldValueString = `${indent}- ${name}: ${formatValue(oldValue, depth)}`;
    const newValueString = `${indent}+ ${name}: ${formatValue(value, depth)}`;
    return `${oldValueString}\n${newValueString}`;
  }
  return null;
};

const stylish = (file1, file2) => {
  const diffTree = generateDiffTree(file1, file2);
  const diffOutput = diffTree.map((item) => makeStylish(item, 1)).join('\n');
  return `{\n${diffOutput}\n}`;
};

export default stylish;
