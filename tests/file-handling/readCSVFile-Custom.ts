/*THIS IS NOT A PLAYWRIGHT TEST FILE. It is a typscript file */
/*Transpile TS to JS code: npx tsc readCSVFile-Custom.ts */
/*Run JS code on NODE: node readCSVFile-Custom.js*/

import * as fs from "fs";

interface csvRecord {
    name: string,
    age: number
}

//read file using "fs" filesystem mode on node js
const testCSVData: string = fs.readFileSync('../../data/test.csv', {encoding: 'utf-8'});

//filter empty rows
const rows: Array<string> = testCSVData.split('\n').filter((val) => val.trim().length > 0);


if(rows.length > 0) {
    const heading: Array<string> = rows[0].split(',').map(val => val.trim());    
    const csvRecordsample = {
        name: '',
        age: 0
    } satisfies csvRecord; //we needed this to check for keys. JS knows only objects, so we are creating dummy object to do key existing using IN operator
    
    if(!heading.every(val => val in csvRecordsample)) console.warn('invalid csv data as headers are different from expecteed');
    else {
        const entries: Array<csvRecord> = rows.splice(1).map(entry => {
            const cells: Array<string> = entry.split(',').map(val => val.trim());
            if(cells?.length == 2) {
                return {
                    name: cells[0],
                    age: parseInt(cells[1])
                }
            } else {
                return {
                    name: '',
                    age: -1
                }
            }
        });
        //log the valid entries on console for visual verification
        console.log(JSON.stringify(entries));
    }
}