import { Run } from './Decorator.common';
import 'reflect-metadata';

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
