import { Container } from "../Container";

export function Run(className: string, testName: string, func: any, args: any[]) {
    const container = Container.GetInstance();
    let passed = false;
    let error: any;

    try {
        func(...args);
        passed = true;
    } catch (exception) {
        error = exception.message || exception;
    } finally {
        container.AddResult(className, {
            Arguments: args,
            Error: error,
            Method: testName,
            Passed: passed,
        });
    }
}
