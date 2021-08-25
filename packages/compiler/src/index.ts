import { PathLike, existsSync, readFileSync } from "fs";
import Lexer from "./lexer/tokeniser";
import Codegen from "./codegen";
import { AST, Errors } from "./types";
import throwError from "./error";

export default function (codePath: PathLike) {
  if (!existsSync(codePath)) {
    throwError(Errors.ModuleNotFound, codePath as string);
    return;
  }
  const code:string = readFileSync(codePath, { encoding: "utf-8" }).trim();
  const ast: AST = Lexer(code);
  Codegen(ast);
}
