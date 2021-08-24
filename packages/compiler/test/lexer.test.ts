import compile from "../src/index";
import Lexer from "../src/lexer/index";

describe("it should return a string", () => {
  it("should throw ModuleNotFoundError ", () => {
    try {
      compile("./crap");
    } catch (error) {
      expect(error.message).toStrictEqual(
        `ModuleNotFound: Error module not found. Please check the input path ./crap again`
      );
    }
    const routeStrings: string[] = Lexer(
      "E:/JDev/rapide-structs/packages/compiler/test/compile.txt"
    );
    console.log({ routeStrings });
  });
});
