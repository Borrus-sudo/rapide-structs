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
      } else {
        break loop;
      }
    }
  }
  constructNode(child: Node, parent?: string) {
    if (!parent) {
      if (this.ast.filter((node) => node.value === child.value).length === 0) {
        this.ast.push(child);
      }
    } else {
      this.traverse((traversingNode: Node) => {
        if (
          traversingNode.value === parent &&
          traversingNode.type === "Route"
        ) {
          if (traversingNode.isFlat) {
            traversingNode.isFlat = false;
            traversingNode.children = [child];
          } else {
            if (
              traversingNode.children.filter(
                (node) => child.value === node.value
              ).length === 0
            ) {
              traversingNode.children.push(child);
            }
          }
          return false;
        }
        return true;
      });
    }
  }
  compileStringRoutes(rawRoutes: string[]) {
    for (let route of rawRoutes) {
      const fragments = route.split("/").slice(1);
      const mother = fragments[0];
      this.constructNode({
        type: "Route",
        value: "/" + mother,
        isFlat: true,
      });
      for (let i = 1; i < fragments.length; i++) {
        const fragment = fragments[i];
        const mother = fragments[i - 1];
        this.constructNode(
          { type: "Route", value: "/" + fragment, isFlat: true },
          "/" + mother
        );
      }
    }
  }
}
