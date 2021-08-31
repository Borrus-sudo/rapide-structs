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
    const defineMiddleware = (middlewares: string[]) => {};
    const defineAliasRoutes = (alias: string[]) => {};
    const defineRoute = (node: Node) => {
      const {
        value: routeName,
        alias,
        ignore,
        middlewares,
        children,
        isFlat,
        verb,
      } = node;
      defineMiddleware(middlewares);
      defineAliasRoutes(alias);
    };
    defineRoute(node);
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
