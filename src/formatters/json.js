/** @format */

import _ from 'lodash';

const funcJSON = (file1, file2) => {
  const allKeys = _.uniq([...Object.keys(file1), ...Object.keys(file2)].sort());

  const objForJSON = allKeys.map((key) => {
    if (file1[key] !== undefined && file2[key] === undefined) {
      return { name: key, value: file1[key] };
    }
    if (file1[key] === undefined && file2[key] !== undefined) {
      return { name: key, value: file2[key] };
    }
    if (file1[key] === file2[key]) {
      return { name: key, value: file1[key] };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { name: key, value: funcJSON(file1[key], file2[key]) };
    }
    return {
      name: key,
      oldValue: file1[key],
      value: file2[key],
    };
  });
  return objForJSON;
};
export default funcJSON;
