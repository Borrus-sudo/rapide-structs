import { existsSync, PathLike, readFileSync } from "fs";
import { resolve } from "path";
import Codegen from "./codegen";
import throwError from "./error";
import Tokeniser from "./lexer/tokeniser";
import { AST, Errors } from "./types";

export default function (codePath: PathLike) {
  if (!existsSync(codePath)) {
    throwError(Errors.ModuleNotFound, codePath as string);
    return;
  }
  const code: string = readFileSync(codePath, { encoding: "utf-8" }).trim();
  const ast: AST = Tokeniser(code);
  Codegen(ast, resolve(process.cwd(), "./example"), {});
}
