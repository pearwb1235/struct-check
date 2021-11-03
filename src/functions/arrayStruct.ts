import { CheckFunction, Rule } from "~/checker";
import CheckerChunk from "~/checkerChunk";
import CheckerRecord from "~/record";
import { Enumerable } from "~/type";

export function arrayStructChecker<T>(
  rules: Enumerable<Rule<T>>,
  require = false
): CheckFunction<T[]> {
  return (value) => {
    if (!Array.isArray(value)) return !require;
    const record = new CheckerRecord();
    for (const index of record.node(value)) {
      new CheckerChunk(rules, value[index], record, { has: true });
    }
    return record;
  };
}
