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
      "// init vars",
      "@256",
      "D = A",
      "@SP",
      "M = D",
      `// push constant 10`,
      `@10`,
      `D = A`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
      `// push this 1`,
      `@1`,
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

      `// add`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `M = D+M`,
      `@SP`,
      `M = M+1`,
      `\n`,
      `// push that 10`,
      `@10`,
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
      `// push pointer 1`,
      `@THAT`,
      `D = M`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `\n`,
      `// sub`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `D = M`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `M = M-D`,
      `@SP`,
      `M = M+1`,
      `\n`,
      `// neg`,
      `@SP`,
      `M = M-1`,
      `A = M`,
      `M = -M`,
      `@SP`,
      `M = M+1`,
      `\n`,
      `// pop temp 2`,
      `@7`,
      `D = A`,
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
      "(END)",
      "@END",
      "0; JMP",
      `\n`,
    ];

    const trans = new VMTranslator();

    trans.code = vmCode;
    trans.filename = "someFile";
    trans.init();
    trans.translate();
    trans.end();

    expect(trans.lines).toEqual(expected);
  });
});
