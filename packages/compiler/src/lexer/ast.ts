import type { AST, Node } from "../types";
export default class implements AST {
  ast: Node[] = [];
  constructor() {}
  traverse(callback: Function) {
    console.log("Traverse func");
  }
  constructNode(node: Node) {
    console.log("constructNode func");
    
    return;
  }
}
