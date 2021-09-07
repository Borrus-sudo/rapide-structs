import * as frontMatter from "front-matter";
import throwError from "../error";
import { AST, Defaults, Errors, Node } from "../types";
import ASTree from "./ast";
export default function (code: string): { ast: AST; frontMatter: Defaults } {
  //Parsing the frontMatter
  const getFrontMatter = (input: string): Defaults => {
    const defaults: Defaults = {
      name: "",
      version: "",
      description: "",
      author: "",
      expressVarName: "express",
      expressRouteDirectoryName: "api",
      rootDirectoryName: "src",
      ignoreNewFiles: [],
      pkgMiddlewares: [],
      basePath: "",
    };
    //@ts-ignore
    const res = frontMatter<Object>(input);
    code = res.body;
    Object.entries(res.attributes).forEach(([key, value]) => {
      if (defaults.hasOwnProperty(key)) {
        if (Array.isArray(defaults[key])) {
          if (Array.isArray(value)) defaults[key].push(...value);
          else defaults[key].push(value);
        } else {
          defaults[key] = value;
        }
      } else {
        throwError(Errors.IllegalToken, key);
      }
    });

    return defaults;
  };
  const metaStuff: Defaults = getFrontMatter(code);

  // Parsing the body
  const ast: AST = new ASTree();
  const lines: string[] = code.split("\n");
  const spacesTrail: number[] = [];
  const baseNodes: Node[] = [];
  const toPushNodes: Node[][] = [];
  const getSlashIndices = (str: string): number[] => {
    const indices: number[] = [];
    [...str].forEach((elem, index) => (elem === "/" ? indices.push(index) : 0));
    return indices;
  };
  let predictedNextSpace: number = 0;
  let lineNumber: number = 1;
  let routeStreak: string = "";
  for (let line of lines) {
    const indentSpaceNumber: number = line.trimRight().search(/\S/);
    let times = 1;
    const value: string = line
      .trim()
      .replace(/(\/)/g, (lexeme: string) => (times++ > 1 ? "$" : lexeme));
    if (indentSpaceNumber === predictedNextSpace) {
      if (!value.startsWith("/")) {
        routeStreak += "/" + value;
      } else {
        routeStreak += value;
      }
      const fragments = routeStreak.split("/").slice(1);
      if (fragments.length === 1) {
        const currNode = ast.constructNode(fragments[0]);
        baseNodes.push(currNode);
        toPushNodes.push(currNode.children);
      } else {
        const currNode = ast.constructNode(fragments[fragments.length - 1]);
        toPushNodes[toPushNodes.length - 1].push(currNode);
        toPushNodes.push(currNode.children);
      }
    } else if (spacesTrail.includes(indentSpaceNumber)) {
      const spacesIndex = spacesTrail.indexOf(indentSpaceNumber);
      const indices: number[] = getSlashIndices(routeStreak);
      routeStreak = routeStreak.slice(0, indices[spacesIndex]) + value;
      const currNode = ast.constructNode(value);
      toPushNodes.splice(spacesIndex);
      if (toPushNodes.length > 0) {
        toPushNodes[toPushNodes.length - 1].push(currNode);
      } else {
        baseNodes.push(currNode);
      }
      toPushNodes.push(currNode.children);
      spacesTrail.splice(spacesIndex);
      predictedNextSpace = indentSpaceNumber;
    } else {
      throwError(
        Errors.IndentationError,
        `${lineNumber} Difference of ${indentSpaceNumber - predictedNextSpace}`
      );
    }
    lineNumber++;
    spacesTrail.push(predictedNextSpace);
    const squareBracketIndex = value.indexOf("[");
    predictedNextSpace +=
      value.slice(
        0,
        squareBracketIndex === -1 ? value.length : squareBracketIndex
      ).length - 1;
  }
  //Returning the parsed stuff
  ast.ast = baseNodes;
  return { ast, frontMatter: metaStuff };
}
