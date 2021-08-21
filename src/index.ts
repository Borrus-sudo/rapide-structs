import { PathLike } from "fs";
import Lexer from "./lexer";
export default function (path: PathLike) {
  Lexer(path);
  return "HelloWorld";
}
