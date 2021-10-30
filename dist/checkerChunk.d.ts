import { Rule } from "./checker";
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
    meta?: Record<string, unknown>
  );
  private check;
}
//# sourceMappingURL=checkerChunk.d.ts.map
