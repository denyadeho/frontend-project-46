import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import stylish from '../__fixtures__/stylish.js';
import plain from '../__fixtures__/plain.js';
import json from '../__fixtures__/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

test('test1 - JsonStylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(stylish);
});
test('test2 - YamlStylish', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(stylish);
});
test('test3 - JsonPlain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(plain);
});
test('test4 - YamlPlain', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(plain);
});
test('test5 - CheckJson', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'), 'json')).toEqual(json);
});
