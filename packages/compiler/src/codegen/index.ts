import type { AST, CodegenType, Node, Defaults } from "../types";
import MagicFile from "./MagicFile";
import Contents from "./constants";
const Codegen: CodegenType = (ast: AST, options: Defaults) => {
  const s = new MagicFile(options);
  s.createConfigFile("package.json", Contents["package.json"]);
  s.createConfigFile("README.md", Contents["README.md"]);
  s.createConfigFile(".gitignore", Contents[".gitignore"]);
  s.createConfigFile("LICENSE", Contents.LICENSE);
  // ast.traverse((node: Node) => {
  //   const { value: routeName, alias, ignore, middlewares, children } = node;
  //   const code = ``;
  // });
};
export default Codegen;
