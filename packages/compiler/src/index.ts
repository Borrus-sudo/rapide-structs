import { existsSync, PathLike, readFileSync } from "fs";
import Codegen from "./codegen";
import throwError from "./error";
import Parser from "./lexer/parser";
import { Errors } from "./types";

export default function (codePath: PathLike) {
  if (!existsSync(codePath)) {
    throwError(Errors.ModuleNotFound, codePath as string);
    return;
  }
  const code: string = readFileSync(codePath, { encoding: "utf-8" }).trim();
  const { ast, frontMatter } = Parser(code);
  Codegen(ast, frontMatter);
}

