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

export class Container {
    public static GetResults(): ITestClassResult[] {
        return this.Results;
    }

    public static AddResult(className: string, testResult: ITestResult): void {
        for (const result of this.Results) {
            if (result.Class === className) {
                result.TestResults.push(testResult);
            }
        }

        this.Results.push({ Class: className, TestResults: [testResult] });
    }

    private static Results: ITestClassResult[] = [];
}
