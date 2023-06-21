import plain from './plain.js';
import stylish from './stylish.js';
import genJson from './json.js';

const format = (file1, file2, form) => {
  if (form === 'plain') {
    return plain(file1, file2);
  }
  if (form === 'json') {
    return genJson(file1, file2);
  }
  return stylish(file1, file2);
};
export default format;
