import { CheckFunction, Rule } from "~/checker";
export declare function switchStructChecker<T, U extends string>(switchFn: (value: T) => U, rules: {
    [K in U]: Rule<T>;
}): CheckFunction<T>;
