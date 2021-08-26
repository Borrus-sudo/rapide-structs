import { Keywords, Errors, Lexeme } from "../types";
import throwError from "../error";

//Global utils
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

//The body 0f the module
export default function (optionsArray: string) {
  let index = 0;
  const lexemes: Lexeme[] = [];
  loop: while (index < optionsArray.length) {
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
          break loop;
        }
    }
  }
  console.log(JSON.stringify(lexemes, null, 2));
}
