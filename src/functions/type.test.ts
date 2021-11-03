import { describe, expect, it } from "@jest/globals";
import CheckerRecord from "~/record";
import { arrayStructChecker, typeChecker, typeStructChecker } from ".";

describe("typeChecker", () => {
  const noRequireChecker = typeChecker(false, "array");
  const stringChecker = typeChecker(true, "string");
  it("normal", () => {
    expect(noRequireChecker(undefined, {})).toEqual(true);
    expect(noRequireChecker(undefined, { has: false })).toEqual(true);
    expect(noRequireChecker(undefined, { has: true })).toEqual(true);
    expect(noRequireChecker(null, { has: true })).toEqual(true);
    expect(noRequireChecker(0, { has: true })).toEqual(
      "Must to be a/an array type."
    );
    expect(stringChecker(undefined, {})).toEqual("Require.");
    expect(stringChecker(undefined, { has: false })).toEqual("Require.");
    expect(stringChecker(undefined, { has: true })).toEqual(
      "Must to be a/an string type."
    );
    expect(stringChecker("string", {})).toEqual("Require.");
    expect(stringChecker("string", { has: false })).toEqual("Require.");
    expect(stringChecker("string", { has: true })).toEqual(true);
  });
});

describe("typeStructChecker", () => {
  const noRequireChecker = typeStructChecker<unknown>(false, {
    number: () => "number",
    string: () => "string",
  });
  const stringArrayChecker = typeStructChecker<unknown>(true, {
    number: () => "number",
    string: () => "string",
  });
  it("normal", () => {
    expect(noRequireChecker(undefined, {})).toEqual(true);
    expect(noRequireChecker(undefined, { has: false })).toEqual(true);
    expect(noRequireChecker(undefined, { has: true })).toEqual(true);
    expect(noRequireChecker(null, { has: true })).toEqual(true);
    // string
    expect(noRequireChecker("string", { has: true })).toBeInstanceOf(
      CheckerRecord
    );
    expect(
      Object.keys(
        (noRequireChecker("string", { has: true }) as CheckerRecord).get()
      ).length
    ).toEqual(1);
    expect(
      (noRequireChecker("string", { has: true }) as CheckerRecord).get()[""]
    ).toEqual("string");
    // number
    expect(noRequireChecker(0, { has: true })).toBeInstanceOf(CheckerRecord);
    expect(
      Object.keys((noRequireChecker(0, { has: true }) as CheckerRecord).get())
        .length
    ).toEqual(1);
    expect(
      (noRequireChecker(0, { has: true }) as CheckerRecord).get()[""]
    ).toEqual("number");
    // other
    expect(noRequireChecker(false, { has: true })).toEqual(
      "Must to be a/an number, string type."
    );

    expect(stringArrayChecker(undefined, {})).toEqual("Require.");
    expect(stringArrayChecker(undefined, { has: false })).toEqual("Require.");
    expect(stringArrayChecker(undefined, { has: true })).toEqual(
      "Must to be a/an number, string type."
    );
    expect(stringArrayChecker(null, { has: true })).toEqual(
      "Must to be a/an number, string type."
    );
    // string
    expect(stringArrayChecker("string", { has: false })).toEqual("Require.");
    expect(noRequireChecker("string", { has: true })).toBeInstanceOf(
      CheckerRecord
    );
    expect(
      Object.keys(
        (noRequireChecker("string", { has: true }) as CheckerRecord).get()
      ).length
    ).toEqual(1);
    expect(
      (noRequireChecker("string", { has: true }) as CheckerRecord).get()[""]
    ).toEqual("string");
    // number
    expect(noRequireChecker(0, { has: true })).toBeInstanceOf(CheckerRecord);
    expect(
      Object.keys((noRequireChecker(0, { has: true }) as CheckerRecord).get())
        .length
    ).toEqual(1);
    expect(
      (noRequireChecker(0, { has: true }) as CheckerRecord).get()[""]
    ).toEqual("number");
    // other
    expect(stringArrayChecker(false, { has: true })).toEqual(
      "Must to be a/an number, string type."
    );
  });
});
