export const enum Keywords {
  alias = "alias",
  ignore = "ignore",
  middleware = "middleware",
}
export type Node = {
  type: "Route";
  value: string;
  isFlat: Boolean;
  children?: Node[];
  ignore: Boolean;
  alias: string[];
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
};
export interface AST {
  ast: Node[];
  constructNode: (node: Node, parent?: string) => void;
  traverse: (visitor: Function) => void;
  compileStringRoutes: (rawRoutes: string[]) => void;
}
export const enum Errors {
  ModuleNotFound = "ModuleNotFound: Error module not found",
  IndentationError = "IndentError: Indentation error",
  UnidentifiedToken = "SyntaxError:",
  IllegalToken = "SyntaxError: Illgal token",
  MissingToken = "SyntaxError: Missing token",
  SyntaxError = "SyntaxError:",
}
export type throwError = (
  error: Errors,
  dynamicPart?: string,
  custom?: boolean
) => void;
