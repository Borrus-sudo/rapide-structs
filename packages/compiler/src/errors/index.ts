import type { throwError } from "../types";
import { Errors } from "../types";
const throwsError: throwError = function (error: Errors, dynamicPart?: string) {
  if (dynamicPart) {
    switch (error) {
      case Errors.ModuleNotFound:
        throw new Error(
          `${Errors.ModuleNotFound}. Please check the input path ${dynamicPart} again`
        );
      case Errors.IndentationError:
        throw new Error(
          `${Errors.IndentationError}. Please check the indentation of line ${dynamicPart} again`
        );
      default:
        console.log("Error not found");
        break;
    }
  } else {
    throw new Error(`${error}`);
  }
  console.log(error);
};

export default throwsError;
