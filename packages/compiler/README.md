# @rapide-structs/compiler
![test cases](https://github.com/Borrus-sudo/rapide-structs/actions/workflows/test.yml/badge.svg)
<br/>
The main compiler for the project
All the source code lives in `src/` directory.

- ## Parsing stage
In lexer folder, parser.ts parses the entire file to convert the front-matter into a JS Object. The routes are converted into strings like `"/*/main"` `"/*/main/child"` `"/*/child"`.
An array of such strings are passed into the compileStringRoutes method which compiles them into an AST.
During AST creation the options in `[here]` are compiled using `compileOptions`. 

- ## Codegen stage
**TODO**

- ## Error Handling
All the errors thrown during the parsing stage are with the help of `throwError` function. Check the types.d.ts file to see all the errors.


## Warning ⚠ WIP !!!!
