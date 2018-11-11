export interface ITestClassResult {
    Class: string;
    TestResults: ITestResult[];
}

export interface ITestResult {
    Method: string;
    Arguments: string[];
    Passed: boolean;
    Error: string;
}

export namespace Container {
    const Results: ITestClassResult[] = [];

    export function GetResults(): ITestClassResult[] {
        return Results;
    }

    export function AddResult(className: string, testResult: ITestResult): void {
        for (const result of Results) {
            if (result.Class === className) {
                result.TestResults.push(testResult);
            }
        }

        Results.push({ Class: className, TestResults: [testResult] });
    }
}
