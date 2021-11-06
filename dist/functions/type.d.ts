import { CheckFunction, Rule } from "../checker";
import { Enumerable, Type } from "../type";
export declare function typeChecker(require: boolean, ...types: Type[]): CheckFunction<unknown>;
export declare function typeStructChecker<T>(require: boolean, typeWithRule: Partial<Record<Type, Enumerable<Rule<T>>>>): CheckFunction<T>;
