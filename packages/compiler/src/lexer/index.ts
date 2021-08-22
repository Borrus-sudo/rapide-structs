import throwError, { Errors } from "../errors/index";
import { existsSync, PathLike, readFileSync } from "fs";
export default function (codePath: PathLike) {
  if (existsSync(codePath)) {
    const code = readFileSync(codePath, { encoding: "utf-8" }).trim();
    if (code) {
      // for () { }
    }
  } else {
    throwError(Errors.ModuleNotFound,codePath as string);
  }
}
