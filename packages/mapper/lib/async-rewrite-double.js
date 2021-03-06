const antlr4 = require('antlr4');
const ECMAScriptLexer = require('../antlr/ECMAScriptLexer.js').ECMAScriptLexer;
const ECMAScriptParser = require('../antlr/ECMAScriptParser.js').ECMAScriptParser;
const ECMAScriptVisitor = require('../antlr/ECMAScriptVisitor.js').ECMAScriptVisitor;

const JavaScriptLexer = require('../antlr/JavaScriptLexer.js').JavaScriptLexer;
const JavaScriptParser = require('../antlr/JavaScriptParser.js').JavaScriptParser;
const JavaScriptVisitor = require('../antlr/JavaScriptParserVisitor.js').JavaScriptParserVisitor;

class AsyncWriter extends ECMAScriptVisitor {
  constructor(chars, tokens) {
    super();
    this.inputStream = chars;
    this.commonTokenStream = tokens;
  }
  visitChildren(ctx) {
    return ctx.children.reduce((str, node) => {
      return `${str}${this.visit(node)}`;
    }, '').trim();
  }
  visitEof() {
    return '';
  }
  visitEos() {
    return '\n';
  }
  visitTerminal(ctx) {
    if (this.commonTokenStream.tokens.length > ctx.symbol.tokenIndex + 1) { // lookahead
      const lookahead = this.commonTokenStream.tokens[ctx.symbol.tokenIndex + 1];
      if (lookahead.channel === 1) {
        return `${ctx.getText()}${this.inputStream.getText(lookahead.start, lookahead.stop)}`;
      }
    }
    return ctx.getText();
  }
  visitFuncCallExpression(ctx) {
    const startIndex = ctx.start.start;
    const endIndex = ctx.stop.stop;
    for (let n = 0; n < this.locations.length; n++) {
      const loc = this.locations[n];
      if (loc < endIndex && loc > startIndex) {
        return `(await ${this.visitChildren(ctx)})`;
      }
    }
    return this.visitChildren(ctx);
  }
}

class JavaScriptWriter extends JavaScriptVisitor {
  visitChildren(ctx) {
    return ctx.children.reduce((str, node) => {
      return `${str}${this.visit(node)}`;
    }, '').trim();
  }
  visitTerminal(ctx) {
    return ctx.getText();
  }
}

const compileEcma = function(input, locations) {
  const chars = new antlr4.InputStream(input);
  const lexer = new ECMAScriptLexer(chars);
  lexer.strictMode = false;
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new ECMAScriptParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.program();

  const writer = new AsyncWriter(chars, tokens);
  writer.locations = locations;
  const x = writer.visitProgram(tree);
  return x;
};

const compileJS = function(input, locations) {
  const chars = new antlr4.InputStream(input);
  const lexer = new JavaScriptLexer(chars);
  lexer.strictMode = false;
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new JavaScriptParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.program();

  // const writer = new AsyncWriter(chars, tokens);
  // writer.locations = locations;
  // return writer.visitNumericLiteral(tree);
};

if (require.main === module) {
  console.log('compiling "1" using ECMAScript grammar');
  console.log(compileEcma('1'));
  console.log('compiling "1" using JavaScript grammar');
  console.log(compileJS('1'));
}

module.exports = compileEcma;
