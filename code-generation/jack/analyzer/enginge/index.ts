import { JACK_TOKEN, JackTokenizor } from "../tokenizor";

export class JackAnalyzerEngine {
  constructor(code: string) {
    this.tokinizer = new JackTokenizor(code);
  }
  private tokinizer: JackTokenizor;

  private result: JackAnalyzerResult = [];
  private depth: number = 0;

  compile() {
    this.compileClass();
  }

  compileClass() {
    this.addToResult("<Class>");
    this.depth += 1;

    this.consume({ token: "class" });
    this.consume({ type: JACK_TOKEN.IDENTIFIER });
    this.consume({ token: "{" });
    this.consume({ token: "}" });

    this.depth -= 1;
    this.addToResult("</Class>");
  }

  // compileClassVarDec

  private addToResult(tag: string) {
    this.result.push({ depth: this.depth, parsed: tag });
  }

  private consume(params: ConsumeParams) {
    if (!this.tokinizer.hasMoreLines())
      throw new Error(`connot consume ${params}, no more lines`);

    if (params.token === undefined && params.type === undefined)
      throw new Error(`cosume must have token or type `);

    this.tokinizer.advance();
    const currentToken = this.tokinizer.getToken();
    const currentTokenType = this.tokinizer.getTokenType();

    if (params.token !== undefined && params.token !== currentToken)
      throw new Error(
        `unexpected token, expected (${params.token}) but found (${currentToken})`
      );

    if (params.type !== undefined && params.type !== currentTokenType)
      throw new Error(
        `unexpected token, expected (${params.type}) but found (${currentTokenType})`
      );

    this.result.push({
      depth: this.depth,
      parsed: `<${currentTokenType}>${currentToken}</${currentTokenType}>`,
    });
  }

  print() {
    this.result.forEach(({ depth, parsed }) => {
      const tabs = "\t".repeat(depth);
      console.log(`${tabs}${parsed}`);
    });
  }
  //   private consumeToken(token: string) {
  //     if (!this.tokinizer.hasMoreLines())
  //       throw new Error(`connot consume ${token}, no more lines`);

  //     this.tokinizer.advance();
  //     const current_token = this.tokinizer.getToken();
  //     const currentTokenType = this.tokinizer.getTokenType();

  //     if (current_token !== token)
  //       throw new Error(
  //         `unexpected token, expected (${token}) but found (${current_token})`
  //       );

  //     this.result.push(`<${currentTokenType}>${token}</${currentTokenType}>`);
  //     console.log(`<${currentTokenType}>${token}</${currentTokenType}>`);
  //   }

  //   private consumeTokenType(type: JACK_TOKEN) {
  //     if (!this.tokinizer.hasMoreLines())
  //       throw new Error(`connot consume ${type} type, no more lines`);

  //     this.tokinizer.advance();
  //     const currentToken = this.tokinizer.getToken();
  //     const currentTokenType = this.tokinizer.getTokenType();

  //     if (currentTokenType !== type)
  //       throw new Error(
  //         `unexpected token, expected (${type}) but found (${currentTokenType})`
  //       );

  //     console.log(`<${currentTokenType}>${currentToken}</${currentTokenType}>`);
  //   }
}

type ConsumeParams = { type?: JACK_TOKEN; token?: string };
type JackAnalyzerResult = { depth: number; parsed: string }[];
