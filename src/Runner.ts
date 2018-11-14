import { Container, ITestResult } from "./Container";

import * as fs from "fs";
import * as symbols from "log-symbols";
import * as path from "path";

export class Runner {
    public async Run(scanningDirectory: string) {
        const files = this.GetFiles(path.join(process.cwd(), scanningDirectory));
        for (const file of files) {
            await import(file);
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

    private GetFiles(directory: string): string[] {
        let files: string[] = [];
        for (const file of fs.readdirSync(directory)) {
            const filePath = path.join(directory, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                let x = this.GetFiles(filePath);
                files = files.concat(x);
            } else {
                if (filePath.endsWith('.ts')) {
                    files.push(filePath);
                }
            }
        }

        return files;
    }

    private GetMethodName(testResult: ITestResult): string {
        let methodName: string = `  ${testResult.Passed ? symbols.success : symbols.error} ${testResult.Method}`;

        if (testResult.Arguments.length > 0) {
            methodName = `${methodName}(${testResult.Arguments.join(", ")})`;
        }

        return methodName;
    }
}
