import CheckerRecord from "./record";
import { Enumerable } from "./type";
export declare type Rule<V> = Rules<V> | CheckFunction<V>;
export declare type Rules<T> = T extends Record<string, unknown> ? {
    [K in keyof T]?: Enumerable<Rule<T[K]>>;
} : never;
export interface CheckFunction<V> {
    (value: V, meta: Record<string, unknown>): CheckerRecord | string | boolean;
}
export default class Checker<T extends Record<string, unknown>> {
    success: boolean;
    record: CheckerRecord;
    constructor(checkRule: Rules<T>, obj: T, record?: CheckerRecord);
    private addRecord;
    private check;
}
//# sourceMappingURL=checker.d.ts.map