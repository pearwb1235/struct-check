export default class CheckerRecord {
  private records: Record<string, string>;
  private nodes: string[];
  constructor() {
    this.nodes = [];
    this.records = {};
  }
  *node(obj: unknown): Generator<string, void, void> {
    if (typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      for (const index in obj) {
        this.nodes.push(index);
        yield index;
        this.nodes.pop();
      }
    } else {
      for (const key in obj) {
        this.nodes.push(key);
        yield key;
        this.nodes.pop();
      }
    }
  }
  add(message: string, node?: string): boolean {
    if (typeof node === "string" && node.length > 0) {
      this.records[this.nodes.join(".") + "." + node] = message;
    } else {
      this.records[this.nodes.join(".")] = message;
    }
    return false;
  }
  get(): Record<string, string> {
    return this.records;
  }
}
