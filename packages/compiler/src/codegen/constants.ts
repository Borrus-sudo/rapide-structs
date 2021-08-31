const date = new Date();
const currYear = date.getFullYear();
export default {
  ".gitignore": `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# TypeScript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless`,
  "package.json": `{
    "private": true,
    "name": "awesome-stack",
    "version": "0.0.1",
    "description": "Github ReadME stats for your favourite web dev stack!",
    "main": "index.js",
    "scripts": {
        "start": "node src/index.js",
        "dev": "nodemon src/index.js",
        "lint": "eslint --fix src",
        "test": "nyc --reporter=text mocha --exit"
    },
    "keywords": [],
    "author": "Borrus-sudo",
    "license": "MIT",
    "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^10.0.0",
        "express": "^4.17.1",
        "helmet": "^4.6.0",
        "morgan": "^1.10.0",
        "node-fetch": "^2.6.1"
    },
    "devDependencies": {
        "eslint": "^7.28.0",
        "eslint-config-airbnb-base": "^14.2.1",
        "eslint-plugin-import": "^2.24.0",
        "mocha": "^9.0.0",
        "nodemon": "^2.0.7",
        "nyc": "^15.1.0",
        "supertest": "^6.1.5"
    }
}
`,
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
