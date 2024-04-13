import { SymbolTable } from "./symbol-table";

describe("symbol table", () => {
  test("all", () => {
    expect.assertions(7);

    const tbl = new SymbolTable();

    tbl.addEntry({
      symbol: "var1",
      address: "1",
    });
    tbl.addEntry({ symbol: "var2", address: "2" });

    expect(tbl.contains({ symbol: "var1" })).toEqual(true);
    expect(tbl.contains({ symbol: "var2" })).toEqual(true);
    expect(tbl.contains({ symbol: "var3" })).toEqual(false);

    expect(tbl.getAddress({ symbol: "var1" })).toEqual("1");
    expect(tbl.getAddress({ symbol: "var2" })).toEqual("2");

    try {
      tbl.getAddress({ symbol: "var3" });
    } catch (e) {
      expect(e).toBeDefined();
    }

    try {
      tbl.addEntry({ symbol: "var1", address: "3" });
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
