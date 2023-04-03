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

  const result = [];
  const allKeys = _.sortBy(_.uniq([...Object.keys(file1), ...Object.keys(file2)]));
  /* eslint-disable-next-line */
  for (const item of allKeys) {
    if (_.isObject(file1[item]) && _.isObject(file2[item])) {
      const recursionAdd = funcPlain(file1[item], file2[item], path(parent, item));
      result.push(recursionAdd);
    } else {
      if (file1[item] !== undefined && file2[item] === undefined) {
        result.push(`Property '${path(parent, item)}' was removed`);
      }
      if (file2[item] !== undefined && file1[item] === undefined) {
        result.push(`Property '${path(parent, item)}' was added with value: ${checkType(file2[item])}`);
      }

      if (file1[item] !== undefined && file2[item] !== undefined && file1[item] !== file2[item]) {
        result.push(
          `Property '${path(parent, item)}' was updated. From ${checkType(file1[item])} to ${checkType(
            file2[item],
          )}`,
        );
      }
    }
  }
  const text = `\n${result.join('\n')}\n`;
  return text.trim();
};
export default funcPlain;
