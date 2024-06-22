import { VMTranslator } from ".";
describe("VM hack translator", () => {
  test("translates dump program well ", () => {
    const vmCode = `push constant 10
push this 1
add
push that 10
push pointer 1
sub
neg
pop temp 2
`;

    const expected = [
      `// push constant 10`,
      `@10`,
      `D = A`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M + 1`,
      `\n`,
      `// push this 1`,
      `@1`,
      `D = A`,
      `@THIS`,
      `A = M + D`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M + 1`,
      `\n`,

      `// add`,
      `@SP`,
      `AM = M - 1`,
      `D = M`,
      `@SP`,
      `AM = M - 1`,
      `M = D + M`,
      `@SP`,
      `M = M + 1`,
      `\n`,
      `// push that 10`,
      `@10`,
      `D = A`,
      `@THAT`,
      `A = M + D`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M + 1`,
      `\n`,
      `// push pointer 1`,
      `@THAT`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M + 1`,
      `\n`,
      `// sub`,
      `@SP`,
      `AM = M - 1`,
      `D = M`,
      `@SP`,
      `AM = M - 1`,
      `M = M - D`,
      `@SP`,
      `M = M + 1`,
      `\n`,
      `// neg`,
      `@SP`,
      `AM = M - 1`,
      `M = -M`,
      `@SP`,
      `M = M + 1`,
      `\n`,
      `// pop temp 2`,
      `@7`,
      `D = A`,
      `@R12`,
      `M = D`,
      `@SP`,
      `AM = M - 1`,
      `D = M`,
      `@R12`,
      `A = M`,
      `M = D`,
      `\n`,
    ];

    const trans = new VMTranslator({ code: vmCode, filename: "someFile" });

    const result = trans.translate();

    expect(result).toEqual(expected);
  });
});
