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
    public static GetInstance(): Container {
        if (Container.instance == null) {
            Container.instance = new Container();
        }

        return Container.instance;
    }

    private static instance: Container;
    private Results: ITestClassResult[] = [];

    private constructor() {

    }

    public GetResults(): ITestClassResult[] {
        console.log("Getting result, results:", this.Results);
        return this.Results;
    }

    public AddResult(className: string, testResult: ITestResult): void {
        console.log("Adding result", className, testResult);
        for (const result of this.Results) {
            if (result.Class === className) {
                result.TestResults.push(testResult);
            }
        }

        this.Results.push({ Class: className, TestResults: [testResult] });
    }
}
