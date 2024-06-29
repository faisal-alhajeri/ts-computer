import { JACK_TOKEN, JackTokenizor } from ".";

describe("jack tokenizor", () => {
  test("tokinize while ", () => {
    const code = `while(x<3){
        if(x =      8) {
            x.call("faisal")
            return ;
        }
    }
    `;
    const tokenizor = new JackTokenizor(code);
    expect(tokenizor.hasMoreLines()).toEqual(true);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("while");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.KEYWORD);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("(");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("x");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.IDENTIFIER);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("<");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("3");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.INTEGER_CONSTANT);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual(")");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("{");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("if");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.KEYWORD);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("(");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("x");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.IDENTIFIER);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("=");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("8");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.INTEGER_CONSTANT);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual(")");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("{");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("x");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.IDENTIFIER);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual(".");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("call");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.IDENTIFIER);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("(");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("faisal");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.STRING_CONSTANT);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual(")");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("return");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.KEYWORD);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual(";");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(true);
    expect(tokenizor.getToken()).toEqual("}");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);

    tokenizor.advance();
    expect(tokenizor.hasMoreLines()).toEqual(false);
    expect(tokenizor.getToken()).toEqual("}");
    expect(tokenizor.getTokenType()).toEqual(JACK_TOKEN.SYMBOL);
  });
});
