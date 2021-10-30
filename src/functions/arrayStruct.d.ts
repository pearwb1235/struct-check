import { CheckFunction, Rule } from "../checker";
import { Enumerable } from "../type";

export function arrayStructChecker<T>(
  rules: Enumerable<Rule<T>>,
  require?: boolean
): CheckFunction<T[]>;
