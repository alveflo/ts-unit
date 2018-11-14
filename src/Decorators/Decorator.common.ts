import { Container } from "../Container";

export function Run(className: string, testName: string, func: any, args: any[]) {
    let passed = false;
    let error: any;

    try {
        func(...args);
        passed = true;
    } catch (exception) {
        error = exception.message || exception;
    } finally {
        Container.AddResult(className, {
            Arguments: args,
            Error: error,
            Method: testName,
            Passed: passed,
        });
    }
}