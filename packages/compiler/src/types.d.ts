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
  middlewares?: string[];
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
  expressVarName: string;
  expressRouteName: string;
  fileStructureName: string;
  notNeededNewFiles: string[];
};
export interface AST {
  ast: Node[];
  constructNode: (node: Node, parent?: string) => void;
  traverse: (visitor: Function) => void;
  compileStringRoutes: (rawRoutes: string[]) => void;
}
export interface MagicFile {
  defaults: Defaults;
  createRoute: () => void;
  createFile: () => void;
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
export type CodegenType = (
  ast: AST,
  basePath: PathLike,
  options: Object
) => void;
