import {
  VM_ARETHMATIC,
  VM_INTRUCTION_TYPE,
  VM_SEGMENT,
  vmSegmentsMapping,
} from "../../types";

export class VMCodeGenerator {
  private filename: string;
  constructor(props: { filename: string }) {
    this.filename = props.filename;
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
    return type === VM_INTRUCTION_TYPE.C_PUSH
      ? this.writePush({ index, segment })
      : this.writePop({ index, segment });
  }

  writeArethmatic({ command }: { command: VM_ARETHMATIC }): string[] {
    const numOpPops = [VM_ARETHMATIC.neg].includes(command) ? 1 : 2;
    return [
      // get the last stack elm
      `@SP`,
      `AM = M - 1`,

      ...(numOpPops === 2 ? [`D = M`, `@SP`, `AM = M - 1`] : []),

      ...this.arethmaticSwitch({ command }),

      `@SP`,
      `M = M + 1`,
    ];
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
      `@temp`,
      `M = D`,
      `@SP`,
      `AM = M - 1`,
      // A now points to SP - 1
      `D = M`,
      `@temp`,
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
      `M = M + 1`,
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
          `A = M + D`,
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
          `D = M + D`,
        ];

      case VM_SEGMENT.POINTER:
        const s =
          index === "0"
            ? "THIS"
            : index === "1"
            ? "THAT"
            : new Error(`pointer index should be 0 or 1, not ${index}`);
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
        return [`M = D + M`];
      case VM_ARETHMATIC.sub:
        return [`M = D - M`];
      case VM_ARETHMATIC.neg:
        return [`M = -D`];
      // TODO: the rest of arethmatic is not  yet implimented
      default:
        throw new Error(`unimplemented command ${command}`);
    }
  }
}
