import { AST } from "../types";

export default function (ast: AST) {
  console.log(JSON.stringify(ast, null, 2));
}
