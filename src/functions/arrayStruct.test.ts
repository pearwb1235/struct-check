import { describe, expect, it } from "@jest/globals";
import CheckerRecord from "~/record";
import { arrayStructChecker } from ".";

describe("arrayStructChecker", () => {
  const arrayChecker = arrayStructChecker((v) =>
    typeof v === "string" ? v : "Tester"
  );
  it("normal", () => {
    expect(arrayChecker(undefined, {})).toEqual(true);
    expect(arrayChecker(null, {})).toEqual(true);
    expect(arrayChecker({} as unknown as [], {})).toEqual(true);
    expect(arrayChecker(0 as unknown as [], {})).toEqual(true);
    expect(arrayChecker("string" as unknown as [], {})).toEqual(true);
    expect(arrayChecker(false as unknown as [], {})).toEqual(true);
    // empty array
    expect(arrayChecker([], {})).toBeInstanceOf(CheckerRecord);
    expect(
      Object.keys((arrayChecker([], {}) as CheckerRecord).get()).length
    ).toEqual(0);
    // non-string array
    expect(
      arrayChecker([undefined, null, {}, 0, "string", false], {})
    ).toBeInstanceOf(CheckerRecord);
    expect(
      Object.keys(
        (
          arrayChecker(
            [undefined, null, {}, 0, "string", false],
            {}
          ) as CheckerRecord
        ).get()
      ).length
    ).toEqual(6);
    for (let i = 0; i < 5; i++) {
      expect(
        (
          arrayChecker(
            [undefined, null, {}, 0, "string", false],
            {}
          ) as CheckerRecord
        ).get()[i]
      ).toEqual(i === 4 ? "string" : "Tester");
    }
    // string array
    expect(arrayChecker(["A", "B", "C"], {})).toBeInstanceOf(CheckerRecord);
    expect(
      Object.keys((arrayChecker(["A", "B", "C"], {}) as CheckerRecord).get())
        .length
    ).toEqual(3);
    for (let i = 0; i < 2; i++) {
      expect(
        (arrayChecker(["A", "B", "C"], {}) as CheckerRecord).get()[i]
      ).toEqual(i === 0 ? "A" : i === 1 ? "B" : "C");
    }
  });
});
