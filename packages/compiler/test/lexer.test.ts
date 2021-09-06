import Compile from "../src/index";
import Parser from "../src/lexer/parser";
import { join } from "path";
import { readFileSync } from "fs";
describe("it tests the lexer and a few errors", () => {
  it("should throw ModuleNotFoundError ", () => {
    try {
      //@ts-ignore
      Compile("./invalidpath");
    } catch (error) {
      expect(error.message).toStrictEqual(
        `ModuleNotFound: Error module not found. Please check the input path ./invalidpath again`
      );
    }
  });
  it("should match the snapshot", () => {
    const { ast, frontMatter } = Parser(
      readFileSync(join(process.cwd(), "./test/compile.txt"), {
        encoding: "utf-8",
      })
    );
    expect(frontMatter).toEqual({
      name: "sampleProject",
      version: "",
      description: "",
      author: "",
      expressVarName: "express",
      expressRouteDirectoryName: "api",
      rootDirectoryName: "src",
      ignoreNewFiles: [],
      pkgMiddlewares: ["rate-limit", "rate-limit-moar"],
      basePath: "E:/jdev/rapide-structs/example",
    });
    expect(ast).toEqual({
      ast: [
        {
          type: "Route",
          uniques: [],
          value: "/*",
          middlewares: [],
          alias: [],
          verb: "get",
          ignore: false,
          children: [
            {
              type: "Route",
              uniques: [],
              value: "/api",
              middlewares: [],
              alias: [],
              verb: "get",
              ignore: false,
              children: [
                {
                  type: "Route",
                  uniques: [],
                  value: "/v1",
                  middlewares: ["crap"],
                  alias: [],
                  verb: "get",
                  ignore: true,
                  children: [
                    {
                      type: "Route",
                      uniques: [],
                      children:[],
                      value: "/cards",
                      middlewares: ["card", "card2"],
                      alias: ["playToo"],
                      verb: "get",
                      ignore: false,
                    },
                    {
                      type: "Route",
                      uniques: [],
                      children:[],
                      value: "/fetchInfo",
                      middlewares: [],
                      alias: [],
                      verb: "get",
                      ignore: false,
                    },
                    {
                      type: "Route",
                      uniques: [],
                      children:[],
                      value: "/countDown",
                      middlewares: [],
                      alias: [],
                      verb: "get",
                      ignore: false,
                    },
                  ],
                },
                {
                  type: "Route",
                  uniques: [],
                  value: "/v2",
                  middlewares: [],
                  alias: [],
                  verb: "get",
                  ignore: true,
                  children: [
                    {
                      type: "Route",
                      uniques: [],
                      value: "/lodash",
                      middlewares: [],
                      children:[],
                      alias: [],
                      verb: "post",
                      ignore: false,
                    },
                    {
                      type: "Route",
                      uniques: [],
                      value: "/vuejs",
                      middlewares: [],
                      children:[],
                      alias: [],
                      verb: "get",
                      ignore: false,
                    },
                    {
                      type: "Route",
                      uniques: [],
                      value: "/reactjs",
                      middlewares: [],
                      children:[],
                      alias: [],
                      verb: "get",
                      ignore: false,
                    },
                    {
                      type: "Route",
                      uniques: [],
                      value: "/play",
                      middlewares: [],
                      children:[],
                      alias: [],
                      verb: "get",
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
          uniques: [":id"],
          value: "/login",
          middlewares: [],
          alias: [],
          verb: "get",
          ignore: false,
          children: [
            {
              type: "Route",
              uniques: [],
              value: "/playThis",
              children:[],
              middlewares: ["rate-limit"],
              alias: ["taylorswift"],
              verb: "get",
              ignore: false,
            },
          ],
        },
      ],
    });
  });
});
