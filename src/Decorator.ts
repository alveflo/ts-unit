import { Container } from './Container';
import 'reflect-metadata';

function Run(className: string, testName: string, func: any, args: any[]) {
    let passed = false;
    let error: any;

    try {
        func(...args);
        passed = true;
    } catch (exception) {
        error = exception.message || exception;
    } finally {
        Container.AddResult(className, {
            Method: testName,
            Arguments: args,
            Error: error,
            Passed: passed
        });
    }
}

export function Test(target: any, key: string) {
    if (target.hasOwnProperty(key)) {
        Run(target.constructor.name, key, target[key], []);
    }
}

export function TestCase(... args: any[]): (target: any, key: string) => void {
    return (target: any, key: string) => {
        if (target.hasOwnProperty("constructor")) {
            let obj = new target.constructor();
            let types = Reflect.getMetadata("design:paramtypes", obj, key);
    
            if (args.length != types.length) {
                throw "Too few arguments were provided.";
            }

            for (let i = 0; i < args.length; i++) {
                let givenType = typeof args[i];
                let expectedType = types[i].name.toLowerCase();

                if (givenType !== expectedType) {
                    throw `Data type mismatch at position ${i}. Test case argument '${args[i]}' of type ${givenType} is not assignable to type ${expectedType}`;
                }
            }

            Run(target.constructor.name, key, obj[key], args);
        }
    }
}
