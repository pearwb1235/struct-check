import { Rules } from "./checker";
export default function checkStruct<T extends Record<string, unknown>>(obj: unknown, checkRule: Rules<T>): Record<string, string>;
export * from "./functions";
export { default as Checker } from "./checker";
export { default as CheckerChunk } from "./checkerChunk";
export { default as CheckerRecord } from "./record";
