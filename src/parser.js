import fs from 'node:fs';
import jsYaml from 'js-yaml';

const parserYaml = (filepath) => jsYaml.load(fs.readFileSync(filepath, 'utf8'));

const parserJSON = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));
const parser = (ext, filepath) => {
  switch (ext) {
    case '.json':
      return parserJSON(filepath);
    case '.yml':
    case '.yaml':
      return parserYaml(filepath);
    default:
      throw new Error(`Incorrect extension ${ext}`);
  }
};
export default parser;
