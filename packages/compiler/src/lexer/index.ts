import throwError from "../errors/index";
import { Errors,Node } from "../types";
import AST from "./ast";
import { existsSync, PathLike, readFileSync } from "fs";

export default function (codePath: PathLike): Node[] {
  if (!existsSync(codePath)) {
    throwError(Errors.ModuleNotFound, codePath as string);
    return;
  }
  function getSlashIndices(str: string): number[] {
    const indices: number[] = [];
    [...str].forEach((elem, index) => (elem === "/" ? indices.push(index) : 0));
    return indices;
  }
  const code = readFileSync(codePath, { encoding: "utf-8" }).trim().split("\n");
  const spacesTrail: number[] = [];
  let nextSpaceNumber: number = 0;
  let lineNumber: number = 1;
  const routeStrings: string[] = [];
  let routeStreak: string = "";
  for (let line of code) {
    const indentSpaceNumber: number = line.trimRight().search(/\S/);
    const value: string = line.trim();
    if (indentSpaceNumber === nextSpaceNumber) {
      if (!value.startsWith("/")) {
        routeStreak += "/" + value;
      } else {
        routeStreak += value;
      }
      routeStrings.push(routeStreak);
    } else if (spacesTrail.includes(indentSpaceNumber)) {
      //streak broken;
      const spacesIndex = spacesTrail.indexOf(indentSpaceNumber);
      const indices: number[] = getSlashIndices(routeStreak);
      routeStreak = routeStreak.slice(0, indices[spacesIndex]) + value;
      //routeStreak.replace("/*", "/").replace(/\/\//g, "/")
      routeStrings.push(routeStreak);
      spacesTrail.splice(spacesIndex);
      nextSpaceNumber = indentSpaceNumber;
    } else {
      throwError(
        Errors.IndentationError,
        `${lineNumber} Difference of ${indentSpaceNumber - nextSpaceNumber}`
      );
    }
    lineNumber++;
    spacesTrail.push(nextSpaceNumber);
    const squareBracketIndex = value.indexOf("[");
    nextSpaceNumber +=
      value.slice(
        0,
        squareBracketIndex === -1 ? value.length : squareBracketIndex
      ).length - 1;
  }
  const ast = new AST();
  ast.compileStringRoutes(routeStrings);
  return ast.ast;
}
