import throwError from "../error";
import { Errors, Keywords, Lexeme, Options, HttpVerb } from "../types";

const matchLetter: RegExp = /([a-zA-Z0-9]|\_|\-)+/;
const matchWhiteSpace: RegExp = /\s+/;
const isKeyword = (lexeme: string): Keywords | false => {
  switch (lexeme.toLowerCase()) {
    case "alias":
      return Keywords.alias;
    case "ignore":
      return Keywords.ignore;
    case "middleware":
      return Keywords.middleware;
    case "verb":
      return Keywords.verb;
    default:
      return false;
  }
};
const isVerb = (verb: string): verb is HttpVerb => {
  return ["get", "put", "post", "delete"].indexOf(verb) !== -1 ? true : false;
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
        if (matchLetter.test(lexeme)) {
          const matched = matchLetter.exec(optionsArray.slice(index));
          let word: string = matched[0];
          const returnVal = isKeyword(word);
          index += word.length;
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
        } else if (matchWhiteSpace.test(lexeme)) {
          index += matchWhiteSpace.exec(optionsArray.slice(index))[0].length;
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
    verb: "get",
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
            } else if (isKey === "verb") {
              if (isVerb(valuePlaceHolder)) {
                ast["verb"] = valuePlaceHolder;
              } else {
                throwError(Errors.IllegalToken, valuePlaceHolder);
              }
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
  return ast;
}
