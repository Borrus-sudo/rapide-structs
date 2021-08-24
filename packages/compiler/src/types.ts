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
export interface AST {
  ast: Node[];
  constructNode: (node: Node) => void;
  traverse: (callback: Function) => void;
}
export const enum Errors {
  ModuleNotFound = "ModuleNotFound: Error module not found",
  IndentError="IndentError: Indentation error."
}
export type throwError = (error: Errors, dynamicPart?: string) => void;
