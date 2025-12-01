import {test, expect, Response, Locator} from "@playwright/test";

test.describe(() => {
    /*we are configuring retries to this entire test group */
    test.describe.configure({retries: 1});

    test('first: passing test', () => {
        const isPassing:boolean = true;
        expect(isPassing).toEqual(true);
    })

    test('second: failing test', () => {
        const isPassing:boolean = false;
        expect(isPassing).toEqual(true);//this will fail despite retry
    })

    test('third: passing test', () => {
        const isPassing:boolean = true;
        expect(isPassing).toEqual(true);
    })
})