import type { Defaults, MagicFile } from "../types";
export default class implements MagicFile {
  defaults: Defaults;
  constructor(defaults: Defaults) {
    this.defaults = defaults;
  }
  createRoute() {}
  createFile() {}
}
