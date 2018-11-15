import * as path from "path";
import * as jsonFile from "write-json-file";

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

    private static FileName: string = path.join(process.cwd(), "CargoTestResult.json");
    private static instance: Container;
    private Results: ITestClassResult[] = [];

    private constructor() {
    }

    public GetResults(): ITestClassResult[] {
        const content = require(Container.FileName);
        return content;
    }

    public async AddResult(className: string, testResult: ITestResult) {
        const results: ITestClassResult[] = require(Container.FileName);

        for (const result of results) {
            if (result.Class === className) {
                result.TestResults.push(testResult);
            }
        }

        results.push({ Class: className, TestResults: [testResult] });

        jsonFile.sync(Container.FileName, results);
    }
}
