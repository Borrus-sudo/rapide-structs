const date = new Date();
const currYear = date.getFullYear();
export default {
  ".gitignore": `
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pids
*.pid
*.seed
*.pid.lock
lib-cov
coverage
.nyc_output
.grunt
bower_components
.lock-wscript
build/Release
node_modules/
jspm_packages/
typings/
.npm
.eslintcache
.node_repl_history
*.tgz
.yarn-integrity
.env
.cache
.next
.nuxt
.vuepress/dist
.serverless`,
  "package.json": `{
    private: true,
    version: "1.0.0",
    main: "index.js",
    scripts: {
      start: "node src/index.js",
      dev: "nodemon src/index.js",
      lint: "eslint --fix src",
      test: "nyc --reporter=text mocha --exit",
    },
    license: "MIT",
    dependencies: {
      cors: "latest",
      dotenv: "latest",
      express: "latest",
      helmet: "latest",
      morgan: "latest",
      "node-fetch": "latest",
    },
    devDependencies: {
      mocha: "latest",
      nodemon: "latest",
      nyc: "latest",
      supertest: "latest",
    },
  }`,
  LICENSE: `MIT License Copyright (c) ${currYear} YOURNAME.

Permission is hereby granted, free
of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice
(including the next paragraph) shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.`,
  "README.md": `
# express-boiler-plate
Link to github: https://github.com/Borrus-sudo/rapide-structs
Show the project some love by starring the repo 💚
 `,
};
