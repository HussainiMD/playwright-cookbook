/*THIS IS NOT A PLAYWRIGHT TEST FILE. It is a typscript file */
/*Transpile TS to JS code: npx tsc readCSVFile-library.ts */
/*Run JS code on NODE: node readCSVFile-library.js*/

/*we need to install this library 'csv-parse' in our project first */
/*we also use fs and path modules as well */
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

const records = parse(fs.readFileSync(path.join(__dirname, '../../data/test.csv')), {
  columns: true,
  skip_empty_lines: true,
  relax_column_count: true
});

for (const record of records) {
  console.log(record);
}
