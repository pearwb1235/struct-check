import { describe, expect, it } from "@jest/globals";
import CheckerRecord from "~/record";
import { switchStructChecker } from ".";

describe("switchStructChecker", () => {
  const switchChecker = switchStructChecker(
    (v) => (typeof v === "string" ? v : "unknown"),
    {
      A: () => "A",
      B: () => "B",
      C: () => true,
    }
  );
  it("normal", () => {
    expect(switchChecker(undefined, {})).toEqual("Is not a valid value");
    expect(switchChecker(null, {})).toEqual("Is not a valid value");
    expect(switchChecker(0, {})).toEqual("Is not a valid value");
    expect(switchChecker(false, {})).toEqual("Is not a valid value");
    expect(switchChecker({}, {})).toEqual("Is not a valid value");
    expect(switchChecker([], {})).toEqual("Is not a valid value");
    expect(
      switchChecker(function () {
        return;
      }, {})
    ).toEqual("Is not a valid value");
    expect(switchChecker("string", {})).toEqual("Is not a valid value");
    // A
    expect(switchChecker("A", {})).toBeInstanceOf(CheckerRecord);
    expect(
      Object.keys((switchChecker("A", {}) as CheckerRecord).get()).length
    ).toEqual(1);
    expect((switchChecker("A", {}) as CheckerRecord).get()[""]).toEqual("A");
    // B
    expect(switchChecker("B", {})).toBeInstanceOf(CheckerRecord);
    expect(
      Object.keys((switchChecker("B", {}) as CheckerRecord).get()).length
    ).toEqual(1);
    expect((switchChecker("B", {}) as CheckerRecord).get()[""]).toEqual("B");
    // C
    expect(switchChecker("C", {})).toBeInstanceOf(CheckerRecord);
    expect(
      Object.keys((switchChecker("C", {}) as CheckerRecord).get()).length
    ).toEqual(0);
  });
});
