import { VMCodeGenerator } from ".";
import { VM_ARETHMATIC, VM_INTRUCTION_TYPE, VM_SEGMENT } from "../../types";

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
      `// push local 11`,
      `@11`,
      `D = A`,
      `@LCL`,
      `A = D+M`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    // arg
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.ARG,
        index: "11",
      })
    ).toEqual([
      `// push argument 11`,
      `@11`,
      `D = A`,
      `@ARG`,
      `A = D+M`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    // THIS
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.THIS,
        index: "11",
      })
    ).toEqual([
      `// push this 11`,
      `@11`,
      `D = A`,
      `@THIS`,
      `A = D+M`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    // THAT
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.THAT,
        index: "11",
      })
    ).toEqual([
      `// push that 11`,
      `@11`,
      `D = A`,
      `@THAT`,
      `A = D+M`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    // pointer 0
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.POINTER,
        index: "0",
      })
    ).toEqual([
      `// push pointer 0`,
      `@THIS`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    // pointer 1
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.POINTER,
        index: "1",
      })
    ).toEqual([
      `// push pointer 1`,
      `@THAT`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

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
    ).toEqual([
      `// push constant 123`,
      `@123`,
      `D = A`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    // temp
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.TEMP,
        index: "4",
      })
    ).toEqual([
      `// push temp 4`,
      `@9`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

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
      expect(tempError).toBeDefined();
    }

    // static
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.STATIC,
        index: "33",
      })
    ).toEqual([
      `// push static 33`,
      `@${FILENAME}.${33}`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
    ]);
  });

  test("generates pop correctly", () => {
    // local
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.LOCAL,
        index: "11",
      })
    ).toEqual([
      `// pop local 11`,
      `@11`,
      `D = A`,
      `@LCL`,
      `D = D+M`,
      `@R12`,
      `M = D`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@R12`,
      `A = M`,
      `M = D`,
      `\n`,
    ]);

    // arg
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.ARG,
        index: "11",
      })
    ).toEqual([
      `// pop argument 11`,
      `@11`,
      `D = A`,
      `@ARG`,
      `D = D+M`,
      `@R12`,
      `M = D`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@R12`,
      `A = M`,
      `M = D`,
      `\n`,
    ]);

    // THIS
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.THIS,
        index: "11",
      })
    ).toEqual([
      `// pop this 11`,
      `@11`,
      `D = A`,
      `@THIS`,
      `D = D+M`,
      `@R12`,
      `M = D`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@R12`,
      `A = M`,
      `M = D`,
      `\n`,
    ]);

    // THAT
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.THAT,
        index: "11",
      })
    ).toEqual([
      `// pop that 11`,
      `@11`,
      `D = A`,
      `@THAT`,
      `D = D+M`,
      `@R12`,
      `M = D`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@R12`,
      `A = M`,
      `M = D`,
      `\n`,
    ]);

    // pointer 0
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.POINTER,
        index: "0",
      })
    ).toEqual([
      `// pop pointer 0`,
      `@THIS`,
      `D = A`,
      `@R12`,
      `M = D`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      // A now points to SP - 1
      `D = M`,
      `@R12`,
      `A = M`,
      `M = D`,
      `\n`,
    ]);

    // pointer 1
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.POINTER,
        index: "1",
      })
    ).toEqual([
      `// pop pointer 1`,
      `@THAT`,
      `D = A`,
      `@R12`,
      `M = D`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      // A now points to SP - 1
      `D = M`,
      `@R12`,
      `A = M`,
      `M = D`,
      `\n`,
    ]);

    // pointer error
    let pointerError = undefined;
    try {
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.POINTER,
        index: "2",
      });
    } catch (error) {
      pointerError = error;
    } finally {
      expect(pointerError).toBeDefined();
    }

    // pointer error
    let constantError = undefined;
    try {
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.CONSTANT,
        index: "2",
      });
    } catch (error) {
      constantError = error;
    } finally {
      expect(constantError).toBeDefined();
    }

    // temp
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.TEMP,
        index: "4",
      })
    ).toEqual([
      `// pop temp 4`,
      `@9`,
      `D = A`,
      `@R12`,
      `M = D`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      // A now points to SP - 1
      `D = M`,
      `@R12`,
      `A = M`,
      `M = D`,
      `\n`,
    ]);

    // temp error
    let tempError = undefined;
    try {
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.TEMP,
        index: "9",
      });
    } catch (error) {
      tempError = error;
    } finally {
      expect(tempError).toBeDefined();
    }

    // static
    expect(
      gen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_POP,
        segment: VM_SEGMENT.STATIC,
        index: "33",
      })
    ).toEqual([
      `// pop static 33`,
      `@${FILENAME}.${33}`,
      `D = A`,
      `@R12`,
      `M = D`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      // A now points to SP - 1
      `D = M`,
      `@R12`,
      `A = M`,
      `M = D`,
      `\n`,
    ]);
  });

  test("arethmatic", () => {
    expect(gen.writeArethmatic({ command: VM_ARETHMATIC.add })).toEqual([
      `// add`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      // arathmatic
      `M = D+M`,

      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    expect(gen.writeArethmatic({ command: VM_ARETHMATIC.sub })).toEqual([
      `// sub`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      // arathmatic
      `M = M-D`,

      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    expect(gen.writeArethmatic({ command: VM_ARETHMATIC.neg })).toEqual([
      `// neg`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      // arathmatic
      `M = -M`,

      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    expect(gen.writeArethmatic({ command: VM_ARETHMATIC.lt })).toEqual([
      `// lt`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      // arathmatic
      `D = M-D`,
      `@32767`,
      `A = !A`,
      `D = D&A`,
      `@SP`,
      `A = M`,
      `M = D`,

      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    expect(gen.writeArethmatic({ command: VM_ARETHMATIC.gt })).toEqual([
      `// gt`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      // arathmatic
      `D = D-M`,
      `@32767`,
      `A = !A`,
      `D = D&A`,
      `@SP`,
      `A = M`,
      `M = D`,

      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    expect(gen.writeArethmatic({ command: VM_ARETHMATIC.lte })).toEqual([
      `// lte`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      // arathmatic
      `D = M-D`,
      `D = D-1`,
      `@32767`,
      `A = !A`,
      `D = D&A`,
      `@SP`,
      `A = M`,
      `M = D`,

      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    expect(gen.writeArethmatic({ command: VM_ARETHMATIC.gte })).toEqual([
      `// gte`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      // arathmatic
      `D = D-M`,
      `D = D-1`,
      `@32767`,
      `A = !A`,
      `D = D&A`,
      `@SP`,
      `A = M`,
      `M = D`,

      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    expect(gen.writeArethmatic({ command: VM_ARETHMATIC.eq })).toEqual([
      `// eq`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      // arathmatic
      `M = M-D`,
      `D = !M`,
      `M = M-1`,
      `D = D&M`,
      `@32767`,
      `A = !A`,
      `D = D&A`,
      `@SP`,
      `A = M`,
      `M = D`,

      `@SP`,
      `M = M+1`,
      `\n`,
    ]);

    expect(gen.writeArethmatic({ command: VM_ARETHMATIC.neq })).toEqual([
      `// neq`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      // arathmatic
      `M = M-D`,

      `@SP`,
      `M = M+1`,
      `\n`,
    ]);
  });
});
