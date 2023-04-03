import jsYaml from 'js-yaml';
import fs from 'node:fs';

const parserYaml = (filepath) => jsYaml.load(fs.readFileSync(filepath, 'utf8'));

export default parserYaml;
