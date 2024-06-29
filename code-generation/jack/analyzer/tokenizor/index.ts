const IDENTIFIER_REGEX = /^[a-zA-Z][a-zA-Z0-9]*$/;
const NUMBER_REGEX = /[0-9]/;

export class JackTokenizor {
  constructor(private code: string) {}

  private current_token: string | undefined = undefined;
  private current_token_type: JACK_TOKEN | undefined = undefined;
  private current_index: number = 0;

  hasMoreLines(): boolean {
    return this.current_index < this.code.length;
  }

  advance() {
    // skip before
    this.skip();

    const start_index = this.current_index;
    const start_char = this.code[start_index];

    // process number
    if (NUMBER_REGEX.test(start_char)) {
      // console.log("int");
      this.processIntegerConst();
    }
    // process string
    else if (start_char === '"') {
      // console.log("char");
      this.processStringConst();
    } else if (JACK_SYMBOLS.includes(start_char)) {
      // console.log("symbol");
      this.processSymbol();
      // this.current_token = start_char
      // this.current_token_type = JACK_TOKEN.SYMBOL
      // this.current_index++
    } else {
      // console.log("word");

      this.processWord();
    }

    // skip after
    this.skip();
  }

  private processIntegerConst() {
    const start_index = this.current_index;

    while (NUMBER_REGEX.test(this.code[this.current_index])) {
      this.current_index++;
    }

    this.current_token = this.code.slice(start_index, this.current_index);
    this.current_token_type = JACK_TOKEN.INTEGER_CONSTANT;
  }

  private processStringConst() {
    this.current_index++;
    const start_index = this.current_index;

    while (this.code[this.current_index] !== '"') {
      this.current_index++;
    }

    this.current_token = this.code.slice(start_index, this.current_index);
    this.current_token_type = JACK_TOKEN.STRING_CONSTANT;
    this.current_index++;
  }

  private processSymbol() {
    this.current_token = this.code[this.current_index];
    this.current_token_type = JACK_TOKEN.SYMBOL;
    this.current_index++;
  }

  private processWord() {
    const start_index = this.current_index;
    this.current_index++;

    while (
      IDENTIFIER_REGEX.test(
        this.code.slice(start_index, this.current_index + 1)
      )
    ) {
      this.current_index++;
    }

    this.current_token = this.code.slice(start_index, this.current_index);

    this.current_token_type = Object.values(JACK_KEYWORDS).includes(
      this.current_token as JACK_KEYWORDS
    )
      ? JACK_TOKEN.KEYWORD
      : JACK_TOKEN.IDENTIFIER;
  }

  getToken(): string {
    return this.current_token!;
  }
  getTokenType(): JACK_TOKEN {
    return this.current_token_type!;
  }

  private isWhiteSpaceOrNLine(symbol: string) {
    return symbol === " " || symbol === "\n";
  }

  private isNLine(symbol: string) {
    return symbol === "\n";
  }

  private skip() {
    while (
      this.isWhiteSpaceOrNLine(this.code[this.current_index])
      // this.current_index > this.code.length
    )
      this.current_index++;

    // means its comment
    if (this.code.slice(this.current_index, this.current_index + 2) === "//") {
      while (
        !this.isNLine(this.code[this.current_index]) ||
        this.current_index > this.code.length
      )
        this.current_index++;
      this.skip();
    }

    // means its comment
    if (this.code.slice(this.current_index, this.current_index + 2) === "/*") {
      while (
        this.code.slice(this.current_index, this.current_index + 2) !== "*/" &&
        this.current_index < this.code.length
      )
        this.current_index++;

      this.current_index += 2;
      this.skip();
    }
  }
}

export enum JACK_TOKEN {
  KEYWORD = "keyword",
  SYMBOL = "symbol",
  INTEGER_CONSTANT = "integer_constant",
  STRING_CONSTANT = "string_constant",
  IDENTIFIER = "identifier",
}

export enum JACK_KEYWORDS {
  CLASS = "class",
  CONSTRUCTOR = "constructor",
  FUNCTION = "function",
  METHOD = "method",
  FIELD = "field",
  STATIC = "static",
  VAR = "var",
  INT = "int",
  CHAR = "char",
  BOOLEAN = "boolean",
  VOID = "void",
  TRUE = "true",
  FALSE = "false",
  NULL = "null",
  THIS = "this",
  LET = "let",
  DO = "do",
  IF = "if",
  ELSE = "else",
  WHILE = "while",
  RETURN = "return",
}
export const JACK_SYMBOLS = [
  "{",
  "}",
  "(",
  ")",
  "[",
  "]",
  ".",
  ",",
  ";",
  "+",
  "-",
  "*",
  "/",
  "&",
  "|",
  "<",
  ">",
  "=",
  "~",
];
