import genDiff from "../src/index.js";
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))

const expected = ('{\n' +
    '- follow: false\n' +
    '  host: hexlet.io\n' +
    '- proxy: 123.234.53.22\n' +
    '- timeout: 50\n' +
    '+ timeout: 20\n' +
    '+ verbose: true\n' + '}\n').trim()
test('genDiff', () => {
    expect(actual).toEqual(expected)
});
