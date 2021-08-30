import Compile from "../src/index";
import Tokeniser from "../src/lexer/tokeniser";
import { join } from "path";
import { readFileSync } from "fs";
describe("it tests the lexer and a few errors", () => {
  it("should throw ModuleNotFoundError ", () => {
    try {
      Compile("./invalidpath");
    } catch (error) {
      expect(error.message).toStrictEqual(
        `ModuleNotFound: Error module not found. Please check the input path ./invalidpath again`
      );
    }
    Compile(join(process.cwd(), "./test/compile.txt"));
  });
  it("should match the snapshot", () => {
    const ast = Tokeniser(
      readFileSync(join(process.cwd(), "./test/compile.txt"), {
        encoding: "utf-8",
      })
    );
    expect(ast).toEqual({
      ast: [
        {
          type: "Route",
          value: "/*",
          isFlat: false,
          middlewares: [],
          alias: [],
          ignore: false,
          children: [
            {
              type: "Route",
              value: "/api",
              isFlat: false,
              middlewares: [],
              alias: [],
              ignore: false,
              children: [
                {
                  type: "Route",
                  value: "/v1",
                  isFlat: false,
                  middlewares: ["crap"],
                  alias: [],
                  ignore: true,
                  children: [
                    {
                      type: "Route",
                      value: "/cards",
                      isFlat: true,
                      middlewares: ["card", "card2"],
                      alias: ["playToo"],
                      ignore: false,
                    },
                    {
                      type: "Route",
                      value: "/fetchInfo",
                      isFlat: true,
                      middlewares: [],
                      alias: [],
                      ignore: false,
                    },
                    {
                      type: "Route",
                      value: "/countDown",
                      isFlat: true,
                      middlewares: [],
                      alias: [],
                      ignore: false,
                    },
                  ],
                },
                {
                  type: "Route",
                  value: "/v2",
                  isFlat: false,
                  middlewares: [],
                  alias: [],
                  ignore: true,
                  children: [
                    {
                      type: "Route",
                      value: "/lodash",
                      isFlat: true,
                      middlewares: [],
                      alias: [],
                      ignore: false,
                    },
                    {
                      type: "Route",
                      value: "/vuejs",
                      isFlat: true,
                      middlewares: [],
                      alias: [],
                      ignore: false,
                    },
                    {
                      type: "Route",
                      value: "/reactjs",
                      isFlat: true,
                      middlewares: [],
                      alias: [],
                      ignore: false,
                    },
                    {
                      type: "Route",
                      value: "/play",
                      isFlat: true,
                      middlewares: [],
                      alias: [],
                      ignore: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Route",
          value: "/login",
          isFlat: false,
          middlewares: [],
          alias: [],
          ignore: false,
          children: [
            {
              type: "Route",
              value: "/playThis",
              isFlat: true,
              middlewares: ["rate-limit"],
              alias: ["taylorswift"],
              ignore: false,
            },
          ],
        },
      ],
    });
  });
});
