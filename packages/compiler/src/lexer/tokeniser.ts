import throwError from "../error";
import { AST, Defaults, Errors } from "../types";
import ASTree from "./ast";
import frontMatter from "front-matter";
export default function (code: string): { ast: AST; frontMatter: Defaults } {
  const lines: string[] = code.split("\n");
  const spacesTrail: number[] = [];
  const routeStrings: string[] = [];
  const frontMatterRegex = /---(.*?)---/;
  const getSlashIndices = (str: string): number[] => {
    const indices: number[] = [];
    [...str].forEach((elem, index) => (elem === "/" ? indices.push(index) : 0));
    return indices;
  };
  const getFrontMatter = (input: string): Defaults => {
    const isPresent = frontMatterRegex.test(input);
    const defaults: Defaults = {
      projectName: "string",
      versionName: "string",
      description: "string",
      expressVarName: "express",
      expressRouteDirectoryName: "api",
      rootDirectoryName: "src",
      notNeededNewFiles: [],
      packageMiddlewares: [],
      basePath: "",
    };
    if (isPresent) {
      //  frontMatter.
      const attributes = frontMatter(input);
      Object.entries(attributes).forEach(([key, value]) => {
        if (defaults[key]) {
          defaults[key] = value;
        } else {
          throwError(Errors.IllegalToken, attributes[key]);
        }
      });
    }
    return defaults;
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
  return { ast, frontMatter: getFrontMatter(code) };
}
