import type { PathLike } from "fs";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import type { Defaults, MagicFile, Node } from "../types";
export default class implements MagicFile {
  defaults: Defaults;
  rootPath: PathLike;
  routePath: PathLike;
  basePath: PathLike;
  packageJSON: Object;
  constructor(defaults: Defaults, json: Object) {
    this.defaults = defaults;
    const { rootDirectoryName, expressRouteDirectoryName } = defaults;
    this.basePath = this.defaults.basePath;
    this.rootPath = resolve(this.basePath as string, rootDirectoryName);
    this.routePath = resolve(
      this.rootPath as string,
      expressRouteDirectoryName
    );
    this.packageJSON = json;
    mkdirSync(this.routePath, { recursive: true });
  }
  configPackageJSON(): string {
    return JSON.stringify(this.packageJSON, null, 2);
  }
  createRoute(node: Node): {
    middlewares: string;
    route: string;
    aliasRoutes: string;
  } {
    const returnCode = {
      middlewares: ``,
      route: ``,
      aliasRoutes: ``,
    };
    const defineMiddlewareCode = (
      middlewares: string[],
      isFlat: Boolean,
      value: string
    ) => {
      const sortedMiddlewares = {
        inlineMiddlewares: [], //inline in the route
        useMiddlewares: [], // with app.use
        defineMiddlewares: [], // define the middlewares
      };
      if (isFlat) {
        //inline all middlewares
        for (let middleware of middlewares) {
          if (this.defaults.pkgMiddlewares.includes(middleware)) {
            sortedMiddlewares.inlineMiddlewares.push(middleware);
          } else {
            sortedMiddlewares.inlineMiddlewares.push(middleware);
            sortedMiddlewares.defineMiddlewares.push(middleware);
          }
        }
      } else {
        for (let middleware of middlewares) {
          if (this.defaults.pkgMiddlewares.includes(middleware)) {
            sortedMiddlewares.useMiddlewares.push(middleware);
          } else {
            sortedMiddlewares.useMiddlewares.push(middleware);
            sortedMiddlewares.defineMiddlewares.push(middleware);
          }
        }
      }
    };
    const defineAliasRoutesCode = (alias: string[]) => {};
    const defineRouteCode = (node: Node) => {
      const {
        value: routeName,
        alias,
        ignore,
        middlewares,
        children,
        uniques,
        verb,
      } = node;
      if (!ignore) {
        defineMiddlewareCode(
          middlewares,
          children.length > 0 ? true : false,
          routeName
        );
        const code = `${this.defaults.expressVarName}.${verb}("${routeName}",,(res,req)=>{})`;
        defineAliasRoutesCode(alias);
      }
    };
    defineRouteCode(node);
    return returnCode;
  }

  createConfigFile(fileName: string, contents?: string): void {
    writeFileSync(resolve(this.basePath as string, fileName), contents);
  }

  createRootFile(fileName: string, contents?: string): void {
    writeFileSync(resolve(this.rootPath as string, fileName), contents);
  }

  createFile(fileName: string, contents?: string): void {
    writeFileSync(resolve(this.routePath as string, fileName), contents);
  }
}
