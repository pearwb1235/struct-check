import CheckerChunk from "./checkerChunk";
import CheckerRecord from "./record";
import { Enumerable } from "./type";

export type Rule<V> = Rules<V> | CheckFunction<V>;

export type Rules<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]?: Enumerable<Rule<T[K]>>;
    }
  : never;

export interface CheckFunction<V> {
  (value: V, meta: Record<string, unknown>): CheckerRecord | string | boolean;
}

function arrayToObject<T = undefined>(
  list: string[],
  handler?: T
): {
  [key: string]: T extends (...args: unknown[]) => unknown ? ReturnType<T> : T;
} {
  const result = {};
  for (const key of list) {
    result[key] = typeof handler === "function" ? handler(key) : handler;
  }
  return result;
}

export default class Checker<T extends Record<string, unknown>> {
  success: boolean;
  record: CheckerRecord;
  constructor(checkRule: Rules<T>, obj: T, record?: CheckerRecord) {
    this.success = true;
    this.record = record ?? new CheckerRecord();
    this.check(checkRule, obj);
  }
  private addRecord(message: string): boolean {
    this.success = false;
    return this.record.add(message);
  }
  private check<U extends Record<string, unknown>>(
    checkRule: Rules<U>,
    obj: U
  ): void {
    if (typeof obj !== "object") {
      if (typeof checkRule === "undefined") return;
      if (typeof checkRule === "object" && Object.keys(checkRule).length === 0)
        return;
      this.addRecord("Not object.");
      return;
    } else if (Array.isArray(obj)) {
      this.addRecord("Not object.");
      return;
    }
    if (typeof checkRule !== "object")
      throw new Error("The argument `checkRule` must to be an object.");
    const objKeys = arrayToObject(Object.keys(obj));
    for (const key of this.record.node(checkRule)) {
      delete objKeys[key];
      if (
        !new CheckerChunk(checkRule[key], obj[key], this.record, {
          has: key in obj,
        }).success
      )
        this.success = false;
    }
    for (const {} of this.record.node(objKeys)) {
      this.record.add("Redundant.");
    }
  }
}
