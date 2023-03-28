import genDiff from "../src/index.js";

const actual = genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
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
