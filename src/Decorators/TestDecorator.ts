import { Run } from "./Decorator.common";

export function Test(target: any, key: string) {
    if (target.hasOwnProperty(key)) {
        Run(target.constructor.name, key, target[key], []);
    }
}
