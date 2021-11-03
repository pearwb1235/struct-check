import { CheckFunction, Rule } from "~/checker";
import CheckerChunk from "~/checkerChunk";
import CheckerRecord from "~/record";
import { Enumerable, Type } from "~/type";

export function typeChecker(
  require: boolean,
  ...types: Type[]
): CheckFunction<unknown> {
  return (value, meta) => {
    if (
      require === false &&
      (!meta.has || value === null || value === undefined)
    )
      return "";
    if (!meta.has) return "Require.";
    if (!Array.isArray(types) || types.length === 0) return true;
    for (const type of types) {
      switch (type) {
        case "array":
          if (Array.isArray(value)) return true;
          break;
        default:
          if (typeof value === type) return true;
          break;
      }
    }
    return `Must to be a/an ${types.join(", ")} type.`;
  };
}

export function typeStructChecker<T>(
  require: boolean,
  typeWithRule: Record<Type, Enumerable<Rule<T>>>
): CheckFunction<T> {
  const typeCheck = typeChecker(
    require,
    ...(Object.keys(typeWithRule) as Type[])
  );
  return (value, meta) => {
    const result = typeCheck(value, meta);
    if (
      (typeof result === "string" && result.length > 0) ||
      (typeof result !== "string" && !result)
    )
      return result;
    const record = new CheckerRecord();
    const rules = typeWithRule[typeof value];
    new CheckerChunk(rules, value, record, { has: true });
    return record;
  };
}
