import throwError from "../error";
import { Errors, AST } from "../types";
import ASTree from "./ast";

export default function (code: string): AST {
  const lines: string[] = code.split("\n");
  const spacesTrail: number[] = [];
  const routeStrings: string[] = [];
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
    const value: string = line.trim();
    if (indentSpaceNumber === predictedNextSpace) {
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
  const ast: AST = new ASTree();
  ast.compileStringRoutes(routeStrings);
  return ast;
}
