export enum VM_SEGMENT {
  LOCAL = "local",
  ARG = "argument",
  THIS = "this",
  THAT = "that",
  POINTER = "pointer",
  TEMP = "temp",
  CONSTANT = "constant",
  STATIC = "static",
}

export const vmSegmentsMapping = {
  [VM_SEGMENT.LOCAL]: "LCL",
  [VM_SEGMENT.ARG]: "ARG",
  [VM_SEGMENT.THAT]: "THAT",
  [VM_SEGMENT.THIS]: "THIS",
};

export enum VM_INTRUCTION_TYPE {
  C_ARETHMATIC = "C_ARETHMATIC",
  C_PUSH = "C_PUSH",
  C_POP = "C_POP",
  C_LABEL = "C_LABEL",
  C_GOTO = "C_GOTO",
  C_IF = "C_IF",
  C_FUNCTION = "C_FUNCTION",
  C_RETURN = "C_RETURN",
  C_CALL = "C_CALL",
}

export enum VM_ARETHMATIC {
  add = "add",
  sub = "sub",
  neg = "neg",
  eq = "eq",
  neq = "neq",
  lt = "lt",
  lte = "lte",
  gt = "gt",
  gte = "gte",
}
