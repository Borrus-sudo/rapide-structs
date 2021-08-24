import throwError from "../errors/index";
import { Errors, Node } from "../types";
import AST from "./ast";
import { existsSync, PathLike, readFileSync } from "fs";

export default function (codePath: PathLike): string[] {
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
  const indentSpaceIncrement: number = 2;
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
        routeStreak +="/"+ value ;
      } else {
        routeStreak += value;
      }
      routeStrings.push(routeStreak);
    } else if (spacesTrail.includes(indentSpaceNumber)) {
      //streak broken;
      routeStrings.push(routeStreak);
      const spacesIndex = spacesTrail.indexOf(indentSpaceNumber);
      const indices: number[] = getSlashIndices(routeStreak);
      routeStreak = routeStreak.slice(0, indices[spacesIndex]) + value;
      routeStrings.push(routeStreak);
      spacesTrail.splice(spacesIndex);
      nextSpaceNumber = indentSpaceNumber;
    } else {
      throwError(
        Errors.IndentError,
        `${lineNumber} Difference of ${indentSpaceNumber - nextSpaceNumber}`
      );
    }
    //End of for body
    lineNumber++;
    spacesTrail.push(nextSpaceNumber);
    nextSpaceNumber += indentSpaceIncrement + value.length;
  }
  return routeStrings;
}
