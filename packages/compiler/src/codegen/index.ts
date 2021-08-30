import type { PathLike } from "fs";
import type { AST, CodegenType, Node } from "../types";

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
