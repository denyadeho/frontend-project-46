import path from 'path';
import parserJSON from './parserJSON.js';
import parserYaml from './parserYaml.js';

const parser = (filepath) => {
  switch (path.parse(filepath).ext) {
    case '.json':
      return parserJSON(filepath);
    case '.yml':
    case '.yaml':
      return parserYaml(filepath);
    default:
      throw new Error(`Incorrect extension ${path.parse(filepath).ext}`);
  }
};
export default parser;
