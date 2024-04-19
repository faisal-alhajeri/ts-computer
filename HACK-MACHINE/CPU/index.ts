import { ALU, ALUControl } from "../../componenets/ALU/ALU";
import { Bit, BitArray, Gate } from "../../componenets/gate";
import { AndGate } from "../../componenets/gate/derived/and";
import { MultiplexerGate } from "../../componenets/gate/derived/multiplexer";
import { MultiBitMultiplexerGate } from "../../componenets/gate/derived/multiplexer/multi/bit";
import { MultiWayMultiplexerGate } from "../../componenets/gate/derived/multiplexer/multi/ways";
import { NotGate } from "../../componenets/gate/derived/not";
import { OrGate } from "../../componenets/gate/derived/or";
import { PC } from "../../componenets/memory/PC";
import { MultiBitRegister } from "../../componenets/memory/register/multi/bit";

// inputs are inM, instruction, reset, clock
export type CPUInputs = [BitArray, BitArray, Bit, Bit];
// outputs are outM, writeM, addressM, PC
export type CPUOutputs = [BitArray, Bit, BitArray, BitArray];

export class CPU extends Gate<CPUInputs, CPUOutputs> {
  private readonly ALU: ALU = new ALU(16);
  private readonly A_REGISTER = new MultiBitRegister(16);
  private readonly D_REGISTER = new MultiBitRegister(16);
  private readonly PC = new PC(16);

  get addressM() {
    return this.A_REGISTER.stored;
  }

  get counter() {
    return this.PC.stored;
  }

  private readonly alu_second_input_mult: MultiBitMultiplexerGate =
    new MultiBitMultiplexerGate(16);

  private writeMAnd: AndGate = new AndGate();

  private aInputMult: MultiBitMultiplexerGate = new MultiBitMultiplexerGate(16);
  private aLoadNot: NotGate = new NotGate();
  private aLoadOr: OrGate = new OrGate();

  private pcLoadFromCMult: MultiWayMultiplexerGate =
    new MultiWayMultiplexerGate(1, 3);
  private pcLoadFromAOrCMult: MultiplexerGate = new MultiplexerGate();
  private notPcLoadGate: NotGate = new NotGate();
  private notZeroGate: NotGate = new NotGate();
  private notNegative: NotGate = new NotGate();
  private lsOrEqualGate: OrGate = new OrGate();
  private notLsOrEqualGate: NotGate = new NotGate();

  /**
   * cpu eval is in 3 steps non concurrent steps:
   *  1- cpu eval
   *  2- A_register eval
   *  3- pc_eval
   */
  async eval([inM, instruction, reset, clock]: CPUInputs): Promise<CPUOutputs> {
    // assemble the instruction
    const instructionDetails = this.getInstructionDetails(instruction);

    // decide ALU inputs
    const aluSecondInput = await this.alu_second_input_mult
      .eval([[this.A_REGISTER.stored, inM], instructionDetails.c_a])
      .then(([bits]) => bits);

    // get ALU result
    const [[alu_result], [isZero, isNg]] = await this.ALU.eval([
      [this.D_REGISTER.stored, aluSecondInput],
      instructionDetails.c_alu_control,
    ]);

    // save into D register if specifed in dest
    await this.D_REGISTER.eval([
      alu_result,
      instructionDetails.c_dest_d,
      clock,
    ]);

    // decide the A_REGISTER input and load
    const notType: Bit = await this.aLoadNot
      .eval([instructionDetails.type])
      .then(([bit]) => bit);
    const aload: Bit = await this.aLoadOr
      .eval([instructionDetails.c_dest_a, notType])
      .then(([bit]) => bit);
    const aInput: BitArray = await this.aInputMult
      .eval([
        [[0, ...instructionDetails.a_data], alu_result],
        instructionDetails.type,
      ])
      .then(([bits]) => bits);

    await this.A_REGISTER.eval([aInput, aload, clock]);

    // decide to write on m or not
    const writeM = await this.writeMAnd
      .eval([instructionDetails.type, instructionDetails.c_dest_m])
      .then(([bit]) => bit);

    // pc eval
    const [isNotZero, isNotNG, isLsOrEqualZero] = await Promise.all([
      this.notZeroGate.eval([isZero]).then(([bit]) => bit),
      this.notNegative.eval([isNg]).then(([bit]) => bit),
      this.lsOrEqualGate.eval([isZero, isNg]).then(([bit]) => bit),
    ]);

    const isBgThanZero = await this.notLsOrEqualGate
      .eval([isLsOrEqualZero])
      .then(([bit]) => bit);

    const [[pcLoadFromC]] = await this.pcLoadFromCMult.eval([
      [
        [0], // no jump
        [isBgThanZero], // bigger than zero (x > 0)
        [isZero], // equal zero (x === 0)
        [isNotNG], // bigger or equal (x >= 0)
        [isNg], // smaller than zero (x < 0)
        [isNotZero], // not equal zero (x !== 0)
        [isLsOrEqualZero], // less or equal zerp (x <= 0)
        [1], // always jump
      ],
      instructionDetails.c_jmp,
    ]);

    const pcLaodFromA: Bit = instructionDetails.type;

    const [pcLoad] = await this.pcLoadFromAOrCMult.eval([
      [pcLaodFromA, pcLoadFromC],
      instructionDetails.type,
    ]);

    const [incr] = await this.notPcLoadGate.eval([pcLoad]);

    await this.PC.eval([this.A_REGISTER.stored, [pcLoad, incr, reset], clock]);

    return [
      alu_result,
      writeM,
      this.A_REGISTER.stored.slice(1),
      this.PC.stored.slice(1),
    ];
  }

  private getInstructionDetails(instruction: BitArray) {
    return {
      type: instruction[0],
      a_data: instruction.slice(1, 16),
      c_alu_control: instruction.slice(4, 10) as ALUControl,
      c_a: instruction[3],
      c_dest_a: instruction[10],
      c_dest_d: instruction[11],
      c_dest_m: instruction[12],
      c_jmp: instruction.slice(13, 16) as BitArray,
    };
  }
}
