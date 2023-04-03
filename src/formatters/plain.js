import _ from 'lodash';

const funcPlain = (file1, file2, parent = '') => {
  const checkType = (file) => {
    if (typeof file === 'string') {
      return `'${file}'`;
    }
    if (_.isObject(file)) {
      return '[complex value]';
    }
    return file;
  };
  const path = (parent1, item) => (parent1 ? `${parent1}.${item}` : item);

  const allKeys = _.sortBy(_.uniq([...Object.keys(file1), ...Object.keys(file2)]));
  /* eslint-disable-next-line */
  const result = allKeys.map((item) => {
    if (file1[item] !== undefined || file2[item] !== undefined) {
      if (_.isObject(file1[item]) && _.isObject(file2[item])) {
        const recursionAdd = funcPlain(file1[item], file2[item], path(parent, item));
        return recursionAdd;
      }
      if (file1[item] !== undefined && file2[item] === undefined) {
        return `Property '${path(parent, item)}' was removed`;
      }
      if (file2[item] !== undefined && file1[item] === undefined) {
        return `Property '${path(parent, item)}' was added with value: ${checkType(file2[item])}`;
      }

      if (file1[item] !== undefined && file2[item] !== undefined && file1[item] !== file2[item]) {
        return `Property '${path(parent, item)}' was updated. From ${checkType(file1[item])} to ${checkType(file2[item])}`;
      }
    }
  });
  const filteredArr = result.filter((item) => item !== undefined);
  const text = `${filteredArr.join('\n')}`;
  return text;
};
export default funcPlain;
