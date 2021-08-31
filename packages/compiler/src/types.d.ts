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
  isFlat: Boolean;
  children?: Node[];
  ignore: Boolean;
  alias: string[];
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
  projectName: string;
  versionName: string;
  description: string;
  expressVarName: string;
  expressRouteDirectoryName: string;
  rootDirectoryName: string;
  notNeededNewFiles: string[];
  packageMiddlewares: string[];
  basePath: PathLike;
};
export interface AST {
  ast: Node[];
  constructNode: (node: Node, parent?: string) => void;
  traverse: (visitor: Function) => void;
  compileStringRoutes: (rawRoutes: string[]) => void;
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
  IllegalToken = "SyntaxError: Illgal token",
  MissingToken = "SyntaxError: Missing token",
  SyntaxError = "SyntaxError:",
}
export type throwsErrorType = (
  error: Errors,
  dynamicPart?: string,
  custom?: boolean
) => void;
export type CodegenType = (ast: AST, options: Object) => void;
