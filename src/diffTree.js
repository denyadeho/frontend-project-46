import _ from 'lodash';

const generateDiffTree = (file1, file2) => {
  const allKeys = _.sortBy(_.uniq([...Object.keys(file1), ...Object.keys(file2)]));

  const objForJSON = allKeys.map((key) => {
    if (file1[key] !== undefined && file2[key] === undefined) {
      return { name: key, value: file1[key], status: 'deleted' };
    }
    if (file1[key] === undefined && file2[key] !== undefined) {
      return { name: key, value: file2[key], status: 'added' };
    }
    if (file1[key] === file2[key]) {
      return { name: key, value: file1[key], status: 'unchanged' };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { name: key, value: generateDiffTree(file1[key], file2[key]), status: 'deeped' };
    }
    return {
      name: key,
      oldValue: file1[key],
      value: file2[key],
      status: 'changed',
    };
  });
  return objForJSON;
};
export default generateDiffTree;
