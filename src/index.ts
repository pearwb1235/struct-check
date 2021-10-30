import Checker, { Rules } from "./checker";

export default function checkStruct<T extends Record<string, unknown>>(
  obj: unknown,
  checkRule: Rules<T>
): Record<string, string> {
  const checker = new Checker(checkRule, obj as T);
  return checker.record.get();
}

export * from "./functions";
export { default as Checker } from "./checker";
export { default as CheckerChunk } from "./checkerChunk";
export { default as CheckerRecord } from "./record";
