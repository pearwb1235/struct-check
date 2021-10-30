import { CheckFunction, Rule } from "../checker";
import { Enumerable, Type } from "../type";

export function typeChecker(
  require: boolean,
  ...types: Type[]
): CheckFunction<unknown>;

export function typeStructChecker<T>(
  require: boolean,
  typeWithRule: Record<Type, Enumerable<Rule<T>>>
): CheckFunction<T>;
