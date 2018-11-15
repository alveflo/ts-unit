import { Container } from "../Container";

export function Run(className: string, testName: string, func: any, args: any[]) {
    const container = Container.GetInstance();
    let passed = false;
    let error: any;

    try {
        console.log("Running", className, testName);
        func(...args);
        passed = true;
    } catch (exception) {
        console.log("Exception was thrown:", exception.message);
        error = exception.message || exception;
    } finally {
        console.log("Trying to add result");
        container.AddResult(className, {
            Arguments: args,
            Error: error,
            Method: testName,
            Passed: passed,
        });
        console.log("Added result");
    }
}
