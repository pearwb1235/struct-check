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
