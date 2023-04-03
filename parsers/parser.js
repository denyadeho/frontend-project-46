import path from 'path';
import parserJSON from './parserJSON.js';
import parserYaml from './parserYaml.js';

const parser = (filepath) => {
  let file;
  switch (path.parse(filepath).ext) {
    case '.json':
      file = parserJSON(filepath);
      break;
    case '.yml':
    case '.yaml':
      file = parserYaml(filepath);
      break;
  }
  return file;
};
export default parser;
