# @rapide-structs/compiler
![test cases](https://github.com/Borrus-sudo/rapide-structs/actions/workflows/test.yml/badge.svg)
<br/>
The main compiler for the project
All the source code lives in the `src/` directory.

- ## Parsing stage
In the lexer folder, parser.ts parses the entire file to convert the front-matter into a JS Object. The routes are parsed and compiled into an array of nodes constructing an AST.
During the AST creation phase, the options in `[here]` are compiled using `compileOptions` function. 

- ## Codegen stage
**TODO**

- ## Error Handling
All the errors thrown during the parsing stage are with the help of the `throwError` function. Check the types.d.ts file to see all the errors.


## Warning ⚠ WIP !!!!
