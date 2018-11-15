import { Container, ITestResult } from "./Container";

import * as fs from "fs";
import * as symbols from "log-symbols";
import * as path from "path";

export class Runner {
    public Run(scanningDirectory: string): boolean {
        if (!fs.existsSync(scanningDirectory)) {
            console.log(`No tests was found (no such directory ${scanningDirectory}).`);
            return true;
        }

        const files = this.GetFiles(path.join(process.cwd(), scanningDirectory));

        for (const file of files) {
            require(file);
        }

        const container = Container.GetInstance();
        const results = container.GetResults();

        let passed = true;
        for (const result of results) {
            console.log(result.Class);
            for (const testResult of result.TestResults) {
                console.log(this.GetMethodName(testResult));

                if (testResult.Passed) {
                    continue;
                }
                passed = false;
                console.log(`\t${testResult.Error}`);
            }
        }

        return passed;
    }

    private GetFiles(directory: string): string[] {
        let files: string[] = [];

        for (const file of fs.readdirSync(directory)) {
            const filePath = path.join(directory, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                const x = this.GetFiles(filePath);
                files = files.concat(x);
            } else {
                if (filePath.endsWith(".ts")) {
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
