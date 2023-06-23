import jsYaml from 'js-yaml';

const parser = (ext, file) => {
  switch (ext) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return jsYaml.load(file);
    default:
      throw new Error(`Incorrect extension ${ext}`);
  }
};
export default parser;
