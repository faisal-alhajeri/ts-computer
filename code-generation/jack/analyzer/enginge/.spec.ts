import { JackAnalyzerEngine } from ".";

describe("jack analyzer engine", () => {
  test("class", () => {
    const code = `
        class x {

        }
        `;

    const analyzer = new JackAnalyzerEngine(code);
    analyzer.compileClass();
    analyzer.print();
  });
});
