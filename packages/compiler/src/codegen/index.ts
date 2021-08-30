import type { AST, Node, CodegenType } from "../types";
import { PathLike } from "fs";

const Codegen: CodegenType = (
  ast: AST,
  basePath: PathLike,
  options: Object
) => {
  ast.traverse((node: Node) => {
    const { value: routeName } = node;
  });
};
export default Codegen;
