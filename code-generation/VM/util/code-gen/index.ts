import {
  VM_ARETHMATIC,
  VM_INTRUCTION_TYPE,
  VM_SEGMENT,
  vmSegmentsMapping,
} from "../../types";

/**
 * generates code from VM spec to hack assembly
 */
export class VMCodeGenerator {
  private filename: string;
  private functionPath: string[] = [];
  private returnCount: { [path: string]: number } = {};

  constructor(props: { filename: string }) {
    this.filename = props.filename;
  }

  enterFunction(f: string) {
    this.functionPath.push(f);
  }

  quitFunction() {
    this.functionPath.pop();
  }

  writePushPop({
    index,
    segment,
    type,
  }: {
    type: VM_INTRUCTION_TYPE.C_PUSH | VM_INTRUCTION_TYPE.C_POP;
    segment: VM_SEGMENT;
    index: string;
  }): string[] {
    const t = type === VM_INTRUCTION_TYPE.C_PUSH ? "push" : "pop";
    return [
      `// ${t} ${segment} ${index}`,
      ...(type === VM_INTRUCTION_TYPE.C_PUSH
        ? this.writePush({ index, segment })
        : this.writePop({ index, segment })),
      `\n`,
    ];
  }

  writeArethmatic({ command }: { command: VM_ARETHMATIC }): string[] {
    const numOpPops = [VM_ARETHMATIC.neg].includes(command) ? 1 : 2;
    return [
      `// ${command}`,
      `@SP`,
      `M = M-1`,
      `A = M`,

      ...(numOpPops === 2 ? [`D = M`, `@SP`, `M = M-1`, `A = M`] : []),

      ...this.arethmaticSwitch({ command }),

      `@SP`,
      `M = M+1`,
      `\n`,
    ];
  }

  writeCall({ nVars, name }: { name: string; nVars: number }) {
    const fPath = [this.filename, ...this.functionPath].join(".");
    this.returnCount[fPath] = (this.returnCount[fPath] ?? 0) + 1;

    const retunLabel = fPath + `$ret.${this.returnCount[fPath]}`;
    return [
      //
      `// call ${name} ${nVars}`,
      `@${retunLabel}`,
      `D = A`,
      `@SP`,
      `A = M`,
      `M = D`,
      `@LCL`,
      `D = M`,
      `@SP`,
      `M = M+1`,
      `A = M`,
      `M = D`,
      `@ARG`,
      `D = M`,
      `@SP`,
      `M = M+1`,
      `A = M`,
      `M = D`,
      `@THIS`,
      `D = M`,
      `@SP`,
      `M = M+1`,
      `A = M`,
      `M = D`,
      `@THAT`,
      `D = M`,
      `@SP`,
      `M = M+1`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
      `A = M`,
      `D = M`,
      `@LCL`,
      `M = D`,
      `@ARG`,
      `M = D`,
      `@${5 + nVars}`,
      `D = A`,
      `@ARG`,
      `M = M-D`,
      `@${name}`,
      `0; JMP`,
      `(${retunLabel})`,
      `\n`,
    ];
  }

  writeReturn(): string[] {
    const currentFPath = [this.filename, ...this.functionPath].join(".");
    this.functionPath.pop();
    return [
      //
      `// return (from function ${currentFPath})`,
      `@LCL`,
      `D = M`,
      // R12 will be the current LCL (end of frame)
      `@R12`,
      `M = D`,

      // R13 will be the return address
      `@5`,
      `D = A`,
      `@R12`,
      `A = M-D`,
      `D = M`,
      `@R13`,
      `M = D`,

      // put the current sp into arg, whick will be the sp later
      `@SP`,
      `A = M-1`,
      `D = M`,
      `@ARG`,
      `A = M`,
      `M = D`,

      // reposition stack pointer
      `@ARG`,
      `D = M+1`,
      `@SP`,
      `M = D`,

      // reposition THAT
      `@1`,
      `D = A`,
      `@R12`,
      `A = M-D`,
      `D = M`,
      `@THAT`,
      `M = D`,

      // reposition THIS
      `@2`,
      `D = A`,
      `@R12`,
      `A = M-D`,
      `D = M`,
      `@THIS`,
      `M = D`,

      // reposition ARG
      `@3`,
      `D = A`,
      `@R12`,
      `A = M-D`,
      `D = M`,
      `@ARG`,
      `M = D`,

      // reposition LCL
      `@4`,
      `D = A`,
      `@R12`,
      `A = M-D`,
      `D = M`,
      `@LCL`,
      `M = D`,

      // goto return address
      `@5`,
      `D = A`,
      `@R12`,
      `A = M-D`,
      `D = M`,
      `A = M`,
      `0; JMP`,
      `\n`,
    ];
  }

  writeFunction({ nVars, name }: { name: string; nVars: number }): string[] {
    this.functionPath.push(name);
    const path = [this.filename, ...this.functionPath].join(".");
    return [
      //
      `// function ${name} ${nVars}`,
      `(${path})`,
      `\n`,
    ];
  }

  writeIf({ label }: { label: string }): string[] {
    return [
      `// if-goto ${label}`,
      // get stack
      `@SP`,
      `M = M-1`,
      `A = M`,
      // get value to D
      `D = M`,
      // // return stack pointer
      // `@SP`,
      // `M = M + 1`,
      `@${label}`,
      `D; JNE`,
      `\n`,
    ];
  }

  writeGoto({ label }: { label: string }): string[] {
    return [`// goto ${label}`, `@${label}`, `0; JMP`, `\n`];
  }

  writeLabel({ label }: { label: string }): string[] {
    const path = [[this.filename, ...this.functionPath].join("."), label].join(
      "$"
    );
    return [`// label ${label}`, `(${path})`, `\n`];
  }

  private writePop({
    index,
    segment,
  }: {
    segment: VM_SEGMENT;
    index: string;
  }): string[] {
    if (segment === VM_SEGMENT.CONSTANT)
      throw new Error(`operation (${segment}) is not supported in pop`);

    return [
      ...this.getSegmentAddressIntoD({ index, segment }),
      // save address of the segent index
      // in temp var
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
    ];
  }

  private writePush({
    index,
    segment,
  }: {
    segment: VM_SEGMENT;
    index: string;
  }): string[] {
    return [
      ...this.getSegmentIntoD({ index, segment }),
      `@SP`,
      `A = M`,
      `M = D`,
      `@SP`,
      `M = M+1`,
    ];
  }

  private getSegmentIntoD({
    index,
    segment,
  }: {
    segment: VM_SEGMENT;
    index: string;
  }): string[] {
    switch (segment) {
      case VM_SEGMENT.LOCAL:
      case VM_SEGMENT.ARG:
      case VM_SEGMENT.THIS:
      case VM_SEGMENT.THAT:
        return [
          `@${index}`,
          `D = A`,
          `@${vmSegmentsMapping[segment]}`,
          `A = M+D`,
          `D = M`,
        ];

      case VM_SEGMENT.POINTER:
        const s = index === "0" ? "THIS" : index === "1" ? "THAT" : undefined;

        if (s === undefined)
          throw new Error(`pointer index should be 0 or 1, not ${index}`);

        return [`@${s}`, `D = M`];
      case VM_SEGMENT.TEMP:
        const indexInt = parseInt(index);
        if (indexInt < 0 || indexInt > 7)
          throw new Error(`temp index should be between 0 and 7`);

        return [`@${5 + indexInt}`, `D = M`];

      case VM_SEGMENT.CONSTANT:
        return [`@${index}`, `D = A`];
      case VM_SEGMENT.STATIC:
        return [`@${this.filename}.${index}`, `D = M`];
    }
  }

  private getSegmentAddressIntoD({
    index,
    segment,
  }: {
    segment: VM_SEGMENT;
    index: string;
  }): string[] {
    switch (segment) {
      case VM_SEGMENT.LOCAL:
      case VM_SEGMENT.ARG:
      case VM_SEGMENT.THIS:
      case VM_SEGMENT.THAT:
        return [
          `@${index}`,
          `D = A`,
          `@${vmSegmentsMapping[segment]}`,
          `D = M+D`,
        ];

      case VM_SEGMENT.POINTER:
        const s = index === "0" ? "THIS" : index === "1" ? "THAT" : undefined;

        if (s === undefined)
          throw new Error(`pointer index should be 0 or 1, not ${index}`);

        return [`@${s}`, `D = A`];
      case VM_SEGMENT.TEMP:
        const indexInt = parseInt(index);
        if (indexInt < 0 || indexInt > 7)
          throw new Error(`temp index should be between 0 and 7`);

        return [`@${5 + indexInt}`, `D = A`];

      case VM_SEGMENT.CONSTANT:
        return [`@${index}`, `A = D`];
      case VM_SEGMENT.STATIC:
        return [`@${this.filename}.${index}`, `D = A`];
    }
  }

  private arethmaticSwitch({ command }: { command: VM_ARETHMATIC }): string[] {
    switch (command) {
      case VM_ARETHMATIC.add:
        return [`M = D+M`];
      case VM_ARETHMATIC.sub:
        return [`M = M-D`];
      case VM_ARETHMATIC.neg:
        return [`M = -M`];
      case VM_ARETHMATIC.lt:
        // x < y -> M < D
        return [
          `D = M-D`,
          `@32767`,
          `A = !A`,
          `D = D&A`,
          `@SP`,
          `A = M`,
          `M = D`,
        ];
      case VM_ARETHMATIC.gt:
        // x > y -> M > D
        return [
          `D = D-M`,
          `@32767`,
          `A = !A`,
          `D = D&A`,
          `@SP`,
          `A = M`,
          `M = D`,
        ];
      case VM_ARETHMATIC.lte:
        // x <= y -> M <= D -> M-1 < D
        return [
          `D = M-D`,
          `D = D-1`,
          `@32767`,
          `A = !A`,
          `D = D&A`,
          `@SP`,
          `A = M`,
          `M = D`,
        ];
      case VM_ARETHMATIC.gte:
        // x >= y -> M >= D -> M > D-1
        return [
          `D = D-M`,
          `D = D-1`,
          `@32767`,
          `A = !A`,
          `D = D&A`,
          `@SP`,
          `A = M`,
          `M = D`,
        ];
      case VM_ARETHMATIC.eq:
        return [
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
        ];
      case VM_ARETHMATIC.neq:
        // do nothing, because we will return the current stack top
        return [`M = M-D`];
      // TODO: the rest of arethmatic is not  yet implimented
      default:
        throw new Error(`unimplemented command ${command}`);
    }
  }
}
