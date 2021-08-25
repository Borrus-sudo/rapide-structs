export const enum Keywords {
  alias = "alias",
  ignore = "ignore",
  middleware = "middleware",
}
export type Node =
  | {
      type: "Route";
      isFlat: Boolean;
      value: string;
      children?: Node[];
      middlewares?: Node[];
    }
  | {
      type: "Middleware";
      value: string;
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
export interface AST {
  ast: Node[];
  constructNode: (node: Node, parent?: string) => void;
  traverse: (visitor: Function) => void;
  compileStringRoutes: (rawRoutes: string[]) => void;
}
export const enum Errors {
  ModuleNotFound = "ModuleNotFound: Error module not found",
  IndentationError = "IndentError: Indentation error",
  UnidentifiedToken = "UnindentifiedToken:",
}
export type throwError = (error: Errors, dynamicPart?: string) => void;
