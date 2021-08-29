import throwError from "../error";
import { Errors, Keywords, Lexeme, Options } from "../types";

const isLetter: RegExp = /[a-zA-Z0-9]/;
const isWhiteSpace: RegExp = /\s/;
const isKeyword = (lexeme: string): Keywords | false => {
  switch (lexeme.toLowerCase()) {
    case "alias":
      return Keywords.alias;
    case "ignore":
      return Keywords.ignore;
    case "middleware":
      return Keywords.middleware;
    default:
      return false;
  }
};
const tokeniser = (optionsArray: string): Lexeme[] => {
  let index = 0;
  const tokens: Lexeme[] = [];
  while (index < optionsArray.length) {
    const lexeme = optionsArray[index];
    switch (lexeme) {
      case "[":
        tokens.push({
          type: "Punctuator",
          value: "[",
        });
        index++;
        break;
      case "]":
        tokens.push({
          type: "Punctuator",
          value: "]",
        });
        index++;
        break;
      case ",":
        tokens.push({
          type: "Punctuator",
          value: ",",
        });
        index++;
        break;
      case ":":
        tokens.push({
          type: "Punctuator",
          value: ":",
        });
        index++;
        break;
      default:
        if (isLetter.test(lexeme)) {
          let word: string = "";
          word += lexeme;
          while (isLetter.test(optionsArray[++index])) {
            word += optionsArray[index];
          }
          const returnVal = isKeyword(word);
          if (returnVal) {
            tokens.push({
              type: "Keyword",
              value: returnVal,
            });
          } else {
            tokens.push({
              type: "Literal",
              value: word,
            });
          }
        } else if (isWhiteSpace.test(lexeme)) {
          index++;
        } else {
          throwError(Errors.UnidentifiedToken, lexeme);
        }
    }
  }
  return tokens;
};
const generateAST = (tokens: Lexeme[]): Options => {
  const ast: Options = {
    middlewares: [],
    alias: [],
    ignore: false,
  };
  const walkArray = (tokens: Lexeme[]) => {
    const currentToken: Lexeme = tokens[0];
    if (currentToken.value !== "[") {
      throwError(Errors.IllegalToken, currentToken.value);
    }
    let start = 1;
    while (start < tokens.length - 1) {
      const value: string = tokens[start]?.value || "";
      if (start % 2 !== 0) {
        //analyze the pair
        const colonPlaceHolder = tokens[++start]?.value || "";
        if (colonPlaceHolder !== ":") {
          throwError(Errors.MissingToken, ":");
        }
        const valuePlaceHolder = tokens[++start]?.value || "";
        if (!valuePlaceHolder) {
          throwError(Errors.SyntaxError, "A value is required after colon");
        }
        const isValue = isKeyword(valuePlaceHolder);
        const isKey = isKeyword(value);
        if (isKey) {
          if (!isValue) {
            if (isKey === "ignore") {
              ast["ignore"] = Boolean(valuePlaceHolder);
            } else if (isKey === "middleware") {
              ast["middlewares"].push(valuePlaceHolder);
            } else {
              ast["alias"].push(valuePlaceHolder);
            }
          } else {
            throwError(
              Errors.SyntaxError,
              `The keyword \`${valuePlaceHolder}\` cannot be used as a value.`,
              true
            );
          }
        } else {
          throwError(
            Errors.SyntaxError,
            `The token \`${value}\` is expected to be a keyword.`,
            true
          );
        }
      } else {
        if (value !== ",") {
          throwError(Errors.MissingToken, ",");
        }
      }
      start++;
    }
    if (tokens[tokens.length - 1].value !== "]") {
      throwError(Errors.MissingToken, "]");
    }
  };
  if (tokens.length > 0) walkArray(tokens);
  return ast;
};

// Piece knitting everything together
export default function (optionsArray: string): Options {
  const tokens: Lexeme[] = tokeniser(optionsArray);
  const ast: Options = generateAST(tokens);
  console.log(JSON.stringify(ast, null, 2));
  return ast;
}
