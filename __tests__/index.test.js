import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import stylish from '../__fixtures__/stylish.js';
import plain from '../__fixtures__/plain.js';
import json from '../__fixtures__/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

/* eslint-env jest */
const testCases = [
  ['JsonStylish', 'file1.json', 'file2.json', undefined, stylish],
  ['YamlStylish', 'file1.yml', 'file2.yml', undefined, stylish],
  ['JsonPlain', 'file1.json', 'file2.json', 'plain', plain],
  ['YamlPlain', 'file1.yml', 'file2.yml', 'plain', plain],
  ['CheckJson', 'file1.yml', 'file2.json', 'json', json],
];

test.each(testCases)('%s', (testName, file1, file2, format, expected) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), format)).toEqual(expected);
});
