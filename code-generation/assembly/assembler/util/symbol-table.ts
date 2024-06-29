export class SymbolTable {
  constructor() {
    this.prefill();
  }

  public readonly entries: Record<string, string> = {};

  addEntry({ address, symbol }: { symbol: string; address: string }) {
    const old = this.entries[symbol];

    if (old) throw new Error(`old entry exsits with name (${symbol})`);

    this.entries[symbol] = address;
  }

  contains({ symbol }: { symbol: string }) {
    return this.entries[symbol] !== undefined;
  }

  getAddress({ symbol }: { symbol: string }) {
    const result = this.entries[symbol];

    if (result === undefined)
      throw new Error(`cant get variable with symbol (${symbol})`);

    return result;
  }

  private prefill() {
    this.addEntry({ symbol: "R0", address: "0" });
    this.addEntry({ symbol: "R1", address: "1" });
    this.addEntry({ symbol: "R2", address: "2" });
    this.addEntry({ symbol: "R3", address: "3" });
    this.addEntry({ symbol: "R4", address: "4" });
    this.addEntry({ symbol: "R5", address: "5" });
    this.addEntry({ symbol: "R6", address: "6" });
    this.addEntry({ symbol: "R7", address: "7" });
    this.addEntry({ symbol: "R8", address: "8" });
    this.addEntry({ symbol: "R9", address: "9" });
    this.addEntry({ symbol: "R10", address: "10" });
    this.addEntry({ symbol: "R11", address: "11" });
    this.addEntry({ symbol: "R12", address: "12" });
    this.addEntry({ symbol: "R13", address: "13" });
    this.addEntry({ symbol: "R14", address: "14" });
    this.addEntry({ symbol: "R15", address: "15" });
    this.addEntry({ symbol: "SP", address: "0" });
    this.addEntry({ symbol: "FP", address: "5" });
    this.addEntry({ symbol: "LCL", address: "1" });
    this.addEntry({ symbol: "ARG", address: "2" });
    this.addEntry({ symbol: "THIS", address: "3" });
    this.addEntry({ symbol: "THAT", address: "4" });
  }
}
