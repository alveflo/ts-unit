import { Container, ITestResult } from "./Container";

import * as fs from "fs";
import * as symbols from "log-symbols";
import * as path from "path";

export class Runner {
    public async Run(scanningDirectory: string) {
        const files = fs.readdirSync(path.join(process.cwd(), scanningDirectory));
        for (const file of files) {
            await import(path.join(process.cwd(), scanningDirectory, file));
        }

        const results = Container.GetResults();

        for (const result of results) {
            console.log(result.Class);
            for (const testResult of result.TestResults) {
                console.log(this.GetMethodName(testResult));

                if (testResult.Passed) {
                    continue;
                }

                console.log(`\t${testResult.Error}`);
            }
        }
    }

    private GetMethodName(testResult: ITestResult): string {
        let methodName: string = `  ${testResult.Passed ? symbols.success : symbols.error} ${testResult.Method}`;

        if (testResult.Arguments.length > 0) {
            methodName = `${methodName}(${testResult.Arguments.join(", ")})`;
        }

        return methodName;
    }
}
