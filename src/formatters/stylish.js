/** @format */

import _ from 'lodash';

const funcStylish = (file1, file2, deepLVL = 1, isSetSign = true) => {
  const getTextForPush = (key, value, sign, deepLVL1 = 1, isSetSign1 = true) => `${' '.repeat(deepLVL1 * 4 - 2)}${isSetSign1 ? sign : ' '} ${key}: ${value}`;
  const result = [];

  const allKeys = _.uniq([...Object.keys(file1), ...Object.keys(file2)].sort());
  /* eslint-disable-next-line */
  for (const item of allKeys) {
    if (_.isObject(file1[item]) || _.isObject(file2[item])) {
      if (_.isObject(file1[item]) && _.isObject(file2[item])) {
        const deepResult = funcStylish(file1[item], file2[item], deepLVL + 1);
        result.push(getTextForPush(item, deepResult, ' ', deepLVL));
      }
      if (_.isObject(file1[item]) && !_.isObject(file2[item])) {
        const deepResult = funcStylish(file1[item], {}, deepLVL + 1, false);
        result.push(getTextForPush(item, deepResult, '-', deepLVL, isSetSign));
        if (file2[item] !== undefined) {
          result.push(getTextForPush(item, file2[item], '+', deepLVL));
        }
      }
      if (!_.isObject(file1[item]) && _.isObject(file2[item])) {
        const deepResult = funcStylish({}, file2[item], deepLVL + 1, false);
        if (file1[item] !== undefined) {
          result.push(getTextForPush(item, file1[item], '-', deepLVL));
        }
        result.push(getTextForPush(item, deepResult, '+', deepLVL, isSetSign));
      }
    } else {
      if (file1[item] !== undefined && file2[item] === undefined) {
        result.push(getTextForPush(item, file1[item], '-', deepLVL, isSetSign));
      }
      if (file2[item] !== undefined && file1[item] === undefined) {
        result.push(getTextForPush(item, file2[item], '+', deepLVL, isSetSign));
      }
      if (file1[item] === file2[item]) {
        result.push(getTextForPush(item, file1[item], ' ', deepLVL, isSetSign));
      }
      if (file1[item] !== undefined && file2[item] !== undefined && file1[item] !== file2[item]) {
        result.push(getTextForPush(item, file1[item], '-', deepLVL, isSetSign));
        result.push(getTextForPush(item, file2[item], '+', deepLVL, isSetSign));
      }
    }
  }
  const text = `{\n${result.join('\n')}\n${' '.repeat(deepLVL * 4 - 4)}}`;
  return text;
};

export default funcStylish;
