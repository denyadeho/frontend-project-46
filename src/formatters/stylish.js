import _ from 'lodash';

const funcStylish = (file1, file2, deepLVL = 1, isSetSign = true) => {
  const getTextForPush = (key, value, sign, deepLVL1 = 1, isSetSign1 = true) => `${' '.repeat(deepLVL1 * 4 - 2)}${isSetSign1 ? sign : ' '} ${key}: ${value}`;

  const allKeys = _.sortBy(_.uniq([...Object.keys(file1), ...Object.keys(file2)]));
  /* eslint-disable-next-line */
  const result = allKeys.flatMap((item) => {
    if (_.isObject(file1[item]) || _.isObject(file2[item])) {
      if (_.isObject(file1[item]) && _.isObject(file2[item])) {
        const deepResult = funcStylish(file1[item], file2[item], deepLVL + 1);
        return getTextForPush(item, deepResult, ' ', deepLVL);
      }
      if (_.isObject(file1[item]) && !_.isObject(file2[item])) {
        const deepResult = funcStylish(file1[item], {}, deepLVL + 1, false);
        if (file2[item] !== undefined) {
          return [getTextForPush(item, deepResult, '-', deepLVL, isSetSign), getTextForPush(item, file2[item], '+', deepLVL)];
        }
        return getTextForPush(item, deepResult, '-', deepLVL, isSetSign);
      }
      if (!_.isObject(file1[item]) && _.isObject(file2[item])) {
        const deepResult = funcStylish({}, file2[item], deepLVL + 1, false);
        if (file1[item] !== undefined) {
          return [getTextForPush(item, file1[item], '-', deepLVL), getTextForPush(item, deepResult, '+', deepLVL, isSetSign)];
        }
        return getTextForPush(item, deepResult, '+', deepLVL, isSetSign);
      }
    } else {
      if (file1[item] !== undefined && file2[item] === undefined) {
        return getTextForPush(item, file1[item], '-', deepLVL, isSetSign);
      }
      if (file2[item] !== undefined && file1[item] === undefined) {
        return getTextForPush(item, file2[item], '+', deepLVL, isSetSign);
      }
      if (file1[item] === file2[item]) {
        return getTextForPush(item, file1[item], ' ', deepLVL, isSetSign);
      }
      if (file1[item] !== undefined && file2[item] !== undefined && file1[item] !== file2[item]) {
        return [getTextForPush(item, file1[item], '-', deepLVL, isSetSign), getTextForPush(item, file2[item], '+', deepLVL, isSetSign)];
      }
    }
  })
  const text = `{\n${result.join('\n')}\n${' '.repeat(deepLVL * 4 - 4)}}`;
  return text;
};

export default funcStylish;
