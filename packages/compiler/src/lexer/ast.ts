import type { AST, Node } from "../types";
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
      }
      else {
        break loop;
      }
    }
  }
  constructNode(node: Node, parent?: string) {
    if (!parent) {
      this.ast.push(node);
    } else {
      this.traverse((traversingNode: Node) => {
        if (
          traversingNode.value === parent &&
          traversingNode.type === "Route"
        ) {
          if (traversingNode.isFlat) {
            traversingNode.isFlat = true;
            traversingNode.children = [node];
          } else {
            traversingNode.children.push(node);
          }
          return false;
        }
        return true;
      });
    }
  }
  compileStringRoutes(rawRoutes: string[]) {
    for (let route of rawRoutes) {
      const fragments = route.split("/");
      const mother = fragments[0];
      this.constructNode({
        type: "Route",
        value: mother + "/",
        isFlat: true,
      });
      for (let i = 1; i < fragments.length; i++) {
        const fragment = fragments[i];
        const mother = fragments[i - 1];
        this.constructNode(
          { type: "Route", value: fragment + "/", isFlat: true },
          mother
        );
      }
    }
  }
}
