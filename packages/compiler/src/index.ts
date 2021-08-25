import { PathLike } from "fs";
import Lexer from "./lexer";
import Codegen from "./codegen";
import { AST } from "./types";
export default function (path: PathLike) {
  const ast: AST = Lexer(path);
  Codegen(ast);
  return "HelloWorld";
}
