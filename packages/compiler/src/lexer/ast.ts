import type { AST, Node, Options } from "../types";
import compileOptions from "./compileOptions";
export default class implements AST {
  ast: Node[] = [];
  constructor() {}
  traverse(visitor: (traversingNode: Node) => boolean, arrToLookUp?: Node[]) {
    const traverseNodes: Node[] = [];
    if (arrToLookUp) {
      traverseNodes.push(...arrToLookUp);
    } else {
      traverseNodes.push(...this.ast);
    }
    loop: for (let node of traverseNodes) {
      const nextNode = visitor(node);
      if (nextNode) {
        if (node.type === "Route" && node.children) {
          this.traverse(visitor, node.children);
        }
      } else {
        break loop;
      }
    }
  }
  constructNode(routeName: string): Node {
    const [name, options] = this.extract(routeName);
    const [nodeName, uniques] = this.identifyUniques(name);
    const node: Node = {
      type: "Route",
      value: nodeName.startsWith("/") ? nodeName : "/" + nodeName,
      children: [],
      uniques,
      ...compileOptions(options),
    };
    return node;
  }
  extract(input: string): [string, string] {
    const squareIndex = input.indexOf("[");
    const name = input.slice(
      0,
      squareIndex === -1 ? input.length : squareIndex
    );
    const options = squareIndex !== -1 ? input.slice(squareIndex) : "";
    return [name, options];
  }
  identifyUniques(input: string): [string, string[]] {
    if (!input.includes("$")) {
      return [input, []];
    }
    let uniques = input.split("$").slice(1);
    return [input.slice(0, input.indexOf("$")), uniques];
  }
  
}
