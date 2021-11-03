import Checker, { Rule } from "./checker";
import CheckerRecord from "./record";
import { Enumerable } from "./type";

export default class CheckerChunk<T> {
  record: CheckerRecord;
  success: boolean;
  meta: Record<string, unknown>;
  constructor(
    rules: Enumerable<Rule<T>>,
    value: T,
    record: CheckerRecord,
    meta: Record<string, unknown> = {}
  ) {
    this.record = record;
    this.success = true;
    this.meta = meta;
    if (Array.isArray(rules)) {
      for (const rule of rules) {
        if (!this.check(value, rule)) {
          this.success = false;
          break;
        }
      }
    } else if (!this.check(value, rules)) this.success = false;
  }
  private check(value: T, rule: Rule<T>) {
    switch (typeof rule) {
      case "object":
        if (rule === null) break;
        if (typeof value !== "object" || Array.isArray(value))
          return this.record.add("Must to be an object");
        return new Checker(rule, value as Record<string, unknown>, this.record)
          .success;
      case "function":
        const result = rule(value, this.meta);
        if (result instanceof CheckerRecord) {
          const record = result.get();
          for (const key in record) this.record.add(record[key], key);
          return Object.keys(record).length === 0;
        } else if (typeof result === "string") {
          if (result.length > 0) return this.record.add(result);
        } else if (!result)
          return this.record.add("Checker function match failed.");
        return true;
      default:
        break;
    }
    throw new Error("The argument `rule` is not valid.");
  }
}
