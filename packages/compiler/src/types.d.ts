import type { PathLike } from "fs";
export type HttpVerb = "get" | "put" | "post" | "delete";
export const enum Keywords {
  alias = "alias",
  ignore = "ignore",
  middleware = "middleware",
  verb = "verb",
}
export type Node = {
  type: "Route";
  value: string;
  children: Node[];
  ignore: Boolean;
  alias: string[];
  uniques: string[];
  verb: HttpVerb;
  middlewares: string[];
};
export type Lexeme =
  | {
      type: "Punctuator";
      value: "[" | "]" | "," | ":";
    }
  | {
      type: "Literal";
      value: string;
    }
  | {
      type: "Keyword";
      value: Keywords;
    };
export type Options = {
  alias: string[];
  middlewares: string[];
  ignore: Boolean;
  verb: HttpVerb;
};
export type Defaults = {
  name: string;
  version: string;
  description: string;
  author: string;
  expressVarName: string;
  expressRouteDirectoryName: string;
  rootDirectoryName: string;
  ignoreNewFiles: string[];
  pkgMiddlewares: string[];
  basePath: PathLike;
};
export interface AST {
  ast: Node[];
  traverse: (visitor: Function) => void;
  identifyUniques: (input: string) => [string, string[]];
  extract: (input: string) => [string, string];
  constructNode(routeName: string): Node;
}
export interface MagicFile {
  defaults: Defaults;
  rootPath: PathLike;
  routePath: PathLike;
  basePath: PathLike;
  packageJSON: Object;
  configPackageJSON: () => string;
  createRoute: (node: Node) => {
    middlewares: string;
    route: string;
    aliasRoutes: string;
  };
  createConfigFile: (fileName: string, contents?: string) => void;
  createRootFile: (fileName: string, contents?: string) => void;
  createFile: (fileName: string, contents?: string) => void;
}
export const enum Errors {
  ModuleNotFound = "ModuleNotFound: Error module not found",
  IndentationError = "IndentError: Indentation error",
  UnidentifiedToken = "SyntaxError:",
  IllegalToken = "SyntaxError: Illgal token.",
  MissingToken = "SyntaxError: Missing token",
  SyntaxError = "SyntaxError:",
}
export type throwsErrorType = (
  error: Errors,
  dynamicPart?: string,
  custom?: boolean
) => void;
export type CodegenType = (ast: AST, options: Object) => void;
