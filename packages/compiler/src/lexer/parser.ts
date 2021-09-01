import * as frontMatter from "front-matter";
import throwError from "../error";
import { AST, Defaults, Errors } from "../types";
import ASTree from "./ast";
export default function (code: string): { ast: AST; frontMatter: Defaults } {
  //Parsing the frontMatter
  const getFrontMatter = (input: string): Defaults => {
    const defaults: Defaults = {
      name: "",
      version: "",
      description: "",
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

  //Returning the parsed stuff
  return { ast, frontMatter: metaStuff };
}
