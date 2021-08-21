import compile from "~/index";

describe("it should return a string", () => {
  it("should throw ModuleNotFoundError ", () => {
    try {
      compile("./crap");
    } catch (error) {
      expect(error.message).toStrictEqual(
        `ModuleNotFound: Error module not found. Please check the input path ./crap again`
      );
    }
  });
});
