import { describe, expect, it } from "@jest/globals";
import { CheckerChunk, CheckerRecord } from ".";
import { Rule } from "./checker";

describe("rule", () => {
  it("function", () => {
    const orginValue = 123;
    let value;
    expect(
      new CheckerChunk<number>(
        (v) => (value = v) === orginValue,
        orginValue,
        new CheckerRecord()
      ).success
    ).toEqual(true);
    expect(value).toEqual(orginValue);
    expect(
      new CheckerChunk<number>(
        (v) => v === 456,
        orginValue,
        new CheckerRecord()
      ).success
    ).toEqual(false);
    expect(
      new CheckerChunk<number>(
        (v) => v === 456,
        orginValue,
        new CheckerRecord()
      ).record.get()[""]
    ).toEqual("Checker function match failed.");
    expect(
      new CheckerChunk<number>(
        () => undefined as unknown as boolean,
        orginValue,
        new CheckerRecord()
      ).success
    ).toEqual(false);
    expect(
      new CheckerChunk<number>(
        () => undefined as unknown as boolean,
        orginValue,
        new CheckerRecord()
      ).record.get()[""]
    ).toEqual("Checker function match failed.");
    expect(
      new CheckerChunk<number>(
        () => 0 as unknown as boolean,
        orginValue,
        new CheckerRecord()
      ).success
    ).toEqual(false);
    expect(
      new CheckerChunk<number>(
        () => 0 as unknown as boolean,
        orginValue,
        new CheckerRecord()
      ).record.get()[""]
    ).toEqual("Checker function match failed.");
    expect(
      new CheckerChunk<number>(
        () => "Tester",
        orginValue,
        new CheckerRecord()
      ).record.get()[""]
    ).toEqual("Tester");
    expect(
      new CheckerChunk<number>(
        () => {
          const checker = new CheckerRecord();
          for (let {} of checker.node({ test: undefined }))
            checker.add("Tester");
          return checker;
        },
        orginValue,
        new CheckerRecord()
      ).record.get()[".test"]
    ).toEqual("Tester");
  });
  it("object", () => {
    const orginValue = {
      test: 123,
    };
    let value;
    new CheckerChunk<{ test: number }>(
      {
        test: (v) => (value = v) === orginValue.test,
      },
      orginValue,
      new CheckerRecord()
    );
    expect(value).toEqual(orginValue.test);
    expect(
      new CheckerChunk<{ test: number }>(
        {
          test: (v) => v === orginValue.test,
        },
        { test: 456 },
        new CheckerRecord()
      ).success
    ).toEqual(false);
    expect(
      new CheckerChunk<{ test: number }>(
        {
          test: (v) => v === 456,
        },
        { test: 456 },
        new CheckerRecord()
      ).success
    ).toEqual(true);
    expect(
      new CheckerChunk<{ test: number }>(
        {
          test: (v) => typeof v === "number",
        },
        { test: "123" as unknown as number },
        new CheckerRecord()
      ).success
    ).toEqual(false);
    expect(
      new CheckerChunk<{ test: number }>(
        {
          test: (v) => typeof v === "string",
        },
        { test: "123" as unknown as number },
        new CheckerRecord()
      ).success
    ).toEqual(true);
  });
});

describe("meta", () => {
  it("constructor", () => {
    const input = {
      testA: 1,
      testB: 2,
      testC: 3,
    };
    let result;
    new CheckerChunk<undefined>(
      (_, m) => {
        result = m;
        return true;
      },
      undefined,
      new CheckerRecord(),
      input
    );
    expect(result).toEqual(input);
  });
  it("function add meta", () => {
    const inputA: Record<string, unknown> = {
      testA: 1,
      testB: 2,
      testC: 3,
    };
    let inputB;
    let result;
    const checker = new CheckerChunk<undefined>(
      [
        (_, m) => {
          inputB = m.testD = {
            subA: 1,
            subB: 1,
            subC: 1,
          };
          return true;
        },
        (_, m) => {
          result = m;
          return true;
        },
      ],
      undefined,
      new CheckerRecord(),
      inputA
    );
    expect(checker.meta).toEqual(inputA);
    expect(result.testD).toEqual(inputA.testD);
    expect(result.testD).toEqual(inputB);
  });
});

describe("throw", () => {
  it("rule is undefined", () => {
    expect(
      () =>
        new CheckerChunk<undefined>(undefined, undefined, new CheckerRecord())
    ).toThrowError(new Error("The argument `rule` is not valid."));
  });
  it("rule is boolean", () => {
    expect(
      () =>
        new CheckerChunk<undefined>(
          true as unknown as Rule<undefined>,
          undefined,
          new CheckerRecord()
        )
    ).toThrowError(new Error("The argument `rule` is not valid."));
    expect(
      () =>
        new CheckerChunk<undefined>(
          false as unknown as Rule<undefined>,
          undefined,
          new CheckerRecord()
        )
    ).toThrowError(new Error("The argument `rule` is not valid."));
  });
  it("rule is number", () => {
    expect(
      () =>
        new CheckerChunk<undefined>(
          1 as unknown as Rule<undefined>,
          undefined,
          new CheckerRecord()
        )
    ).toThrowError(new Error("The argument `rule` is not valid."));
    expect(
      () =>
        new CheckerChunk<undefined>(
          0 as unknown as Rule<undefined>,
          undefined,
          new CheckerRecord()
        )
    ).toThrowError(new Error("The argument `rule` is not valid."));
    expect(
      () =>
        new CheckerChunk<undefined>(
          -1 as unknown as Rule<undefined>,
          undefined,
          new CheckerRecord()
        )
    ).toThrowError(new Error("The argument `rule` is not valid."));
  });
  it("rule is string", () => {
    expect(
      () =>
        new CheckerChunk<undefined>(
          "string" as unknown as Rule<undefined>,
          undefined,
          new CheckerRecord()
        )
    ).toThrowError(new Error("The argument `rule` is not valid."));
    expect(
      () =>
        new CheckerChunk<undefined>(
          "" as unknown as Rule<undefined>,
          undefined,
          new CheckerRecord()
        )
    ).toThrowError(new Error("The argument `rule` is not valid."));
    expect(
      () =>
        new CheckerChunk<undefined>(
          "STRING" as unknown as Rule<undefined>,
          undefined,
          new CheckerRecord()
        )
    ).toThrowError(new Error("The argument `rule` is not valid."));
  });
  it("rule is null", () => {
    expect(
      () => new CheckerChunk<undefined>(null, undefined, new CheckerRecord())
    ).toThrowError(new Error("The argument `rule` is not valid."));
  });
});
