import {camelCase, toUpper} from 'lodash';

export const pascalCase = (str: string): string =>
  camelCase(str).replace(/^(.)/, toUpper);
