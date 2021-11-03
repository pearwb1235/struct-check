import { CheckFunction, Rule } from "~/checker";
import CheckerChunk from "~/checkerChunk";
import CheckerRecord from "~/record";
import { Enumerable } from "~/type";

export function switchStructChecker<T, U extends string>(
  switchFn: (value: T) => U,
  rules: { [K in U]: Enumerable<Rule<T>> }
): CheckFunction<T> {
  return (value) => {
    const ruleKey = switchFn(value);
    if (ruleKey in rules) {
      const record = new CheckerRecord();
      new CheckerChunk(rules[ruleKey], value, record, { has: true });
      return record;
    } else return "Is not a valid value";
  };
}
