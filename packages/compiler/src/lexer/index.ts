import throwError from "../errors/index";
import { Errors } from "../types";
import { existsSync, PathLike, readFileSync } from "fs";
export default function (codePath: PathLike) {
  if (existsSync(codePath)) {
    const code = readFileSync(codePath, { encoding: "utf-8" }).trim();
    if (code) {
      let spaces: number = 0;
      for (let i: number = 0; i < code.length; i++) {
        if (code[i].startsWith("/")) {
               
        }
        spaces += 4;
       }
    }
  } else {
    throwError(Errors.ModuleNotFound,codePath as string);
  }
}
