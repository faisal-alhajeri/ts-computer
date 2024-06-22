import { VMParser } from ".";
import { VM_ARETHMATIC, VM_INTRUCTION_TYPE, VM_SEGMENT } from "../../types";
describe("vm parser", () => {
  test("parses files correctly", () => {
    const code = `
push constant 10
push this 1
add
// comment and should be ignored
push that 10
push pointer 1
sub
sub
pop temp 2
function xxx 3
goto abc
if-goto xyz
label pls-work
call yyy 4
return
        `;
    const parser = new VMParser(code);
    expect(parser.hasMoreLines()).toEqual(true);

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_PUSH);
    expect(parser.arg1()).toEqual(VM_SEGMENT.CONSTANT);
    expect(parser.arg2()).toEqual("10");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_PUSH);
    expect(parser.arg1()).toEqual(VM_SEGMENT.THIS);
    expect(parser.arg2()).toEqual("1");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_ARETHMATIC);
    expect(parser.arg1()).toEqual(VM_ARETHMATIC.add);

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_PUSH);
    expect(parser.arg1()).toEqual(VM_SEGMENT.THAT);
    expect(parser.arg2()).toEqual("10");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_PUSH);
    expect(parser.arg1()).toEqual(VM_SEGMENT.POINTER);
    expect(parser.arg2()).toEqual("1");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_ARETHMATIC);
    expect(parser.arg1()).toEqual(VM_ARETHMATIC.sub);

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_ARETHMATIC);
    expect(parser.arg1()).toEqual(VM_ARETHMATIC.sub);

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_POP);
    expect(parser.arg1()).toEqual(VM_SEGMENT.TEMP);
    expect(parser.arg2()).toEqual("2");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_FUNCTION);
    expect(parser.arg1()).toEqual("xxx");
    expect(parser.arg2()).toEqual("3");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_GOTO);
    expect(parser.arg1()).toEqual("abc");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_IF);
    expect(parser.arg1()).toEqual("xyz");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_LABEL);
    expect(parser.arg1()).toEqual("pls-work");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(true);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_CALL);
    expect(parser.arg1()).toEqual("yyy");
    expect(parser.arg2()).toEqual("4");

    parser.advance();
    expect(parser.hasMoreLines()).toEqual(false);
    expect(parser.instructionType()).toEqual(VM_INTRUCTION_TYPE.C_RETURN);
  });
});
