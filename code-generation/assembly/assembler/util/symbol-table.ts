export class SymbolTable {
  constructor() {
    this.prefill();
  }

  private entries: Record<string, string> = {};

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
  }
}
