import { HackAssembler } from ".";
describe("assembler", () => {
  test("line numbers", () => {
    const asm = new HackAssembler();
    const code = `
(START)
@START
D = A
D = A

// loop should have line number 3 (011)
(LOOP)
D = A
D = A
@LOOP
0; JMP
`;
    asm.addCode(code);

    const res = asm.generate();
    expect(res).toEqual(`0000000000000000
1110110000010000
1110110000010000
1110110000010000
1110110000010000
0000000000000011
1110101010000111`);
  });

  test("add (R0) and (R1) in (R2)", () => {
    const asm = new HackAssembler();
    const code = `
// add the value of R0 and R1 and 17 puth the value in R2

// get the value of R0 and save it in D
@R0
D = M

// get the value of R1 and add it to D (R0) value
@R1
D = D+M

// add 17 to D (R0 value + R1 value)
@17
D = D+A

// store the value in R2
@R2
M = D

// convition for ending the program
(END)
@END
0; JMP
`;

    asm.addCode(code);

    const res = asm.generate();
    expect(res).toEqual(`0000000000000000
1111110000010000
0000000000000001
1111000010010000
0000000000010001
1110000010010000
0000000000000010
1110001100001000
0000000000001000
1110101010000111`);
  });
});
