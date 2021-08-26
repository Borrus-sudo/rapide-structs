import throwError from "../error";
import { Errors, Keywords, Lexeme } from "../types";

const isLetter: RegExp = /[a-zA-Z]/;
const isWhiteSpace: RegExp = /\s/;
const isKeyword = (lexeme: string): Keywords | false => {
  switch (lexeme.toLowerCase()) {
    case "alias":
      return Keywords.alias;
    case "ignore":
      return Keywords.ignore;
    case "middlware":
      return Keywords.middleware;
    default:
      return false;
  }
};
const tokeniser = (optionsArray: string): Lexeme[] => {
  let index = 0;
  const lexemes: Lexeme[] = [];
  while (index < optionsArray.length) {
    const lexeme = optionsArray[index];
    switch (lexeme) {
      case "[":
        lexemes.push({
          type: "Punctuator",
          value: "[",
        });
        index++;
        break;
      case "]":
        lexemes.push({
          type: "Punctuator",
          value: "]",
        });
        index++;
        break;
      case ",":
        lexemes.push({
          type: "Punctuator",
          value: ",",
        });
        index++;
        break;
      case ":":
        lexemes.push({
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
            lexemes.push({
              type: "Keyword",
              value: returnVal,
            });
          } else {
            lexemes.push({
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
  return lexemes;
};
const generateAST = (tokens: Lexeme[]) => {};
//The body 0f the module
export default function (optionsArray: string) {
  const lexemes: Lexeme[] = tokeniser(optionsArray);
  generateAST(lexemes);
  console.log(JSON.stringify(lexemes, null, 2));
}
