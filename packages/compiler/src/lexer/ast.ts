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
  extract(input: string): [string, string] {
    const squareIndex = input.indexOf("[");
    const name = input.slice(
      0,
      squareIndex === -1 ? input.length : squareIndex
    );
    const options = squareIndex !== -1 ? input.slice(squareIndex) : "";
    return [name, options];
  }
  compileStringRoutes(rawRoutes: string[]) {
    for (let route of rawRoutes) {
      const fragments = route.split("/").slice(1);
      const res = this.extract(fragments[0]);
      const motherName = res[0];
      const motherOptions: Options = compileOptions(res[1]);
      this.constructNode({
        type: "Route",
        value: "/" + motherName,
        isFlat: true,
        ...motherOptions,
      });
      for (let i = 1; i < fragments.length; i++) {
        const res = this.extract(fragments[i]);
        const childName = res[0];
        const childOptions: Options = compileOptions(res[1]);
        const [motherName] = this.extract(fragments[i - 1]);
        this.constructNode(
          {
            type: "Route",
            value: "/" + childName,
            isFlat: true,
            ...childOptions,
          },
          "/" + motherName
        );
      }
    }
  }
}
