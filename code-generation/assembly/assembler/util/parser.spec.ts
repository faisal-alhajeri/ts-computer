import { INTRUCTION_TYPE, Parser } from "./parser";

describe("parser", () => {
  const code = `@12345
A = M + 1
(LOOP)
AM = M - 1; JLE
    

`;

  test("instructionType", () => {
    const parser = new Parser(code);
    parser.advance();
    expect(parser.instructionType()).toEqual(INTRUCTION_TYPE.A_INSTRUCTION);

    parser.advance();
    expect(parser.instructionType()).toEqual(INTRUCTION_TYPE.C_INSTRUCTION);

    parser.advance();
    expect(parser.instructionType()).toEqual(INTRUCTION_TYPE.L_INSTRUCTION);

    parser.advance();
    expect(parser.instructionType()).toEqual(INTRUCTION_TYPE.C_INSTRUCTION);
  });

  test("hasMoreLines", () => {
    const parser = new Parser(code);

    let i = 0;
    while (parser.hasMoreLines()) {
      parser.advance();
      i++;
    }

    expect(i).toEqual(4);
  });

  test("symbol", () => {
    expect.assertions(4);
    const parser = new Parser(code);

    parser.advance();
    expect(parser.symbol()).toEqual("12345");

    parser.advance();
    try {
      parser.symbol();
    } catch (e) {
      expect(e).toBeDefined();
    }

    parser.advance();
    expect(parser.symbol()).toEqual("LOOP");

    parser.advance();
    try {
      parser.symbol();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("dest", () => {
    expect.assertions(4);
    const parser = new Parser(code);

    parser.advance();
    try {
      parser.dest();
    } catch (e) {
      expect(e).toBeDefined();
    }

    parser.advance();
    expect(parser.dest()).toEqual("A");

    parser.advance();
    try {
      parser.dest();
    } catch (e) {
      expect(e).toBeDefined();
    }

    parser.advance();
    expect(parser.dest()).toEqual("AM");
  });

  test("comp", () => {
    expect.assertions(4);
    const parser = new Parser(code);

    parser.advance();
    try {
      parser.comp();
    } catch (e) {
      expect(e).toBeDefined();
    }

    parser.advance();
    expect(parser.comp()).toEqual("M + 1");

    parser.advance();
    try {
      parser.comp();
    } catch (e) {
      expect(e).toBeDefined();
    }

    parser.advance();
    expect(parser.comp()).toEqual("M - 1");
  });

  test("jump", () => {
    expect.assertions(4);
    const parser = new Parser(code);

    parser.advance();
    try {
      parser.jump();
    } catch (e) {
      expect(e).toBeDefined();
    }

    parser.advance();
    expect(parser.jump()).toEqual(undefined);

    parser.advance();
    try {
      parser.jump();
    } catch (e) {
      expect(e).toBeDefined();
    }

    parser.advance();
    expect(parser.jump()).toEqual("JLE");
  });
});
