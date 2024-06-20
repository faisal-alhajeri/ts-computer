import { VMCodeGenerator } from ".";
import { VM_INTRUCTION_TYPE, VM_SEGMENT } from "../../types";

const FILENAME = "someFile";
describe("vm code-gen", () => {
  const gen = new VMCodeGenerator({ filename: FILENAME });
  test("generates push correctly", () => {
    // local
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.LOCAL,
        index: "11",
      })
    ).toEqual([
      `@11`,
      `D = A`,
      `@LCL`,
      `A = M + D`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M + 1`,
    ]);

    // arg
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.ARG,
        index: "11",
      })
    ).toEqual([
      `@11`,
      `D = A`,
      `@ARG`,
      `A = M + D`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M + 1`,
    ]);

    // THIS
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.THIS,
        index: "11",
      })
    ).toEqual([
      `@11`,
      `D = A`,
      `@THIS`,
      `A = M + D`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M + 1`,
    ]);

    // THAT
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.THAT,
        index: "11",
      })
    ).toEqual([
      `@11`,
      `D = A`,
      `@THAT`,
      `A = M + D`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M + 1`,
    ]);

    // pointer 0
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.POINTER,
        index: "0",
      })
    ).toEqual([`@THIS`, `D = M`, `@SP`, `A = M`, `M = D`, `@SP`, `M = M + 1`]);

    // pointer 1
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.POINTER,
        index: "1",
      })
    ).toEqual([`@THAT`, `D = M`, `@SP`, `A = M`, `M = D`, `@SP`, `M = M + 1`]);

    // pointer error
    let pointerError = undefined;
    try {
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.POINTER,
        index: "2",
      });
    } catch (error) {
      pointerError = error;
    } finally {
      expect(pointerError).toBeDefined();
    }

    // constant 123
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.CONSTANT,
        index: "123",
      })
    ).toEqual([`@123`, `D = A`, `@SP`, `A = M`, `M = D`, `@SP`, `M = M + 1`]);

    // temp
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.TEMP,
        index: "4",
      })
    ).toEqual([`@9`, `D = M`, `@SP`, `A = M`, `M = D`, `@SP`, `M = M + 1`]);

    // pointer error
    let tempError = undefined;
    try {
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.TEMP,
        index: "9",
      });
    } catch (error) {
      tempError = error;
    } finally {
      expect(pointerError).toBeDefined();
    }

    // static
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.STATIC,
        index: "33",
      })
    ).toEqual([
      `@${FILENAME}.${33}`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M + 1`,
    ]);
  });
});
