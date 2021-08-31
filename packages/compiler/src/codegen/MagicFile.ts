import type { PathLike } from "fs";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import type { Defaults, MagicFile } from "../types";
export default class implements MagicFile {
  defaults: Defaults;
  rootPath: PathLike;
  routePath: PathLike;
  basePath: PathLike;
  constructor(defaults: Defaults) {
    this.defaults = defaults;
    const { rootDirectoryName, expressRouteDirectoryName } = defaults;
    /**
     * basePath: /
     * rootPath: src/
     * routePath: src/api
     */
    this.basePath = this.defaults.basePath;
    this.rootPath = resolve(this.basePath as string, rootDirectoryName);
    this.routePath = resolve(
      this.rootPath as string,
      expressRouteDirectoryName
    );
    mkdirSync(this.routePath, { recursive: true });
  }
  createRoute() {}
 
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
