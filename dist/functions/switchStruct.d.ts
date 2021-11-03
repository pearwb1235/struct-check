import { CheckFunction, Rule } from "~/checker";
import { Enumerable } from "~/type";
export declare function switchStructChecker<T, U extends string>(switchFn: (value: T) => U, rules: {
    [K in U]: Enumerable<Rule<T>>;
}): CheckFunction<T>;
