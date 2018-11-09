export interface TestClassResult {
    Class: string;
    TestResults: TestResult[];
}

export interface TestResult {
    Method: string;
    Arguments: string[];
    Passed: boolean;
    Error: string;
}

export namespace Container {
    let Results: TestClassResult[] = [];

    export function GetResults(): TestClassResult[] {
        return Results;
    }

    export function AddResult(className: string, result: TestResult): void {
        for (let i = 0; i < Results.length; i++) {
            if (Results[i].Class === className) {
                Results[i].TestResults.push(result);
                return;
            }
        }

        Results.push({ Class: className, TestResults: [result] });
    }
}