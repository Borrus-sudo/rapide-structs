import { Errors, throwError } from "./types";
const throwsError: throwError = function (
  error: Errors,
  dynamicPart?: string,
  custom?: boolean
) {
  if (!custom) {
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
        case Errors.UnidentifiedToken:
          throw new Error(
            `${Errors.UnidentifiedToken} The token \`${dynamicPart}\` is invalid. Please check again.`
          );
        case Errors.IllegalToken:
          throw new Error(
            `${Errors.IllegalToken} The token \`${dynamicPart}\` is not expexted`
          );
        case Errors.MissingToken:
          throw new Error(`${Errors.MissingToken} \`${dynamicPart}\``);
      }
    } else {
      throw new Error(`${error}`);
    }
  } else {
    throw new Error(`${error} ${dynamicPart}`);
  }
};
export default throwsError;
