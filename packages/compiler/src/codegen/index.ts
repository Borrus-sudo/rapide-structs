import type { AST, CodegenType, Node, Defaults } from "../types";
import MagicFile from "./MagicFile";
import Contents from "./constants";
const Codegen: CodegenType = (ast: AST, options: Defaults) => {
  const s = new MagicFile(options, Contents["package.json"]);
  s.createConfigFile("README.md", Contents["README.md"]);
  s.createConfigFile(".gitignore", Contents[".gitignore"]);
  s.createConfigFile(
    "LICENSE",
    Contents.LICENSE.replace("YOURNAME", options.author)
  );
  //Code for route

  //till here
  s.createConfigFile("package.json", s.configPackageJSON());
};
export default Codegen;
