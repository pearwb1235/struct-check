export default class CheckerRecord {
  node(obj: unknown): Generator<string, void, void>;
  add(message: string, node?: string): boolean;
  get(): Record<string, string>;
}
