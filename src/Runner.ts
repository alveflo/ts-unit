import { Container, TestResult } from './Container';

import * as fs from 'fs';
import * as path from 'path';
import * as colors from 'colors';
import * as symbols from 'log-symbols';

export class Runner {
    private GetMethodName(testResult: TestResult): string {
        let methodName : string = `  ${testResult.Passed ? symbols.success : symbols.error} ${testResult.Method}`;

        if (testResult.Arguments.length > 0) {
            methodName = `${methodName}(${testResult.Arguments.join(', ')})`
        }

        return methodName;
    }

    public async Run(scanningDirectory: string) {
        let files = fs.readdirSync(path.join(process.cwd(), scanningDirectory));
        for (let file of files) {
            await import(path.join(process.cwd(), scanningDirectory, file));
        }

        let results = Container.GetResults();

        for (let result of results) {
            console.log(result.Class);
            for (let testResult of result.TestResults) {
                console.log(this.GetMethodName(testResult));

                if (testResult.Passed) {
                    continue;
                }

                console.log(`\t${testResult.Error}`);
            }
        }
    }
}