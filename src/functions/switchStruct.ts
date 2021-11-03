import { CheckFunction, Rule } from "~/checker";
import CheckerChunk from "~/checkerChunk";
import CheckerRecord from "~/record";

export function switchStructChecker<T, U extends string>(
  switchFn: (value: T) => U,
  rules: { [K in U]: Rule<T> }
): CheckFunction<T> {
  return (value) => {
    const ruleKey = switchFn(value);
    if (ruleKey in rules) {
      const record = new CheckerRecord();
      new CheckerChunk(rules[ruleKey], value, record);
      return record;
    } else return "Is not a valid value";
  };
}
