import {test} from "../../fixtures/globalEachHookFixture";

/*We are running truly global hooks which are implemented using fixture */
/*P.N: beforeAll & afterAll are global hooks for a test file (scoped), so we are doing CUSTOM implementation of truly global hooks which execute with each test of a given test suite*/

test('first test', async () => {   //notice we are NOT dependent on Page object to execute our hooks code 
    console.log('first test executed');
});

test('second test', async () => {    
    console.log('second test executed');
})