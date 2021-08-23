import type { throwError } from "../types";
import { Errors } from "../types";
const throwsError: throwError = function (error: Errors, dynamicPart?: string) {
  if (dynamicPart) {
    switch (error) {
      case Errors.ModuleNotFound:
        console.log(
          `${Errors.ModuleNotFound}. Please check the input path ${dynamicPart} again`
        );

        throw new Error(
          `${Errors.ModuleNotFound}. Please check the input path ${dynamicPart} again`
        );
      default:
        console.log("Error not found");
        break;
    }
  } else {
    console.log(`${error}`);

    throw new Error(`${error}`);
  }
  console.log(error);
};

export default throwsError;
