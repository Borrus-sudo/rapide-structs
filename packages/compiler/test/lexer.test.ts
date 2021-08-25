import Compiler from "../src/index";
describe("it should return a string", () => {
  it("should throw ModuleNotFoundError ", () => {
    try {
      Compiler("./crap");
    } catch (error) {
      expect(error.message).toStrictEqual(
        `ModuleNotFound: Error module not found. Please check the input path ./crap again`
      );
    }
  });
});
